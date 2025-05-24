console.log('Updated script loaded!');

// Candidate Stimuli array (from a single folder)
const candidateStimuli = [
    '/assets/images/F_5_3_num_001.png',
    '/assets/images/F_6_5_num_003.png',
    '/assets/images/F_6_5_size_004.png',
    '/assets/images/F_8_6_size_003.png',
    '/assets/images/F_15_10_face_004.png',
    '/assets/images/F_15_10_gabor_001.png',
    '/assets/images/F_25_15_face_002.png',
    '/assets/images/F_25_15_gabor_004.png',
    '/assets/images/J_3_5_num_002.png',
    '/assets/images/J_5_6_num_004.png',
    '/assets/images/J_5_6_size_001.png',
    '/assets/images/J_6_8_size_002.png',
    '/assets/images/J_10_15_face_001.png',
    '/assets/images/J_10_15_gabor_002.png',
    '/assets/images/J_15_25_face_003.png',
    '/assets/images/J_15_25_gabor_003.png',
    '/assets/images/Q_cluster_01.png',
    '/assets/images/E_cluster_06.png',
    '/assets/images/T_cluster_05.png',
    '/assets/images/R_cluster_04.png',
    '/assets/images/Q_cluster_03.png',
    '/assets/images/W_cluster_02.png'
];

// Canvas Setup
const canvas = document.getElementById('experimentCanvas');
const ctx = canvas.getContext('2d');

ctx.font = '30px sans-serif';
ctx.textRendering = "geometricPrecision";

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
    ctx.font = '30px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
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
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'white';
    ctx.font = '30px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(question, canvas.width / 2, canvas.height / 2 - 30);

    ctx.font = '20px Arial';
    ctx.fillText(instructions, canvas.width / 2, canvas.height / 2 + 30);
}

// Display a delay message if the participant is too slow
function drawDelayScreen() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = '30px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Too slow!', canvas.width / 2, canvas.height / 2);
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
                window.removeEventListener('keydown', handleKeyDown);
                clearTimeout(responseTimeout);
                resolve(event.key);
            }
        };
        
        window.addEventListener('keydown', handleKeyDown);
        
        responseTimeout = setTimeout(() => {
            if (!responded) {
                window.removeEventListener('keydown', handleKeyDown);
                drawDelayScreen();
                setTimeout(() => {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    resolve(null);  // Indicates no response was made within 30 seconds
                }, 2000);
            }
        }, 30000);  // 30 seconds timeout
    });
}

// Given a stimulus (string), determine the correct response
// by taking the first letter of the filename
function getCorrectResponse(stimulus) {
    const filename = stimulus.split('/').pop();
    return filename.charAt(0).toLowerCase();
}

// Given a stimulus, determine the appropriate question prompt based on its filename
function getQuestionForStimulus(stimulus) {
    const filename = stimulus.split('/').pop().toLowerCase();
    if (filename.includes('cluster')) {
        return null; // No text question needed for cluster trials
    }

    if (filename.includes('size')) {
        return "Which side has a greater average size?";
    } else if (filename.includes('face')) {
        return "Which side is angrier on average?";
    } else if (filename.includes('num')) {
        return "Which side has more dots?";
    } else if (filename.includes('gabor')) {
        return "Which side is more tilted to the right on average?";
    }
    // Fallback generic question if no keyword is found
    return "Press the key corresponding to the image";
}

// For cluster stimuli, get the matching prompt image path
function getClusterPromptImage(stimulusPath) {
    const filename = stimulusPath.split('/').pop();
    const match = filename.match(/cluster_(\d+)/);
    if (match) {
        return `/assets/images/cluster_prompt_${match[1]}.png`;
    }
    return null;
}

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
    const isClusterTrial = stimulus.toLowerCase().includes('cluster');
    let promptImage = null;

    // Ready Screen
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawCross('gray');
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
        // Load and display main stimulus
        const img = await loadImage(stimulus);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Calculate scaling factors to fit the image within the canvas
        const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
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
            promptImage = await loadImage(getClusterPromptImage(stimulus));
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
        const scalePrompt = Math.min(canvas.width / promptImage.width, canvas.height / promptImage.height);
        const promptWidth = promptImage.width * scalePrompt;
        const promptHeight = promptImage.height * scalePrompt;
        const xPromptOffset = (canvas.width - promptWidth) / 2;
        const yPromptOffset = (canvas.height - promptHeight) / 2;
        ctx.drawImage(promptImage, xPromptOffset, yPromptOffset, promptWidth, promptHeight);
    } else {
        drawResponseScreen(question, "F for LEFT        J for RIGHT");
    }

    // Accept any alphabetical key a-z
    const validKeys = "abcdefghijklmnopqrstuvwxyz".split("");
    trialResult.userResponse = await getUserResponse(validKeys);
    
    // If no response was recorded within 30 seconds, the trial terminates
    if (trialResult.userResponse === null) {
        return trialResult;
    } else {
        trialResult.correct = trialResult.userResponse === correctResponse;
        // Feedback Screen
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawText(trialResult.correct ? 'CORRECT' : 'INCORRECT', 'white');
        await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    
    return trialResult;
}

// Save trial result as CSV
// function saveResultsAsCSV(results, participantId) {
//     let csvContent = "ParticipantID,Stimulus,Response,Correct\n";
//     results.forEach((res) => {
//         csvContent += `${participantId},${res.stimulus},${res.userResponse || 'N/A'},${res.correct}\n`;
//     });
//     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//     const url = URL.createObjectURL(blob);
    
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `experiment_results_${participantId}.csv`;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
// }

// ─── config ─────────────────────────────────────────────────────────────────
const SHEET_API = 'https://sheetdb.io/api/v1/5uzg1s1qcb9om';

// ─── Save to Google Sheet ─────────────────────────────────────────────────────
async function saveResultsOnline(results, participantId) {
  for (const r of results) {
    const payload = {
      ParticipantID: participantId,
      Stimulus:      r.stimulus,
      UserResponse:  r.userResponse || '',
      Correct:       r.correct,
      Timestamp:     new Date().toISOString()
    };

    try {
      const res = await fetch(SHEET_API, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ data: payload })
      });
      const json = await res.json();
      console.log('Sheet response:', json);
    } catch (err) {
      console.error('Failed to save to sheet:', err);
    }
  }
}


// -----------------------
// Exported function: Run the Experiment (One Trial Only)
// -----------------------
export async function runExperiment(participantId) {
    // Randomly select one stimulus from candidateStimuli
    const randomIndex = Math.floor(Math.random() * candidateStimuli.length);
    const selectedStimulus = candidateStimuli[randomIndex];
    
    // Determine the correct key from the stimulus filename
    const correctResponse = getCorrectResponse(selectedStimulus);
    
    // Determine the appropriate question prompt based on the stimulus filename
    const question = getQuestionForStimulus(selectedStimulus);
    
    try {
        console.log('Running trial with stimulus:', selectedStimulus, 'and correct response:', correctResponse);
        const trialResult = await runImageTrial(selectedStimulus, correctResponse, question);
        // saveResultsAsCSV([trialResult], participantId);
        await saveResultsOnline([trialResult], participantId);
    } catch (error) {
        console.error("Error during trial:", error);
    }
}

// -----------------------
// Begin Experiment on Button Click Only
// -----------------------
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("beginExperimentButton").addEventListener("click", () => {
        if (!window.experimentHasStarted) {
            window.experimentHasStarted = true;
            const participantId = prompt('Enter Participant ID or Initials (e.g., 001, AF):');
            if (participantId) {
                runExperiment(participantId);
            } else {
                alert('Experiment aborted: No participant ID provided.');
            }
        }
    });
});
