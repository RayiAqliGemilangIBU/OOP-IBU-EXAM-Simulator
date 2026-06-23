// C:\My File\S1\oop\webPrep\app.js

document.addEventListener("DOMContentLoaded", () => {
  
  // --- Application State ---
  let appState = {
    examType: null,         // 'last_year' or 'becir'
    selectedPacket: null,   // 1 to 10 for Last Year
    questions: [],          // Active questions array
    currentQuestionIdx: 0,  // Active index
    studentAnswers: {},     // Map of questionId -> string (code written)
    studentScores: {},      // Map of questionId -> number (points earned)
    studentTestLogs: {},    // Map of questionId -> array (test trace logs)
    studentConsoleLogs: {}, // Map of questionId -> array (System.out.println output)
    timeLeft: 5400,         // 1h 30m = 90 minutes = 5400 seconds
    timerInterval: null
  };

  let editor = null;

  // --- HTML Element Handles ---
  const welcomeScreen = document.getElementById("welcome-screen");
  const examWorkspace = document.getElementById("exam-workspace");
  const resultsScreen = document.getElementById("results-screen");
  
  const btnStartLastYear = document.getElementById("btn-start-last-year");
  const btnStartBecir = document.getElementById("btn-start-becir");
  const btnSubmitExam = document.getElementById("btn-submit-exam");
  const btnRunTest = document.getElementById("btn-run-test");
  const btnResetCode = document.getElementById("btn-reset-code");
  const btnBackHome = document.getElementById("btn-back-home");
  
  const examTitleText = document.getElementById("exam-title-text");
  const countdownTimer = document.getElementById("countdown-timer");
  const questionTabs = document.getElementById("question-tabs");
  const questionDescription = document.getElementById("question-description");
  
  const consoleDrawer = document.getElementById("console-drawer");
  const tabTestCases = document.getElementById("tab-test-cases");
  const tabConsole = document.getElementById("tab-console");
  const testCasesPanel = document.getElementById("test-cases-panel");
  const consolePanel = document.getElementById("console-panel");
  
  const testResultsList = document.getElementById("test-results-list");
  const consoleOutputText = document.getElementById("console-output-text");
  const currentScoreText = document.getElementById("current-score-text");
  const totalScoreText = document.getElementById("total-score-text");
  
  const finalScoreValue = document.getElementById("final-score-value");
  const finalMaxScore = document.getElementById("final-max-score");
  const gradeComment = document.getElementById("grade-comment");
  const resultsTableBody = document.getElementById("results-table-body");
  
  // Code Review Modal elements
  const codeReviewModal = document.getElementById("code-review-modal");
  const modalQTitle = document.getElementById("modal-q-title");
  const modalQScore = document.getElementById("modal-q-score");
  const modalQCode = document.getElementById("modal-q-code");
  const btnCloseModal = document.getElementById("btn-close-modal");

  // --- Autocomplete & Editor Helpers ---
  CodeMirror.registerHelper("hint", "javaCustom", function(editor, options) {
    const cur = editor.getCursor();
    const token = editor.getTokenAt(cur);
    const start = token.start;
    const end = cur.ch;
    const line = cur.line;
    const word = token.string;

    const javaKeywords = [
      "public", "private", "protected", "class", "interface", "extends", "implements",
      "static", "final", "abstract", "new", "return", "void", "import", "package",
      "this", "super", "throw", "throws", "try", "catch", "finally", "if", "else",
      "for", "while", "do", "break", "continue", "switch", "case", "default",
      "String", "Integer", "Double", "Float", "Boolean", "Character", "int", "double", "float", "boolean", "char", "long", "short", "byte",
      "ArrayList", "HashMap", "List", "Map", "Optional", "System", "System.out.println", "System.out.print",
      "DriverManager", "Connection", "PreparedStatement", "ResultSet", "BufferedReader", "FileReader", "BufferedWriter", "FileWriter", "PrintWriter",
      "WrongFormatException", "RuntimeException", "Exception", "NumberFormatException"
    ];

    const docText = editor.getValue();
    const wordRegex = /[a-zA-Z_0-9.]{3,}/g;
    const docWords = new Set();
    let m;
    while ((m = wordRegex.exec(docText)) !== null) {
      docWords.add(m[0]);
    }

    const allSuggestions = Array.from(new Set([...javaKeywords, ...docWords]));
    const search = word.trim();
    if (!search) return null;
    const list = allSuggestions.filter(s => s.toLowerCase().startsWith(search.toLowerCase()) && s !== search);

    return {
      list: list,
      from: CodeMirror.Pos(line, start),
      to: CodeMirror.Pos(line, end)
    };
  });

  // --- Initializers ---
  function initCodeEditor() {
    const textarea = document.getElementById("code-textarea");
    editor = CodeMirror.fromTextArea(textarea, {
      mode: "text/x-java",
      theme: "dracula",
      lineNumbers: true,
      matchBrackets: true,
      autoCloseBrackets: true, // VS Code style bracket auto-closing
      indentUnit: 4,
      tabSize: 4,
      lineWrapping: true
    });

    // Auto-trigger autocomplete as user types (VS Code style)
    editor.on("inputRead", (cm, change) => {
      if (change.origin === "+input") {
        const text = change.text[0];
        if (/^[a-zA-Z_0-9.]$/.test(text)) {
          cm.showHint({
            hint: CodeMirror.hint.javaCustom,
            completeSingle: false
          });
        }
      }
    });

    // Sync editor changes back to state in real time
    editor.on("change", () => {
      if (appState.questions.length > 0) {
        const activeQ = appState.questions[appState.currentQuestionIdx];
        appState.studentAnswers[activeQ.id] = editor.getValue();
        // Update navigation tab badges (unanswered vs answered status)
        updateTabBadges();
      }
    });
  }

  initCodeEditor();

  // --- Navigation & View Control ---
  function showView(viewId) {
    welcomeScreen.classList.remove("active");
    examWorkspace.classList.remove("active");
    resultsScreen.classList.remove("active");

    if (viewId === "welcome") welcomeScreen.classList.add("active");
    if (viewId === "workspace") examWorkspace.classList.add("active");
    if (viewId === "results") resultsScreen.classList.add("active");
  }

  // --- Exam Timer ---
  function startTimer() {
    appState.timeLeft = 5400; // 90 minutes
    updateTimerDisplay();
    
    if (appState.timerInterval) clearInterval(appState.timerInterval);
    
    appState.timerInterval = setInterval(() => {
      appState.timeLeft--;
      updateTimerDisplay();
      
      if (appState.timeLeft <= 0) {
        clearInterval(appState.timerInterval);
        alert("Exam time has expired! Your answers will be submitted automatically.");
        submitExam();
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    const hours = Math.floor(appState.timeLeft / 3600);
    const minutes = Math.floor((appState.timeLeft % 3600) / 60);
    const seconds = appState.timeLeft % 60;
    
    const fmt = (val) => String(val).padStart(2, '0');
    countdownTimer.textContent = `${fmt(hours)}:${fmt(minutes)}:${fmt(seconds)}`;
  }

  // --- Exam Start Pipeline ---
  function startExam(type) {
    appState.examType = type;
    appState.studentAnswers = {};
    appState.studentScores = {};
    appState.studentTestLogs = {};
    appState.studentConsoleLogs = {};
    appState.currentQuestionIdx = 0;

    if (type === "last_year") {
      // Pick a random packet out of 10
      const packetIdx = Math.floor(Math.random() * 10); // 0 to 9
      appState.selectedPacket = packetIdx + 1;
      appState.questions = window.EXAM_DATA.LAST_YEAR_PACKETS[packetIdx].questions;
      examTitleText.textContent = `Simulation - Last Year (Packet ${appState.selectedPacket})`;
    } else {
      appState.selectedPacket = null;
      appState.questions = window.EXAM_DATA.BECIR_QUESTIONS;
      examTitleText.textContent = `Simulation - Becir`;
    }

    // Initialize starting templates
    appState.questions.forEach(q => {
      appState.studentAnswers[q.id] = q.starterCode;
      appState.studentScores[q.id] = 0;
      appState.studentTestLogs[q.id] = ["Please run tests on your code by clicking the 'Run Tests' button."];
      appState.studentConsoleLogs[q.id] = ["Terminal ready..."];
    });

    renderQuestionTabs();
    showQuestion(0);
    startTimer();
    showView("workspace");
    
    // Refresh CodeMirror instance to render properly inside workspace
    setTimeout(() => {
      editor.refresh();
      editor.focus();
    }, 150);
  }

  // Render Left sidebar tabs
  function renderQuestionTabs() {
    questionTabs.innerHTML = "";
    appState.questions.forEach((q, idx) => {
      const btn = document.createElement("button");
      btn.className = `q-tab-btn ${idx === 0 ? 'active' : ''}`;
      
      const badge = document.createElement("span");
      badge.className = "q-badge unanswered";
      badge.id = `badge-${q.id}`;
      
      const text = document.createElement("span");
      text.textContent = `Question ${idx + 1} (${q.points} Pts)`;
      
      btn.appendChild(badge);
      btn.appendChild(text);
      btn.addEventListener("click", () => showQuestion(idx));
      questionTabs.appendChild(btn);
    });
    updateTabBadges();
  }

  function updateTabBadges() {
    appState.questions.forEach(q => {
      const badge = document.getElementById(`badge-${q.id}`);
      if (!badge) return;
      
      const score = appState.studentScores[q.id] || 0;
      const answer = appState.studentAnswers[q.id] || "";
      
      badge.className = "q-badge";
      if (score === q.points) {
        badge.classList.add("success");
      } else if (score > 0) {
        // Partial scores or errors
        badge.classList.add("fail");
      } else if (answer.trim() !== q.starterCode.trim()) {
        badge.classList.add("fail"); // edited but failed/not tested yet
      } else {
        badge.classList.add("unanswered");
      }
    });
  }

  // Load question and set IDE contents
  function showQuestion(idx) {
    // Save current active question code
    if (appState.questions.length > 0) {
      const oldQ = appState.questions[appState.currentQuestionIdx];
      appState.studentAnswers[oldQ.id] = editor.getValue();
    }

    appState.currentQuestionIdx = idx;
    
    // Highlight active tab
    const tabs = questionTabs.querySelectorAll(".q-tab-btn");
    tabs.forEach((tab, tIdx) => {
      tab.classList.remove("active");
      if (tIdx === idx) tab.classList.add("active");
    });

    const question = appState.questions[idx];
    
    // Render description markdown
    questionDescription.innerHTML = formatMarkdown(question.description);
    
    // Set Editor Value
    editor.setValue(appState.studentAnswers[question.id]);
    
    // Load existing scores and logs for this question
    currentScoreText.textContent = appState.studentScores[question.id].toFixed(1);
    totalScoreText.textContent = question.points.toFixed(1);
    
    renderLogs(question.id);
    
    setTimeout(() => {
      editor.refresh();
    }, 50);
  }

  // Custom regex markdown formatter
  function formatMarkdown(md) {
    if (!md) return "";
    let html = md.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    
    // Bold
    html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    
    // Code blocks
    html = html.replace(/```([a-z]*)\n([\s\S]*?)\n```/g, '<pre><code class="font-fira">$2</code></pre>');
    
    // Inline code
    html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
    
    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    
    // Lists
    html = html.replace(/^\s*-\s+(.*$)/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/gim, '<ul>$1<\/ul>');
    // Clean nested lists
    html = html.replace(/<\/ul>\s*<ul>/g, '');
    
    return html;
  }

  function renderLogs(questionId) {
    // Render Unit test logs
    testResultsList.innerHTML = "";
    const testLogs = appState.studentTestLogs[questionId] || [];
    
    if (testLogs.length === 0) {
      const li = document.createElement("li");
      li.className = "status-neutral";
      li.textContent = "No test logs available yet.";
      testResultsList.appendChild(li);
    } else {
      testLogs.forEach(log => {
        const li = document.createElement("li");
        if (log.startsWith("PASS")) {
          li.className = "status-pass";
          li.innerHTML = `<span>✓</span> <span>${log}</span>`;
        } else if (log.startsWith("FAIL") || log.startsWith("EXCEPTION") || log.startsWith("Compilation Error")) {
          li.className = "status-fail";
          li.innerHTML = `<span>✗</span> <span>${log}</span>`;
        } else {
          li.className = "status-neutral";
          li.textContent = log;
        }
        testResultsList.appendChild(li);
      });
    }

    // Render console logs stdout
    const consoleLogs = appState.studentConsoleLogs[questionId] || [];
    consoleOutputText.textContent = consoleLogs.length > 0 ? consoleLogs.join("\n") : "Terminal empty.";
  }

  // --- Run Code Handler ---
  btnRunTest.addEventListener("click", () => {
    const activeQ = appState.questions[appState.currentQuestionIdx];
    const code = editor.getValue();
    
    // Set run visual state
    btnRunTest.disabled = true;
    btnRunTest.querySelector("span").textContent = "Running Tests...";
    
    setTimeout(() => {
      try {
        const testResult = window.JavaRunner.runJavaTests(code, activeQ.testRunner);
        
        // Save test results back to state
        appState.studentScores[activeQ.id] = testResult.score;
        appState.studentTestLogs[activeQ.id] = testResult.testLogs;
        appState.studentConsoleLogs[activeQ.id] = testResult.consoleLogs;
        
        // Update display
        currentScoreText.textContent = testResult.score.toFixed(1);
        renderLogs(activeQ.id);
        updateTabBadges();
      } catch (err) {
        console.error(err);
        appState.studentScores[activeQ.id] = 0;
        appState.studentTestLogs[activeQ.id] = ["EXCEPTION: " + err.message];
        appState.studentConsoleLogs[activeQ.id] = [err.stack];
        
        currentScoreText.textContent = "0.0";
        renderLogs(activeQ.id);
        updateTabBadges();
      } finally {
        btnRunTest.disabled = false;
        btnRunTest.querySelector("span").textContent = "Run Tests (Test Code)";
      }
    }, 200);
  });

  // --- Reset Code Handler ---
  btnResetCode.addEventListener("click", () => {
    const activeQ = appState.questions[appState.currentQuestionIdx];
    if (confirm("Are you sure you want to reset the code for this question back to the starter template?")) {
      editor.setValue(activeQ.starterCode);
    }
  });

  // --- Console Drawer Tabs Control ---
  tabTestCases.addEventListener("click", () => {
    tabTestCases.classList.add("active");
    tabConsole.classList.remove("active");
    testCasesPanel.classList.add("active");
    consolePanel.classList.remove("active");
  });

  tabConsole.addEventListener("click", () => {
    tabConsole.classList.add("active");
    tabTestCases.classList.remove("active");
    consolePanel.classList.add("active");
    testCasesPanel.classList.remove("active");
  });

  // --- Submit Exam Action ---
  btnSubmitExam.addEventListener("click", () => {
    if (confirm("Are you sure you want to submit all your answers? The simulated exam will end.")) {
      submitExam();
    }
  });

  function submitExam() {
    // Tally up last modifications from editor
    if (appState.questions.length > 0) {
      const activeQ = appState.questions[appState.currentQuestionIdx];
      appState.studentAnswers[activeQ.id] = editor.getValue();
    }
    
    clearInterval(appState.timerInterval);
    showResults();
  }

  // --- Display Results ---
  function showResults() {
    let earnedTotal = 0;
    let maxTotal = 0;
    
    resultsTableBody.innerHTML = "";
    
    appState.questions.forEach((q, idx) => {
      const score = appState.studentScores[q.id] || 0;
      earnedTotal += score;
      maxTotal += q.points;
      
      const tr = document.createElement("tr");
      
      const noTd = document.createElement("td");
      noTd.textContent = idx + 1;
      tr.appendChild(noTd);
      
      const titleTd = document.createElement("td");
      titleTd.textContent = q.title.replace(` (Packet ${appState.selectedPacket})`, '');
      tr.appendChild(titleTd);

      const typeTd = document.createElement("td");
      typeTd.textContent = q.type.toUpperCase();
      tr.appendChild(typeTd);
      
      const maxTd = document.createElement("td");
      maxTd.textContent = q.points;
      tr.appendChild(maxTd);
      
      const earnedTd = document.createElement("td");
      earnedTd.textContent = score.toFixed(1);
      tr.appendChild(earnedTd);
      
      const statusTd = document.createElement("td");
      const statusSpan = document.createElement("span");
      if (score === q.points) {
        statusSpan.className = "text-emerald";
        statusSpan.textContent = "Correct (Full)";
      } else if (score > 0) {
        statusSpan.className = "text-purple";
        statusSpan.textContent = "Partially Correct";
      } else {
        statusSpan.className = "text-rose";
        statusSpan.textContent = "Incorrect/Error";
      }
      statusTd.appendChild(statusSpan);
      tr.appendChild(statusTd);
      
      const actionTd = document.createElement("td");
      const btnView = document.createElement("button");
      btnView.className = "btn-view-code font-outfit";
      btnView.textContent = "View Answer";
      btnView.addEventListener("click", () => openCodeReview(q, score));
      actionTd.appendChild(btnView);
      tr.appendChild(actionTd);
      
      resultsTableBody.appendChild(tr);
    });

    finalScoreValue.textContent = earnedTotal.toFixed(1);
    finalMaxScore.textContent = maxTotal.toFixed(1);

    // Score analysis comments
    const pct = (earnedTotal / maxTotal) * 100;
    if (pct >= 90) {
      gradeComment.className = "font-inter text-emerald";
      gradeComment.textContent = "Outstanding! Your OOP understanding is flawless. Your score is well above average.";
    } else if (pct >= 60) {
      gradeComment.className = "font-inter text-purple";
      gradeComment.textContent = "Good job! You passed the exam, but consider taking some time to review any incomplete parts.";
    } else {
      gradeComment.className = "font-inter text-rose";
      gradeComment.textContent = "You did not reach the passing threshold. Re-study OOP concepts like downcasting, singleton pattern, or custom annotations.";
    }

    showView("results");
  }

  // --- Modal Code Review Controller ---
  function openCodeReview(question, score) {
    modalQTitle.textContent = `Review Answer - ${question.title}`;
    modalQScore.textContent = `${score.toFixed(1)} / ${question.points.toFixed(1)}`;
    modalQCode.textContent = appState.studentAnswers[question.id] || "// No answer was submitted.";
    codeReviewModal.classList.add("active");
  }

  btnCloseModal.addEventListener("click", () => {
    codeReviewModal.classList.remove("active");
  });

  // Close modal when clicking on overlay background
  codeReviewModal.addEventListener("click", (e) => {
    if (e.target === codeReviewModal) {
      codeReviewModal.classList.remove("active");
    }
  });

  // --- Home Navigation Button ---
  btnBackHome.addEventListener("click", () => {
    if (confirm("Do you want to return to the main menu? Your progress on the current exam session will be lost.")) {
      showView("welcome");
    }
  });

  // --- Welcome Screen Start Bindings ---
  btnStartLastYear.addEventListener("click", () => startExam("last_year"));
  btnStartBecir.addEventListener("click", () => startExam("becir"));

});
