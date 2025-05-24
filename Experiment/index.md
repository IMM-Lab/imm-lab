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
            display: flex;
            align-items: flex-start;   
            justify-content: center;
            z-index: 99999;
            overflow-y: auto;          
            padding: 20px;
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
            margin: auto;
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
    </style>
</head>
<body>
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

    <div id="instructionScreen">
        <h1 id="experimentTitle">Welcome to the Experiment</h1>
        <p>Please pay attention to the blue screen below when the experiment begins and follow all instructions promptly.</p>
        <p>Press the button below to start the experiment when you are ready!</p>
        <button id="startButton">Begin Experiment</button>
    </div>
    
    <div id="experimentContainer">
        <canvas id="experimentCanvas" width="956" height="625"></canvas>
    </div>
    
    <script>
        document.addEventListener("DOMContentLoaded", () => {
        const consentModal = document.getElementById("consent-modal");
        const instructionScreen = document.getElementById("instructionScreen");
        const experimentContainer = document.getElementById("experimentContainer");

        // Initially show only the modal
        consentModal.style.visibility = "visible";
        instructionScreen.style.display = "none";
        experimentContainer.style.display = "none";

        document.addEventListener("keydown", (event) => {
            const key = event.key.toLowerCase();
            if (key === "y") {
            // Consent given
            consentModal.style.visibility = "hidden";
            instructionScreen.style.display = "block";
            experimentContainer.style.display = "block";
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

        document.getElementById('instructionScreen').style.display = 'none';
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        try {
            const module = await import('/_scripts/experiment.js');
            module.runExperiment(participantId);
        } catch (err) {
            console.error("Error loading experiment script:", err);
        }
        });
    </script>
</body>
</html>
