---
title: Experiment
nav:
  order: 6
  tooltip: Ongoing research projects
---

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Stimulus Experiment</title>
    <style>
        body {
            text-align: center;
            background-color: #28282B;
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            min-height: 100vh;
        }
        #experimentContainer {
            display: block;
        }
        #startButton {
            padding: 15px 30px;
            font-size: 20px;
            cursor: pointer;
            background-color: #91d1f8;
            color: black;
            border: none;
            border-radius: 5px;
            display: block;
            margin: 20px auto;
            transition: background-color 0.3s, transform 0.1s;
        }
        /* Hover Effect: Changes color */
        #startButton:hover {
            background-color: #e0e0e0;
        }
        /* Active Click Effect: Slightly darker and moves down */
        #startButton:active {
            background-color: #e0e0e0;
            transform: scale(0.98);
        }
        #experimentTitle {
            display: inline-block;
            text-align: left;
            padding: 8px 20px;
            border: 2px solid black;
            background-color: #B2BEB5;
            color: black;
            font-size: 26px;
            font-weight: bold;
            box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
        }
        canvas {
            background-color: #28282B;
            border: 2px solid black;
            display: block;
            margin: 20px auto;
            position: relative;
        }
        
        /* hide footer during lock and consent page */
        body:has(#consent-modal[style*="visible"]),
        body:has(#lock-modal[style*="flex"]) {
            footer {
                display: none;
            }
        }

        /* consent css */
        #instructionScreen {
            font-size: 18px;
            text-align: left;
            margin-bottom: 10px;
        }
        #consent-modal {
            position: fixed;
            top: 0; 
            right: 0; 
            bottom: 0; 
            left: 0;
            background-color: #28282B;
            z-index: 99999;
            overflow-y: auto;
            padding: 120px 20px 120px 20px;
            box-sizing: border-box;
        }
        #consent-box {
            background-color: #B2BEB5;
            color: black;
            padding: 30px;
            border: 2px solid black;
            border-radius: 5px;
            max-width: 800px;
            width: 100%;
            margin: 0 auto;
            box-sizing: border-box;
            box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
            font-family: Arial, sans-serif;
        }
        #consent-box h2,
        #consent-box h3 {
            margin-top: 1.5em;
            margin-bottom: 0.5em;
        }

        #consent-box h2 {
            font-size: 24px;
            font-weight: bold;
        }

        #consent-box h3 {
            font-size: 18px;
            font-weight: bold;
        }

        #consent-box p {
            margin-bottom: 1em;
            line-height: 1.4;
        }

        #consent-box .header {
            font-size: 14px;
            margin-bottom: 20px;
            line-height: 1.3;
        }

        #consent-box a {
            color: #0066cc;
            text-decoration: underline;
        }

        #consent-box a:hover {
            color: #004499;
        }

        .consent-instruction {
            background-color: #91d1f8;
            padding: 15px;
            border-radius: 5px;
            margin-top: 20px;
            font-weight: bold;
            text-align: center;
            border: 1px solid black;
        }

        /* survey css */
        #surveyContainer {
            display: none;
            background-color: #B2BEB5;
            color: black;
            padding: 30px;
            border: 2px solid black;
            border-radius: 5px;
            max-width: 800px;
            width: 90%;
            margin: 60px auto;
            box-sizing: border-box;
            box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
            font-family: Arial, sans-serif;
        }

        #surveyContainer h2 {
            text-align: center;
            font-size: 24px;
            margin-bottom: 1rem;
        }

        .question {
            display: none;
            margin-top: 1rem;
        }

        .question.active {
            display: block;
        }

        .left-align {
            text-align: left;
        }

        .center-align {
            text-align: center;
        }

        button {
            margin-top: 1rem;
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
            background-color: #91d1f8;
            color: black;
            border: none;
            border-radius: 5px;
            transition: background-color 0.3s;
        }

        button:hover {
            background-color: #7bc3f0;
        }

        label {
            display: block;
            margin: 0.5rem 0;
        }

        .other-input {
            margin-top: 0.5rem;
            display: none;
            width: 100%;
            padding: 5px;
            font-size: 14px;
        }

        /* lock css */
        #lock-modal {
            position: fixed;
            top: 0; 
            right: 0; 
            bottom: 0; 
            left: 0;
            background-color: #28282B;
            z-index: 100000; /* Higher than consent modal */
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
            box-sizing: border-box;
        }

        #lock-box {
            background-color: #B2BEB5;
            color: black;
            padding: 40px;
            border: 2px solid black;
            border-radius: 5px;
            text-align: center;
            max-width: 400px;
            width: 100%;
            box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
        }

        #lock-box h2 {
            margin-bottom: 20px;
            font-size: 24px;
        }

        #code-input {
            font-size: 24px;
            padding: 10px;
            text-align: center;
            border: 2px solid black;
            border-radius: 5px;
            margin: 20px 0;
            width: 150px;
            letter-spacing: 5px;
        }

        #code-input:focus {
            outline: none;
            box-shadow: none;
        }

        #unlock-button {
            padding: 12px 25px;
            font-size: 18px;
            cursor: pointer;
            background-color: #91d1f8;
            color: black;
            border: none;
            border-radius: 5px;
            margin-top: 15px;
            transition: background-color 0.3s;
        }

        #unlock-button:hover {
            background-color: #7bc3f0;
        }

        .error-message {
            color: white;
            font-weight: bold;
            text-align: center;
            margin-top: 10px;
            visibility: hidden;
        }

    </style>
</head>
<body>
    <!--lock-->
    <div id="lock-modal">
    <div id="lock-box">
        <h2>Enter Access Code</h2>
        <p>Please enter the 4-digit access code to proceed:</p>
        <input type="password" id="code-input" maxlength="4" placeholder="••••">
        <br>
        <button id="unlock-button">Unlock</button>
        <p class="error-message" id="error-message">Incorrect code. Please try again.</p>
    </div>
    </div>

    <!--consent-->
    <div id="consent-modal">
        <div id="consent-box">
            <div class="header">
                <strong>Department of Psychology</strong><br/>
                2136 West Mall<br/>
                Vancouver, BC V6T 1Z4<br/>
                <a href="https://www.imm-lab.ca/" target="_blank">https://www.imm-lab.ca/</a>
            </div>

            <h2>Consent for Participation</h2>
            <p><strong>Ethics ID#: [ ]</strong></p>
            <p><strong>Study Title:</strong> Seeing the man: The properties of ensemble coding</p>

            <h3>Principal Investigator</h3>
            <p>
                Hee-Yeon Im (<a href="mailto:heeyeon.im@ubc.ca">heeyeon.im@ubc.ca</a>)<br/>
                Assistant Professor, Department of Psychology
            </p>

            <h3>Co-Investigators</h3>
            <p>
                Alexis Fong (<a href="mailto:alexisfong01@gmail.com">alexisfong01@gmail.com</a>), Research Assistant, Cognitive Systems
            </p>
            <p>
                Victor Cui (<a href="mailto:csq2002@student.ubc.ca">csq2002@student.ubc.ca</a>), Directed Studies Student, Psychology
            </p>

            <h3>Research Study Summary, Risks, and Benefits</h3>
            <p>
                Thank you for your willingness to participate in this research study.
                Please take a moment to review the following information, and feel free to ask any questions you may have. Your participation is entirely voluntary—you may choose to take part or decline, and you are free to withdraw at any time without any consequences.
            </p>
            <p>
                This study aims to enhance our understanding of human perception and cognition. You will be presented with stimuli containing dots, lines, faces, or gratings and will respond by pressing specific keys on your keyboard.
            </p>
            <p>
                These tasks involve everyday cognitive processes and present no known risks. While there may be no direct benefit to you, your participation will contribute to scientific research.
            </p>

            <h3>Duration</h3>
            <p>If you agree to take part, the study will last approximately 5 minutes.</p>

            <h3>Costs and Compensation</h3>
            <p>There are no costs associated with participation in this study. You will receive $[ ] as compensation.</p>

            <h3>Confidentiality</h3>
            <p>No personally identifying information will be collected. Your data will be stored securely and may be included in scientific publications.</p>

            <h3>Learning More</h3>
            <p>
                If you have any questions about the study, contact the researchers listed above. For complaints or ethical concerns, you may contact UBC's Research Participant Complaint Line at 604-822-8598 or email <a href="mailto:RSIL@ors.ubc.ca">RSIL@ors.ubc.ca</a>.
            </p>

            <h3>Informed Consent</h3>
            <p>
                Your participation indicates that you have read and understood this consent form and that you agree to be in this study.
            </p>
            
            <div class="consent-instruction">
                Please press the 'Y' key to proceed to the experiment or the 'N' key to exit.
            </div>
        </div>
    </div>

    <!-- Survey -->
    <div id="surveyContainer">
    <h2>Participant Survey</h2>

    <div class="question active" data-key="age">
        <label>What is your age?<br>
        <input type="number" min="18" required />
        </label><br>
        <button>Next</button>
    </div>

    <div class="question left-align" data-key="sex">
        <p>What is your sex?</p>
        <label><input type="radio" name="sex" value="male"> Male</label>
        <label><input type="radio" name="sex" value="female"> Female</label>
        <label><input type="radio" name="sex" value="non-binary"> Non-binary</label>
        <label><input type="radio" name="sex" value="prefer not to say"> Prefer not to say</label>
        <label><input type="radio" name="sex" value="Other"> Other (please specify)</label>
        <input type="text" class="other-input sex" placeholder="Please specify" />
        <button>Next</button>
    </div>

    <div class="question left-align" data-key="ethnicity">
        <p>What is your ethnicity?</p>
        <label><input type="radio" name="ethnicity" value="Hispanic or Latino" required> Hispanic or Latino</label>
        <label><input type="radio" name="ethnicity" value="Jewish"> Jewish</label>
        <label><input type="radio" name="ethnicity" value="Chinese"> Chinese</label>
        <label><input type="radio" name="ethnicity" value="Japanese"> Japanese</label>
        <label><input type="radio" name="ethnicity" value="Korean"> Korean</label>
        <label><input type="radio" name="ethnicity" value="South Asian (e.g., Indian, Pakistani)"> South Asian (e.g., Indian, Pakistani)</label>
        <label><input type="radio" name="ethnicity" value="Southeast Asian (e.g., Filipino, Thai)"> Southeast Asian (e.g., Filipino, Thai)</label>
        <label><input type="radio" name="ethnicity" value="Indigenous"> Indigenous</label>
        <label><input type="radio" name="ethnicity" value="Arab"> Arab</label>
        <label><input type="radio" name="ethnicity" value="Roma / Romani"> Roma / Romani</label>
        <label><input type="radio" name="ethnicity" value="Other"> Other (please specify)</label>
        <input type="text" class="other-input ethnicity" placeholder="Please specify" />
        <button>Next</button>
    </div>

    <div class="question left-align" data-key="race">
        <p>What is your race?</p>
        <label><input type="radio" name="race" value="European" required> White (European descent)</label>
        <label><input type="radio" name="race" value="Middle Eastern"> Middle Eastern</label>
        <label><input type="radio" name="race" value="African American"> African American</label>
        <label><input type="radio" name="race" value="African"> African (e.g., Nigerian, Ethiopian)</label>
        <label><input type="radio" name="race" value="East Asian"> East Asian (e.g., Chinese, Japanese, Korean)</label>
        <label><input type="radio" name="race" value="South Asian"> South Asian (e.g., Indian, Pakistani)</label>
        <label><input type="radio" name="race" value="Southeast Asian"> Southeast Asian (e.g., Filipino, Thai)</label>
        <label><input type="radio" name="race" value="Native Hawaiian or Other Pacific Islander"> Native Hawaiian or Other Pacific Islander</label>
        <label><input type="radio" name="race" value="Multiracial / Two or More Races"> Multiracial / Two or More Races</label>
        <label><input type="radio" name="race" value="Other"> Other (please specify)</label>
        <input type="text" class="other-input race" placeholder="Please specify" />
        <button>Next</button>
    </div>

    <div class="question left-align" data-key="firstLanguage">
        <p>What is your first language?</p>
    <label><input type="radio" name="firstLanguage" value="English" required> English</label>
    <label><input type="radio" name="firstLanguage" value="Mandarin"> Mandarin</label>
    <label><input type="radio" name="firstLanguage" value="Spanish"> Spanish</label>
    <label><input type="radio" name="firstLanguage" value="French"> French</label>
    <label><input type="radio" name="firstLanguage" value="Hindi"> Hindi</label>
    <label><input type="radio" name="firstLanguage" value="Arabic"> Arabic</label>
    <label><input type="radio" name="firstLanguage" value="Prefer not to say"> Prefer not to say</label>
        <label><input type="radio" name="firstLanguage" value="Other"> Other (please specify)</label>
        <input type="text" class="other-input firstLanguage" placeholder="Please specify" />
        <button>Next</button>
    </div>

    <div class="question center-align" data-key="timePerception">
        <p>If a meeting on Wednesday was pushed forward a day, what day is the new meeting?</p>
        <label><input type="radio" name="timePerception" value="Tuesday" required /> Tuesday</label>
        <label><input type="radio" name="timePerception" value="Thursday" /> Thursday</label><br>
        <button>Submit</button>
    </div>
    </div>

    <!-- Experiment -->
    <div id="instructionScreen">
        <h1 id="experimentTitle">Welcome to the Experiment</h1>
        <p>Please pay attention to the black screen below when the experiment begins and follow all instructions promptly.</p>
        <p>Press the button below to start the experiment when you are ready!</p>
        <button id="startButton">Begin Experiment</button>
    </div>
    
    <div id="experimentContainer">
        <canvas id="experimentCanvas" width="956" height="625"></canvas>
    </div>
    
    <script>
    document.addEventListener("DOMContentLoaded", () => {
        const lockModal = document.getElementById("lock-modal");
        const consentModal = document.getElementById("consent-modal");
        const instructionScreen = document.getElementById("instructionScreen");
        const experimentContainer = document.getElementById("experimentContainer");
        const codeInput = document.getElementById("code-input");
        const unlockButton = document.getElementById("unlock-button");
        const errorMessage = document.getElementById("error-message");

        // Initially show only the lock modal
        lockModal.style.display = "flex";
        consentModal.style.visibility = "hidden";
        instructionScreen.style.display = "none";
        experimentContainer.style.display = "none";

        // Handle unlock attempt
        function attemptUnlock() {
            const enteredCode = codeInput.value;
            if (enteredCode === "6666") {
                // Correct code entered
                lockModal.style.display = "none";
                consentModal.style.visibility = "visible";
                errorMessage.style.visibility = "hidden";
            } else {
                // Incorrect code
                errorMessage.style.visibility = "visible";
                codeInput.value = "";
                codeInput.focus();
            }
        }

        // Event listeners for unlock
        unlockButton.addEventListener("click", attemptUnlock);
        
        codeInput.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                attemptUnlock();
            }
        });

        // Auto-focus on code input
        codeInput.focus();

        // Existing consent modal logic (modify the initial state)
        document.addEventListener("keydown", (event) => {
            const key = event.key.toLowerCase();
            // Only process Y/N keys if lock modal is hidden
            if (lockModal.style.display === "none") {
                if (key === "y") {
                    // Consent given
                    consentModal.style.visibility = "hidden";
                    document.getElementById("surveyContainer").style.display = "block";
                    localStorage.setItem("userConsent", "true");
                }
                else if (key === "n") {
                    // Consent declined
                    alert("You have declined participation. The window will now close.");
                    window.open("", "_self").close();
                    setTimeout(() => {
                        alert("If the window did not close automatically, please close it manually.");
                    }, 500);
                }
            }
        });
    });
    </script>

    <script type="module">
        const canvas = document.getElementById('experimentCanvas');
        const ctx = canvas.getContext('2d');

        document.getElementById('startButton').addEventListener('click', async () => {
        const participantId = prompt('Enter Participant ID or Initials (e.g., 001, AF):');
        if (!participantId) {
            alert('Experiment aborted: No participant ID provided.');
            return;
        }

        document.getElementById('experimentContainer').style.display = 'block';
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        try {
            const module = await import('/_scripts/experiment.js');
            module.runExperiment(participantId);
        } catch (err) {
            console.error("Error loading experiment script:", err);
        }
        });
    </script>
    
    <script>
    const survey = document.getElementById('surveyContainer');
    const questions = survey.querySelectorAll('.question');
    const data = { participantID: Date.now() };
    let current = 0;

    questions.forEach((div, index) => {
        const button = div.querySelector('button');
        const otherInput = div.querySelector('.other-input');
        const radios = div.querySelectorAll('input[type="radio"]');

        radios.forEach(radio => {
        radio.addEventListener('change', () => {
            const key = div.dataset.key;
            const input = div.querySelector(`.other-input.${key}`);
            if (radio.value === 'Other' && input) {
            input.style.display = 'block';
            input.focus();
            } else if (input) {
            input.style.display = 'none';
            }
        });
        });

        button.addEventListener('click', () => {
        const input = div.querySelector('input, select');
        const key = div.dataset.key;
        const textField = div.querySelector(`.other-input.${key}`);

        if (input) {
            if (input.type === 'radio') {
            const checked = div.querySelector('input[type="radio"]:checked');
            if (!checked) return alert('Please select an option.');
            if (checked.value === 'Other' && textField && textField.value.trim()) {
                data[key] = textField.value.trim();
            } else {
                data[key] = checked.value;
            }
            } else if (!input.value) {
            return alert('Please fill in the field.');
            } else {
            data[key] = input.value;
            }
        }

        questions[current].classList.remove('active');
        current++;
        if (current < questions.length) {
            questions[current].classList.add('active');
        } else {
            localStorage.setItem("surveyData", JSON.stringify(data));
            survey.style.display = "none";
            document.getElementById("instructionScreen").style.display = "block";
        }
        });
    });
    </script>

</body>
</html>
