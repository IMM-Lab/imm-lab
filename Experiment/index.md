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
    <link rel="stylesheet" href="/_styles/experiment.css">
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
        <p>Please pay attention to the experiment window that will appear when you start.</p>
        <p id="participantInfo"></p>
        <p>Press the button below to start the experiment when you are ready!</p>
        <button id="startButton">Begin Experiment</button>
    </div>
    <div id="experimentContainer" style="display: none;">
        <canvas id="experimentCanvas" width="956" height="625"></canvas>
    </div>
</body>
</html>
