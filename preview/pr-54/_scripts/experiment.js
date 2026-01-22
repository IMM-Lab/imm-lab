console.log("Updated script loaded!");

// URL parameter handling for Prolific integration
const q = new URLSearchParams(location.search);

// Detect platform tokens first
const prolificPID = q.get("PROLIFIC_PID"); // Prolific appends this
const sonaCode =
  q.get("survey_code") || q.get("sona_id") || q.get("id") || q.get("ID"); // Sona/HSP variants

// Derive source if not explicitly set
let source = q.get("source");
if (!source) {
  source = prolificPID ? "prolific" : sonaCode ? "hsp" : "direct";
}

// Choose participantId based on what we actually found
let participantId = prolificPID || sonaCode || null;

console.log("Source:", source, "participantId:", participantId);

// Candidate Stimuli array (from a single folder)
const candidateStimuli = [
  "/assets/images/F_5_3_num_001.png",
  "/assets/images/F_6_5_num_003.png",
  "/assets/images/F_6_5_size_004.png",
  "/assets/images/F_8_6_size_003.png",
  "/assets/images/F_15_10_face_004.png",
  "/assets/images/F_15_10_gabor_001.png",
  "/assets/images/F_25_15_face_002.png",
  "/assets/images/F_25_15_gabor_004.png",
  "/assets/images/J_3_5_num_002.png",
  "/assets/images/J_5_6_num_004.png",
  "/assets/images/J_5_6_size_001.png",
  "/assets/images/J_6_8_size_002.png",
  "/assets/images/J_10_15_face_001.png",
  "/assets/images/J_10_15_gabor_002.png",
  "/assets/images/J_15_25_face_003.png",
  "/assets/images/J_15_25_gabor_003.png",
  "/assets/images/Q_cluster_01.png",
  "/assets/images/E_cluster_06.png",
  "/assets/images/T_cluster_05.png",
  "/assets/images/R_cluster_04.png",
  "/assets/images/Q_cluster_03.png",
  "/assets/images/W_cluster_02.png",
];

// Canvas Setup - will be initialized when needed
let canvas;
let ctx;

// -----------------------
// Utility Functions
// -----------------------

// Draw a cross (used for the ready screen)
function drawCross(color) {
  const xCenter = canvas.width / 2;
  const yCenter = canvas.height / 2;
  const crossLength = 17;

  ctx.beginPath();
  ctx.moveTo(xCenter - crossLength, yCenter);
  ctx.lineTo(xCenter + crossLength, yCenter);
  ctx.moveTo(xCenter, yCenter - crossLength);
  ctx.lineTo(xCenter, yCenter + crossLength);
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.closePath();
}

// Display text at the center of the canvas
function drawText(message, color) {
  ctx.fillStyle = color;
  ctx.font = "30px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(message, canvas.width / 2, canvas.height / 2);
}

// Load an image and return a Promise
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (err) => {
      console.error(`Error loading image at ${src}`, err);
      reject(new Error(`Image failed to load: ${src}`));
    };
    img.src = src;
  });
}

// Draw the standard response screen
function drawResponseScreen(question, instructions) {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "white";
  ctx.font = "30px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(question, canvas.width / 2, canvas.height / 2 - 30);

  ctx.font = "20px Arial";
  ctx.fillText(instructions, canvas.width / 2, canvas.height / 2 + 30);
}

// Display a delay message if the participant is too slow
function drawDelayScreen() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.font = "30px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("Too slow!", canvas.width / 2, canvas.height / 2);
}

// Capture the user response with a 30-second timeout (30000 ms)
// Accepts any alphabetical key (a-z)
function getUserResponse(validKeys) {
  return new Promise((resolve) => {
    let responded = false;
    let responseTimeout;

    const handleKeyDown = (event) => {
      if (validKeys.includes(event.key)) {
        responded = true;
        window.removeEventListener("keydown", handleKeyDown);
        clearTimeout(responseTimeout);
        resolve(event.key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    responseTimeout = setTimeout(() => {
      if (!responded) {
        window.removeEventListener("keydown", handleKeyDown);
        drawDelayScreen();
        setTimeout(() => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          resolve(null); // Indicates no response within 30 seconds
        }, 2000);
      }
    }, 30000);
  });
}

// Given a stimulus (string), determine the correct response
// by taking the first letter of the filename
function getCorrectResponse(stimulus) {
  const filename = stimulus.split("/").pop();
  return filename.charAt(0).toLowerCase();
}

// Given a stimulus, determine the appropriate question prompt based on its filename
function getQuestionForStimulus(stimulus) {
  const filename = stimulus.split("/").pop().toLowerCase();
  if (filename.includes("cluster")) {
    return null; // No text question needed for cluster trials
  }
  if (filename.includes("size")) {
    return "Which side has a greater average size?";
  } else if (filename.includes("face")) {
    return "Which side is angrier on average?";
  } else if (filename.includes("num")) {
    return "Which side has more dots?";
  } else if (filename.includes("gabor")) {
    return "Which side is more tilted to the right on average?";
  }
  // Fallback generic question if no keyword is found
  return "Press the key corresponding to the image";
}

// For cluster stimuli, get the matching prompt image path
function getClusterPromptImage(stimulusPath) {
  const filename = stimulusPath.split("/").pop();
  const match = filename.match(/cluster_(\d+)/);
  if (match) {
    return `/assets/images/cluster_prompt_${match[1]}.png`;
  }
  return null;
}

/* ========================= NEW: Ingestion helpers ========================= */

// Fill these in Step 2 (when your server is live)
const INGEST_URL = "https://YOUR-UBC-ENDPOINT/ingest"; // e.g., https://lab.ubc.ca/ingest
const API_KEY = "REPLACE_ME";

// Pull platform metadata from URL (Prolific/Sona/HSP)
function getPlatformMeta() {
  const q = new URLSearchParams(location.search);
  const prolificPID = q.get("PROLIFIC_PID");
  const sonaCode =
    q.get("survey_code") || q.get("sona_id") || q.get("id") || q.get("ID");
  if (prolificPID) {
    return {
      platform: "prolific",
      platform_pid: prolificPID,
      study_id: q.get("STUDY_ID"),
      session_id: q.get("SESSION_ID"),
    };
  } else if (sonaCode) {
    return {
      platform: "sona",
      platform_pid: sonaCode,
      study_id: q.get("study") || null,
      session_id: null,
    };
  }
  return {
    platform: "other",
    platform_pid: null,
    study_id: null,
    session_id: null,
  };
}

// POST with small retry + keepalive for page unload robustness
async function postJSON(url, body, headers = {}, retries = 1) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...headers },
        body: JSON.stringify(body),
        keepalive: true,
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json().catch(() => ({}));
    } catch (err) {
      if (attempt === retries) throw err;
      await new Promise((r) => setTimeout(r, 300 * (attempt + 1)));
    }
  }
  // Should never reach here
  return {};
}

// One-shot finalization → construct payload → POST → resolve regardless
async function finalizeAndSend(resultsArray, participantIdValue) {
  const surveyData = JSON.parse(localStorage.getItem("surveyData") || "{}");
  const meta = getPlatformMeta();

  const body = {
    platform: meta.platform,
    platform_pid: meta.platform_pid,
    study_id: meta.study_id,
    session_id: meta.session_id,
    user_agent: navigator.userAgent,
    payload: {
      participant_id: participantIdValue || null,
      survey: surveyData,
      trials: resultsArray, // [{ stimulus, correctResponse, userResponse, correct }]
      timestamp_iso: new Date().toISOString(),
      app_version: "v1",
    },
  };

  try {
    await postJSON(INGEST_URL, body, { "X-API-Key": API_KEY });
    console.log("Ingest OK");
  } catch (e) {
    console.warn("Ingest failed (continuing to finish):", e);
    // Optional local fallback for debugging:
    // saveResultsAsCSV(resultsArray, participantIdValue);
  }
}
/* ======================= END NEW: Ingestion helpers ======================= */

// -----------------------
// Main Experiment Functions
// -----------------------

// Run an image trial
async function runImageTrial(stimulus, correctResponse, question) {
  // Here, stimulus is a string
  const trialResult = {
    stimulus,
    correctResponse,
    userResponse: null,
    correct: false,
  };

  // Check if this is a cluster trial
  const isClusterTrial = stimulus.toLowerCase().includes("cluster");
  let promptImage = null;

  // Ready Screen
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawCross("gray");
  await new Promise((resolve) => setTimeout(resolve, 500));

  try {
    // Load and display main stimulus
    const img = await loadImage(stimulus);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate scaling factors to fit the image within the canvas
    const scale = Math.min(
      canvas.width / img.width,
      canvas.height / img.height
    );
    const drawWidth = img.width * scale;
    const drawHeight = img.height * scale;

    // Center the image on the canvas
    const xOffset = (canvas.width - drawWidth) / 2;
    const yOffset = (canvas.height - drawHeight) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, xOffset, yOffset, drawWidth, drawHeight);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    // If cluster trial, load prompt image
    if (isClusterTrial) {
      const promptPath = getClusterPromptImage(stimulus);
      if (promptPath) {
        promptImage = await loadImage(promptPath);
      }
    }
  } catch (error) {
    console.error("Error in stimulus screen:", error);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawText("Image Load Error", "red");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return trialResult;
  }

  // Response Screen
  if (isClusterTrial && promptImage) {
    // Draw cluster prompt image instead of text
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const scalePrompt = Math.min(
      canvas.width / promptImage.width,
      canvas.height / promptImage.height
    );
    const promptWidth = promptImage.width * scalePrompt;
    const promptHeight = promptImage.height * scalePrompt;
    const xPromptOffset = (canvas.width - promptWidth) / 2;
    const yPromptOffset = (canvas.height - promptHeight) / 2;
    ctx.drawImage(
      promptImage,
      xPromptOffset,
      yPromptOffset,
      promptWidth,
      promptHeight
    );
  } else {
    const qText = question || "Press the key corresponding to the image";
    drawResponseScreen(qText, "F for LEFT        J for RIGHT");
  }

  // Accept any alphabetical key a-z
  const validKeys = "abcdefghijklmnopqrstuvwxyz".split("");
  trialResult.userResponse = await getUserResponse(validKeys);

  // If no response was recorded within 30 seconds, the trial terminates
  if (trialResult.userResponse === null) {
    return trialResult;
  }

  trialResult.correct = trialResult.userResponse === correctResponse;
  // Feedback Screen
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawText(trialResult.correct ? "CORRECT" : "INCORRECT", "white");
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return trialResult;
}

// Finish experiment and handle redirects
function finishExperiment() {
  if (source === "prolific") {
    // Redirect to Prolific's completion URL
    const completionCode = "ABC123"; // Replace with your actual completion code
    window.location.href = `https://app.prolific.com/submissions/complete?cc=${completionCode}`;
  } else if (source === "hsp") {
    // Show a "Thank you" page or redirect to an HSP confirmation page
    alert("Thank you for participating! You may close this window.");
    // window.location.href = "https://yourlab.university.edu/thanks-hsp.html";
  } else {
    // Default completion for other sources
    alert("Thank you for participating in the experiment!");
  }
}

// Save trial results and survey data as CSV (kept for fallback/testing)
function saveResultsAsCSV(results, participantIdValue) {
  const surveyData = JSON.parse(localStorage.getItem("surveyData") || "{}");

  // Add source information to survey data
  surveyData.source = source || "direct";
  surveyData.prolific_pid =
    source === "prolific" ? params.get("PROLIFIC_PID") : "";

  // Create CSV header with survey fields and trial fields
  const surveyFields = Object.keys(surveyData);
  const trialFields = ["Stimulus", "UserResponse", "Correct", "Timestamp"];
  const csvHeader = ["ParticipantID", ...surveyFields, ...trialFields].join(
    ","
  );

  let csvContent = csvHeader + "\n";

  // Add each trial result with survey data
  results.forEach((res) => {
    const row = [
      participantIdValue,
      ...surveyFields.map((field) => `"${surveyData[field] || ""}"`),
      `"${res.stimulus}"`,
      `"${res.userResponse || "N/A"}"`,
      res.correct,
      `"${new Date().toISOString()}"`,
    ];
    csvContent += row.join(",") + "\n";
  });

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `experiment_results_${participantIdValue}_${
    new Date().toISOString().split("T")[0]
  }.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  // Clean up
  URL.revokeObjectURL(url);

  // Finish experiment after saving data
  setTimeout(() => {
    finishExperiment();
  }, 1000); // Give time for download to start
}

// -----------------------
// Exported function: Run the Experiment (One Trial Only)
// -----------------------
async function runExperiment(participantIdValue) {
  // Initialize canvas if not already done
  if (!canvas) {
    canvas = document.getElementById("experimentCanvas");
    ctx = canvas.getContext("2d");
    ctx.font = "30px sans-serif";
    ctx.textRendering = "geometricPrecision";
  }

  // Randomly select one stimulus from candidateStimuli
  const randomIndex = Math.floor(Math.random() * candidateStimuli.length);
  const selectedStimulus = candidateStimuli[randomIndex];

  // Determine the correct key from the stimulus filename
  const correctResponse = getCorrectResponse(selectedStimulus);

  // Determine the appropriate question prompt based on the stimulus filename
  const question = getQuestionForStimulus(selectedStimulus);

  try {
    console.log(
      "Running trial with stimulus:",
      selectedStimulus,
      "and correct response:",
      correctResponse
    );
    const trialResult = await runImageTrial(
      selectedStimulus,
      correctResponse,
      question
    );

    // NEW: send to server, then finish platform flow
    await finalizeAndSend([trialResult], participantIdValue);
    if (typeof window.startOtherExperiment === "function") {
      window.startOtherExperiment(participantIdValue);
    } else {
      finishExperiment();
    }

    // If you want local CSV during testing, swap the two lines above for:
    // saveResultsAsCSV([trialResult], participantIdValue);
  } catch (error) {
    console.error("Error during trial:", error);
    // Fail-soft: still complete the study
    finishExperiment();
  }
}

// -----------------------
// UI and Modal Management Functions
// -----------------------
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded, initializing experiment UI...");

  // Update participant info display
  const participantInfoElement = document.getElementById("participantInfo");
  if (participantInfoElement) {
    if (source === "prolific" && participantId) {
      participantInfoElement.textContent = `Prolific participant detected: ${participantId}`;
      participantInfoElement.style.color = "black";
    } else if (source === "hsp" && participantId) {
      participantInfoElement.textContent = `HSP participant detected: ${participantId}`;
      participantInfoElement.style.color = "black";
    } else {
      participantInfoElement.textContent =
        "Manual participant ID entry required";
      participantInfoElement.style.color = "black";
    }
  }

  // Lock and consent modal elements
  const lockModal = document.getElementById("lock-modal");
  const consentModal = document.getElementById("consent-modal");
  const instructionScreen = document.getElementById("instructionScreen");
  const experimentContainer = document.getElementById("experimentContainer");
  const codeInput = document.getElementById("code-input");
  const unlockButton = document.getElementById("unlock-button");
  const errorMessage = document.getElementById("error-message");

  // Survey elements
  const survey = document.getElementById("surveyContainer");
  const questions = survey.querySelectorAll(".question");
  const data = { participantID: Date.now() };
  let current = 0;

  // Initially show only the lock modal
  lockModal.style.display = "flex";
  consentModal.style.visibility = "hidden";
  instructionScreen.style.display = "none";
  experimentContainer.style.display = "none";

  // Handle unlock attempt
  function attemptUnlock() {
    const enteredCode = codeInput.value;
    console.log("Unlock attempt with code:", enteredCode);
    if (enteredCode === "6666") {
      // Correct code entered
      console.log("Correct code! Unlocking...");
      lockModal.style.display = "none";
      consentModal.style.visibility = "visible";
      errorMessage.style.visibility = "hidden";
    } else {
      // Incorrect code
      console.log("Incorrect code");
      errorMessage.style.visibility = "visible";
      codeInput.value = "";
      codeInput.focus();
    }
  }

  // Event listeners for unlock
  console.log("Setting up unlock button listeners...");
  unlockButton.addEventListener("click", attemptUnlock);
  codeInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      attemptUnlock();
    }
  });

  // Auto-focus on code input
  codeInput.focus();

  // Consent modal logic
  document.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();
    // Only process Y/N keys if lock modal is hidden
    if (lockModal.style.display === "none") {
      if (key === "y") {
        // Consent given
        consentModal.style.visibility = "hidden";
        survey.style.display = "block";
        localStorage.setItem("userConsent", "true");
      } else if (key === "n") {
        // Consent declined
        alert("You have declined participation. The window will now close.");
        window.open("", "_self").close();
        setTimeout(() => {
          alert(
            "If the window did not close automatically, please close it manually."
          );
        }, 500);
      }
    }
  });

  // Start button event listener
  const startBtn = document.getElementById("startButton");
  if (startBtn) {
    startBtn.addEventListener("click", async () => {
      let finalParticipantId = participantId;

      // If no participant ID from URL parameters, prompt for manual entry
      if (!finalParticipantId) {
        finalParticipantId = prompt(
          "Enter Participant ID or Initials (e.g., 001, AF):"
        );
        if (!finalParticipantId) {
          alert("Experiment aborted: No participant ID provided.");
          return;
        }
      }

      // Hide instruction screen and show experiment container
      const instr = document.getElementById("instructionScreen");
      const container = document.getElementById("experimentContainer");
      if (instr) instr.style.display = "none";
      if (container) container.style.display = "block";

      const experimentCanvas = document.getElementById("experimentCanvas");
      const experimentCtx = experimentCanvas.getContext("2d");
      experimentCtx.clearRect(
        0,
        0,
        experimentCanvas.width,
        experimentCanvas.height
      );

      try {
        runExperiment(finalParticipantId);
      } catch (err) {
        console.error("Error loading experiment script:", err);
      }
    });
  }

  // Survey functionality
  questions.forEach((div) => {
    const button = div.querySelector("button");
    const radios = div.querySelectorAll('input[type="radio"]');

    radios.forEach((radio) => {
      radio.addEventListener("change", () => {
        const key = div.dataset.key;
        const input = div.querySelector(`.other-input.${key}`);
        if (radio.value === "Other" && input) {
          input.style.display = "block";
          input.focus();
        } else if (input) {
          input.style.display = "none";
        }
      });
    });

    if (button) {
      button.addEventListener("click", () => {
        const input = div.querySelector("input, select");
        const key = div.dataset.key;
        const textField = div.querySelector(`.other-input.${key}`);

        if (input) {
          if (input.type === "radio") {
            const checked = div.querySelector('input[type="radio"]:checked');
            if (!checked) {
              alert("Please select an option.");
              return;
            }
            if (
              checked.value === "Other" &&
              textField &&
              textField.value.trim()
            ) {
              data[key] = textField.value.trim();
            } else {
              data[key] = checked.value;
            }
          } else if (!input.value) {
            alert("Please fill in the field.");
            return;
          } else {
            data[key] = input.value;
          }
        }

        questions[current].classList.remove("active");
        current++;
        if (current < questions.length) {
          questions[current].classList.add("active");
        } else {
          localStorage.setItem("surveyData", JSON.stringify(data));
          if (survey) survey.style.display = "none";
          const instructionScreen =
            document.getElementById("instructionScreen");
          if (instructionScreen) instructionScreen.style.display = "block";
        }
      });
    }
  });
});
