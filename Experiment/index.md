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
                <div style="display: flex; align-items: center; justify-content: space-between;">
                    <img src="/images/ubc-logo.png" alt="UBC Logo" style="height: 100px; width: auto;">
                    <div>
                        <strong>Department of Psychology</strong><br/>
                        2136 West Mall<br/>
                        Vancouver, BC V6T 1Z4<br/>
                        <a href="https://www.imm-lab.ca/" target="_blank">https://www.imm-lab.ca/</a>
                    </div>
                </div>
            </div>
            <h2>Consent for Participation</h2>
            <p><strong>Ethics ID#: [H25-00248]</strong></p>
            <p><strong>Study Title:</strong> Seeing the man: The properties of ensemble coding</p>
            <h3>Principal Investigator</h3>
            <p>
                Hee-Yeon Im (<a href="mailto:heeyeon.im@ubc.ca">heeyeon.im@ubc.ca</a>)<br/>
                Assistant Professor, Department of Psychology
            </p>
            <h3>Co-Investigators</h3>
            <p>
                Alexis Fong (<a href="mailto:afong01@mail.ubc.com">afong01@mail.ubc.ca</a>), Research Assistant, Cognitive Systems
            </p>
            <p>
                Victor Cui (<a href="mailto:csq2002@student.ubc.ca">csq2002@student.ubc.ca</a>), Master's Student
            </p>
            <h3>Research Study Summary, Risks, and Benefits</h3>
            <p>
                Thank you for your interest in participating in this research study. Please take a moment to review the following information, and feel free to ask any questions you may have. Your participation is entirely voluntary—you may choose to take part or decline, and you are free to withdraw at any time without any consequences.
            </p>
            <p>
                This study aims to enhance our understanding of human perception and cognition. You will be presented with stimuli containing dots, lines, faces, or gratings (circles with stripe patterns) and will respond by pressing specific keys on your keyboard.
            </p>
            <p>
                These tasks involve everyday cognitive processes that people routinely engage in, and as such, the study presents no known risks. While there may be no direct benefit to you, your participation will contribute to scientific research aimed at furthering our understanding of how the human mind perceives and interprets visual information.
            </p>
            <h3>Duration</h3>
            <p>If you agree to take part, the study will last approximately 45 minutes.</p>
            <h3>Costs and Compensation</h3>
            <p>There are no costs associated with participation in this study. After completing the experiment, you will receive $10 CAD. If you are a UBC undergraduate who participates in this study through the UBC Psychology Human Subject Pool, you will receive 1 credit to be counted for your psychology course requirements, instead of monetary compensation.</p>
            <h3>Confidentiality</h3>
            <p>No personally identifying information will be collected, so your participation will be entirely anonymous. If you are using Prolific, your data may be temporarily stored at their homebase, which is in the UK. However, after downloaded from Prolific, your data will be labelled using a unique subject number (e.g., p001), pooled with those from other participants, and will be stored in a secure lab server which can only be accessed by the study team members. Your data may be included in scientific publications. Depending on journal open access requirements, data collected from this study may be uploaded to public data repositories. As the data is collected anonymously, once the data is submitted, you will no longer be able to withdraw your data.</p>
            <h3>Contact Information (Question about the study)</h3>
            <p>
               Please contact the researchers listed above if you have any questions about the study.
            </p>
            <h3>Contact Information (Concerns/complaints)</h3>
            <p>
               If you have any concerns or complaints about your rights as a research participant and/or your experiences while participating in this study, contact the Research Participant Complaint Line in the UBC Oﬃce of Research Ethics at 604-822-8598 or if long-distance e-mail RSIL@ors.ubc.ca or call toll free 1-877-822-8598.
            </p>
            <h3>Informed Consent</h3>
            <p>
                Your participation indicates that you have read and understood this consent form and the information presented and that you agree to be in this study.
            </p>
            <div class="consent-instruction">
                Please press the 'Y' key to proceed to the experiment or the 'N' key to exit the experiment.
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
        <label><input type="radio" name="sex" value="Male"> Male</label>
        <label><input type="radio" name="sex" value="Female"> Female</label>
        <label><input type="radio" name="sex" value="Non-binary"> Non-binary</label>
        <label><input type="radio" name="sex" value="Prefer not to say"> Prefer not to say</label>
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
    <label><input type="radio" name="firstLanguage" value="Cantonese"> Cantonese</label>
    <label><input type="radio" name="firstLanguage" value="Spanish"> Spanish</label>
    <label><input type="radio" name="firstLanguage" value="French"> French</label>
    <label><input type="radio" name="firstLanguage" value="Korean"> Korean</label>
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
<!-- ... your header/consent/survey HTML ... -->

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

<!-- Your main site JS (survey/consent logic).
     If you use external files, include them with `defer`
<!-- <script src="main.js" defer></script> 
-->

<!-- Helper block to handle repo-safe paths + chain to the 2nd experiment -->
<script>
  // --- Build URL from repo root (GitHub Pages safe) ---
  function urlFromRepoRoot(path) {
    path = String(path || '').replace(/^\/+/, '');
    const parts = window.location.pathname.split('/').filter(Boolean);
    const repo = parts.length ? parts[0] : '';
    const prefix = repo ? `/${repo}/` : '/';
    return (prefix + path).replace(/\/{2,}/g, '/');
  }

  // --- Load a script once, then run a callback ---
  const __loadedScripts = new Set();
  function loadScript(pathFromRepoRoot, cb) {
    const url = urlFromRepoRoot(pathFromRepoRoot);
    if (__loadedScripts.has(url)) { cb && cb(); return; }
    const s = document.createElement('script');
    s.src = url;
    s.defer = true;
    s.onload = () => { __loadedScripts.add(url); cb && cb(); };
    s.onerror = () => { console.error('Failed to load', url); alert(`Could not load: ${url}`); };
    document.body.appendChild(s);
  }

  // --- Chain into the second experiment when the first one finishes ---
  function startOtherExperiment(participantId) {
    // adjust path to where other_experiment.js actually lives in your repo
    loadScript('scripts/other_experiment.js', async () => { //CHANGE HERE WITH ACTUAL NAME
      try {
        if (typeof runOtherExperiment === 'function') {
          await runOtherExperiment(participantId);   // this file should POST its own data
        } else {
          console.warn('runOtherExperiment() not found in other_experiment.js');
        }
      } catch (e) {
        console.warn('other_experiment error:', e);
      } finally {
        if (typeof finishExperiment === 'function') finishExperiment();
      }
    });
  }
</script>

<!-- If you want to dynamically load the first experiment too (optional) -->
<!-- <script>
  loadScript('js/experiment.js', () => {
    // experiment.js is ready; you can reveal instructions if you prefer
  });
</script> -->

</body>
</html>

