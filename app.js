// Main Game Controller for Graph Mastery Arena
// Manages player profile, campaign mode, mock exam simulator, cheat sheets, and interactive lab

const TITLES = [
  { level: 1, name: "Novice Traverser (ผู้เริ่มสำรวจกราฟ)" },
  { level: 2, name: "Queue Walker (นักก้าวเดินคิว BFS)" },
  { level: 3, name: "Recursion Diver (นักดำดิ่ง DFS)" },
  { level: 4, name: "Matrix Strategist (จอมยุทธ์เมทริกซ์)" },
  { level: 5, name: "Tree Architect (สถาปนิก MST)" },
  { level: 6, name: "Heap Pioneer (ผู้บุกเบิก Priority Queue)" },
  { level: 7, name: "Dijkstra Disciple (ศิษย์เอก Dijkstra)" },
  { level: 8, name: "Graph Grandmaster (ปรมาจารย์กราฟอัลกอริทึม)" }
];

class GameManager {
  constructor() {
    this.player = this.loadPlayerData();
    this.currentMode = 'campaign'; // 'campaign' | 'exam' | 'lab' | 'cheatsheet'
    
    // Campaign state
    this.currentStage = 1;
    this.stageQuestions = [];
    this.stageCurrentIndex = 0;
    this.stageScore = 0;
    this.stageHearts = 3;
    this.selectedAnswer = null;
    this.isAnswered = false;

    // Exam state
    this.examQuestions = [];
    this.examAnswers = {}; // { qIdx: selectedOption }
    this.examFlagged = new Set();
    this.examCurrentIndex = 0;
    this.examTimeLeft = 10 * 60; // 10 minutes in seconds
    this.examTimer = null;
    this.examTotalTime = 10 * 60;

    // Lab state
    this.activeLabAlgo = 'bfs';
  }

  loadPlayerData() {
    const defaultData = {
      xp: 0,
      level: 1,
      streak: 0,
      maxStreak: 0,
      clearedStages: [],
      examHistory: []
    };
    try {
      const saved = localStorage.getItem('graph_quest_player');
      return saved ? { ...defaultData, ...JSON.parse(saved) } : defaultData;
    } catch (e) {
      return defaultData;
    }
  }

  savePlayerData() {
    try {
      localStorage.setItem('graph_quest_player', JSON.stringify(this.player));
    } catch (e) {
      console.warn("Storage quota exceeded or disabled", e);
    }
    this.updateHUD();
  }

  addXP(amount) {
    this.player.xp += amount;
    const prevLevel = this.player.level;
    this.player.level = Math.floor(this.player.xp / 100) + 1;
    if (this.player.level > prevLevel) {
      sfx.playLevelUp();
      this.showToast(`🎉 เลเวลอัป! คุณขึ้นสู่เลเวล ${this.player.level}: ${this.getPlayerTitle()}`);
    }
    this.savePlayerData();
  }

  getPlayerTitle() {
    const cur = TITLES.slice().reverse().find(t => this.player.level >= t.level);
    return cur ? cur.name : TITLES[0].name;
  }

  updateHUD() {
    const levelEl = document.getElementById('hud-level');
    const xpEl = document.getElementById('hud-xp');
    const xpProgressEl = document.getElementById('hud-xp-progress');
    const titleEl = document.getElementById('hud-title');
    const streakEl = document.getElementById('hud-streak');

    if (levelEl) levelEl.textContent = this.player.level;
    if (titleEl) titleEl.textContent = this.getPlayerTitle();
    if (streakEl) streakEl.textContent = this.player.streak;
    
    const xpInLevel = this.player.xp % 100;
    if (xpEl) xpEl.textContent = `${xpInLevel} / 100 XP`;
    if (xpProgressEl) xpProgressEl.style.width = `${xpInLevel}%`;
  }

  showToast(msg) {
    let toast = document.getElementById('game-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'game-toast';
      toast.className = 'game-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3200);
  }

  switchMode(mode) {
    sfx.playClick();
    this.currentMode = mode;

    document.querySelectorAll('.nav-tab').forEach(t => {
      t.classList.toggle('active', t.dataset.mode === mode);
    });

    const mainContainer = document.getElementById('main-game-area');
    if (!mainContainer) return;

    if (mode === 'campaign') {
      this.renderCampaignMenu();
    } else if (mode === 'exam') {
      this.renderExamSetup();
    } else if (mode === 'lab') {
      this.renderLab();
    } else if (mode === 'cheatsheet') {
      this.renderCheatSheet();
    }
  }

  // ==========================================
  // CAMPAIGN MODE (DUNGEON & STAGES)
  // ==========================================
  renderCampaignMenu() {
    const stages = [
      { id: 1, title: "บทที่ 1: พื้นฐานและประเภทของกราฟ", desc: "V & E, Directed vs Undirected, Weighted, Cyclic vs DAG", icon: "🌐", qCount: 5 },
      { id: 2, title: "บทที่ 2: การแทนกราฟ Matrix vs List", desc: "Dense vs Sparse, Adjacency Matrix O(1) vs Adjacency List O(V+E)", icon: "📊", qCount: 5 },
      { id: 3, title: "บทที่ 3: การท่องกราฟ BFS vs DFS", desc: "Queue FIFO vs Stack LIFO, Level Order, Backtracking, O(V+E)", icon: "🧭", qCount: 8 },
      { id: 4, title: "บทที่ 4: ต้นไม้แผ่ทั่วน้อยสุด (MST)", desc: "V-1 เส้นเชื่อม, Prim's vs Kruskal's Algorithm, Union-Find", icon: "🌲", qCount: 6 },
      { id: 5, title: "บทที่ 5: เส้นทางสั้นที่สุด Dijkstra", desc: "Single-Source Shortest Path, Relaxation, Non-negative trap", icon: "⚡", qCount: 5 },
      { id: 6, title: "บทที่ 6: Grand Boss Exam Arena", desc: "ด่านบอสรวมมิตร ท้าทายความรู้ทุกอัลกอริทึมจากสไลด์ 27 สไลด์!", icon: "👑", qCount: 10 }
    ];

    let html = `
      <div class="section-container">
        <div class="section-header">
          <div>
            <h2 class="section-title">🏰 โหมดผจญภัยพิชิตข้อสอบ (Dungeon Stages)</h2>
            <p class="section-desc">ฝึกทำข้อสอบทีละบท พร้อมคำอธิบายเฉลยและอ้างอิงตรงจากสไลด์อาจารย์พิเศษพงศ์</p>
          </div>
          <div class="stat-badge">ผ่านแล้ว ${this.player.clearedStages.length} / ${stages.length} ด่าน</div>
        </div>

        <div class="stage-grid">
    `;

    stages.forEach(st => {
      const isCleared = this.player.clearedStages.includes(st.id);
      const isUnlocked = st.id === 1 || this.player.clearedStages.includes(st.id - 1);

      html += `
        <div class="stage-card ${isCleared ? 'cleared' : ''} ${!isUnlocked ? 'locked' : ''}">
          <div class="stage-icon-wrap">
            <span class="stage-icon">${st.icon}</span>
            ${isCleared ? '<span class="stage-badge-cleared">✓ ผ่านแล้ว</span>' : ''}
            ${!isUnlocked ? '<span class="stage-badge-locked">🔒 ล็อค</span>' : ''}
          </div>
          <h3 class="stage-name">${st.title}</h3>
          <p class="stage-detail">${st.desc}</p>
          <div class="stage-footer">
            <span class="text-dim text-small">จำนวน ${st.qCount} ข้อ</span>
            <button class="btn ${isCleared ? 'btn-outline' : 'btn-primary'}" 
              onclick="game.startStage(${st.id})" ${!isUnlocked ? 'disabled' : ''}>
              ${isCleared ? 'เล่นซ้ำ ↺' : 'เริ่มลุย ⚔️'}
            </button>
          </div>
        </div>
      `;
    });

    html += `
        </div>
      </div>
    `;

    document.getElementById('main-game-area').innerHTML = html;
  }

  startStage(stageId) {
    sfx.playClick();
    this.currentStage = stageId;
    this.stageHearts = 3;
    this.stageScore = 0;
    this.stageCurrentIndex = 0;
    this.isAnswered = false;
    this.selectedAnswer = null;

    if (stageId === 6) {
      // Boss stage: sample 10 questions across all topics
      this.stageQuestions = this.shuffleArray([...QUESTION_BANK]).slice(0, 10);
    } else {
      this.stageQuestions = QUESTION_BANK.filter(q => q.chapter === stageId);
      if (this.stageQuestions.length === 0) {
        this.stageQuestions = QUESTION_BANK.slice(0, 5);
      }
    }

    this.renderStageQuestion();
  }

  renderStageQuestion() {
    const q = this.stageQuestions[this.stageCurrentIndex];
    const totalQ = this.stageQuestions.length;

    let heartsHtml = '';
    for (let i = 0; i < 3; i++) {
      heartsHtml += `<span class="heart-icon ${i < this.stageHearts ? 'heart-full' : 'heart-empty'}">❤️</span>`;
    }

    let optionsHtml = q.options.map((opt, idx) => {
      let optClass = "quiz-option";
      if (this.isAnswered) {
        if (idx === q.answer) optClass += " correct";
        else if (idx === this.selectedAnswer) optClass += " wrong";
      }

      return `
        <div class="${optClass}" onclick="game.handleOptionSelect(${idx})">
          <div class="option-prefix">${String.fromCharCode(65 + idx)}</div>
          <div class="option-text">${opt}</div>
        </div>
      `;
    }).join('');

    let explanationHtml = '';
    if (this.isAnswered) {
      const isCorrect = this.selectedAnswer === q.answer;
      explanationHtml = `
        <div class="explanation-box ${isCorrect ? 'box-correct' : 'box-wrong'} animate-fade-in">
          <div class="exp-header">
            <span>${isCorrect ? '✅ ถูกต้องยอดเยี่ยม!' : '❌ ยังไม่ถูกต้องนะ!'}</span>
            <span class="badge badge-accent">${q.slideRef || 'สไลด์บทเรียน'}</span>
          </div>
          <p class="exp-body">${q.explanation}</p>
        </div>
      `;
    }

    let html = `
      <div class="quiz-container animate-fade-in">
        <div class="quiz-topbar">
          <button class="btn btn-outline btn-sm" onclick="game.renderCampaignMenu()">◀ กลับเลือกด่าน</button>
          <div class="quiz-progress-text">ข้อที่ ${this.stageCurrentIndex + 1} จาก ${totalQ}</div>
          <div class="quiz-hearts">${heartsHtml}</div>
        </div>

        <div class="quiz-progress-bar-wrap">
          <div class="quiz-progress-bar" style="width: ${((this.stageCurrentIndex + 1) / totalQ) * 100}%"></div>
        </div>

        <div class="quiz-card">
          <div class="quiz-topic-tag">${q.chapterTitle || 'โจทย์ข้อสอบ'}</div>
          <h3 class="quiz-question">${q.question}</h3>
          
          <div class="quiz-options-list">
            ${optionsHtml}
          </div>

          ${explanationHtml}

          <div class="quiz-actions">
            ${this.isAnswered ? `
              <button class="btn btn-primary btn-lg" onclick="game.nextStageQuestion()">
                ${this.stageCurrentIndex + 1 >= totalQ ? 'ดูสรุปผลด่าน 🏆' : 'ข้อถัดไป ➔'}
              </button>
            ` : `
              <div class="text-dim text-small">เลือกคำตอบที่ถูกต้องที่สุด 1 ข้อ</div>
            `}
          </div>
        </div>
      </div>
    `;

    document.getElementById('main-game-area').innerHTML = html;
  }

  handleOptionSelect(idx) {
    if (this.isAnswered) return;
    this.selectedAnswer = idx;
    this.isAnswered = true;

    const q = this.stageQuestions[this.stageCurrentIndex];
    if (idx === q.answer) {
      sfx.playCorrect();
      this.stageScore++;
      this.player.streak++;
      if (this.player.streak > this.player.maxStreak) this.player.maxStreak = this.player.streak;
      if (this.player.streak % 3 === 0) sfx.playCombo();
      this.addXP(20);
      this.showToast(`+20 XP | ต่อเนื่อง ${this.player.streak} ข้อ 🔥`);
    } else {
      sfx.playWrong();
      this.player.streak = 0;
      this.stageHearts--;
      this.savePlayerData();
      if (this.stageHearts <= 0) {
        setTimeout(() => this.showGameOver(), 1000);
        return;
      }
    }

    this.renderStageQuestion();
  }

  nextStageQuestion() {
    sfx.playClick();
    if (this.stageCurrentIndex + 1 >= this.stageQuestions.length) {
      this.showStageClear();
    } else {
      this.stageCurrentIndex++;
      this.isAnswered = false;
      this.selectedAnswer = null;
      this.renderStageQuestion();
    }
  }

  showStageClear() {
    sfx.playVictory();
    const passed = (this.stageScore / this.stageQuestions.length) >= 0.6;
    if (passed && !this.player.clearedStages.includes(this.currentStage)) {
      this.player.clearedStages.push(this.currentStage);
      this.addXP(100);
    }
    this.savePlayerData();

    const percent = Math.round((this.stageScore / this.stageQuestions.length) * 100);

    let html = `
      <div class="result-modal-container animate-fade-in">
        <div class="result-card">
          <div class="result-icon">${passed ? '🏆' : '💀'}</div>
          <h2 class="result-title">${passed ? 'ผ่านด่านสำเร็จ (Stage Clear!)' : 'ยังไม่ผ่านเกณฑ์ พยายามใหม่อีกนิด!'}</h2>
          <p class="result-desc">คุณทำคะแนนได้ ${this.stageScore} จาก ${this.stageQuestions.length} ข้อ (${percent}%)</p>

          <div class="result-stats-row">
            <div class="stat-pill">
              <span class="label">คะแนน</span>
              <span class="val">${this.stageScore}/${this.stageQuestions.length}</span>
            </div>
            <div class="stat-pill">
              <span class="label">โบนัส XP</span>
              <span class="val text-amber">+${passed ? '100' : '20'} XP</span>
            </div>
            <div class="stat-pill">
              <span class="label">หัวใจที่เหลือ</span>
              <span class="val text-rose">${this.stageHearts} ❤️</span>
            </div>
          </div>

          <div class="result-actions">
            <button class="btn btn-outline" onclick="game.startStage(${this.currentStage})">ลองใหม่อีกครั้ง ↺</button>
            <button class="btn btn-primary" onclick="game.renderCampaignMenu()">กลับสู่แผนที่ด่าน 🗺️</button>
          </div>
        </div>
      </div>
    `;

    document.getElementById('main-game-area').innerHTML = html;
  }

  showGameOver() {
    let html = `
      <div class="result-modal-container animate-fade-in">
        <div class="result-card">
          <div class="result-icon">💔</div>
          <h2 class="result-title text-rose">หัวใจหมดแล้ว (Out of Hearts!)</h2>
          <p class="result-desc">ไม่ต้องกังวล! การฝึกทำข้อสอบคือการเรียนรู้จากข้อผิดพลาด ลองใหม่อีกครั้งเพื่อความแม่นยำ</p>
          <div class="result-actions">
            <button class="btn btn-primary btn-lg" onclick="game.startStage(${this.currentStage})">เกิดใหม่ & เริ่มต้นด่านนี้ใหม่ ⚔️</button>
            <button class="btn btn-outline" onclick="game.renderCampaignMenu()">กลับสู่หน้าเลือกด่าน</button>
          </div>
        </div>
      </div>
    `;
    document.getElementById('main-game-area').innerHTML = html;
  }

  // ==========================================
  // EXAM SIMULATOR (TIMED MOCK EXAM)
  // ==========================================
  renderExamSetup() {
    let html = `
      <div class="section-container animate-fade-in">
        <div class="section-header">
          <div>
            <h2 class="section-title">⏱️ จำลองห้องสอบเสมือนจริง (Mock Exam Simulator)</h2>
            <p class="section-desc">จับเวลาเสมือนจริงในห้องสอบมิดเทอม/ไฟนอล สุ่มโจทย์คละบท ตัดเกรด A - F ทันทีหลังสอบเสร็จ</p>
          </div>
        </div>

        <div class="exam-setup-card">
          <div class="exam-setup-illustration">📝</div>
          <h3>ตั้งค่าห้องสอบ</h3>
          <p class="text-dim">ข้อสอบครอบคลุมเนื้อหา: กราฟเบื้องต้น, Adjacency Matrix/List, BFS, DFS, MST (Prim/Kruskal), Dijkstra</p>

          <div class="setup-controls">
            <div class="control-group">
              <label>จำนวนข้อสอบ:</label>
              <select id="exam-q-count" class="form-select">
                <option value="10">10 ข้อ (ฉบับกระชับ - 8 นาที)</option>
                <option value="15" selected>15 ข้อ (มาตรฐานมิดเทอม - 12 นาที)</option>
                <option value="20">20 ข้อ (ฉบับเต็มไฟนอล - 18 นาที)</option>
              </select>
            </div>
          </div>

          <div class="setup-rules-box">
            <h4>📋 กติกาห้องสอบ:</h4>
            <ul>
              <li>ระบบจะจับเวลานับถอยหลังอัตโนมัติ</li>
              <li>สามารถปักหมุดข้อที่ลังเล (Flag) และคลิกข้ามไปทำข้ออื่นก่อนได้</li>
              <li>ส่งข้อสอบได้ทันทีที่พร้อม หรือระบบจะส่งอัตโนมัติเมื่อเวลาหมด</li>
              <li>เมื่อสอบเสร็จจะได้รับ Report วิเคราะห์จุดแข็ง-จุดอ่อนรายหัวข้อ พร้อมเฉลยละเอียด</li>
            </ul>
          </div>

          <button class="btn btn-primary btn-lg btn-glow" onclick="game.startExam()">
            🚀 เริ่มทำข้อสอบจับเวลา
          </button>
        </div>
      </div>
    `;

    document.getElementById('main-game-area').innerHTML = html;
  }

  startExam() {
    sfx.playClick();
    const countSelect = document.getElementById('exam-q-count');
    const count = countSelect ? parseInt(countSelect.value, 10) : 15;

    this.examQuestions = this.shuffleArray([...QUESTION_BANK]).slice(0, count);
    this.examAnswers = {};
    this.examFlagged = new Set();
    this.examCurrentIndex = 0;
    this.examTotalTime = count * 50; // ~50s per question
    this.examTimeLeft = this.examTotalTime;

    if (this.examTimer) clearInterval(this.examTimer);
    this.examTimer = setInterval(() => {
      this.examTimeLeft--;
      this.updateExamTimerDisplay();
      if (this.examTimeLeft <= 0) {
        clearInterval(this.examTimer);
        this.submitExam(true);
      }
    }, 1000);

    this.renderExamInterface();
  }

  updateExamTimerDisplay() {
    const timerEl = document.getElementById('exam-timer');
    if (!timerEl) return;
    const mins = Math.floor(this.examTimeLeft / 60);
    const secs = this.examTimeLeft % 60;
    timerEl.textContent = `⏳ ${mins}:${secs < 10 ? '0' : ''}${secs}`;
    if (this.examTimeLeft <= 60) {
      timerEl.classList.add('timer-warning');
    }
  }

  renderExamInterface() {
    const q = this.examQuestions[this.examCurrentIndex];
    const totalQ = this.examQuestions.length;
    const isFlagged = this.examFlagged.has(this.examCurrentIndex);
    const selectedOpt = this.examAnswers[this.examCurrentIndex];

    // Palette of questions
    let paletteHtml = this.examQuestions.map((_, idx) => {
      let pClass = "palette-btn";
      if (idx === this.examCurrentIndex) pClass += " active";
      if (this.examAnswers[idx] !== undefined) pClass += " answered";
      if (this.examFlagged.has(idx)) pClass += " flagged";

      return `<button class="${pClass}" onclick="game.jumpExamQuestion(${idx})">${idx + 1}</button>`;
    }).join('');

    let optionsHtml = q.options.map((opt, idx) => {
      const isSelected = selectedOpt === idx;
      return `
        <div class="quiz-option ${isSelected ? 'selected' : ''}" onclick="game.selectExamOption(${idx})">
          <div class="option-prefix">${String.fromCharCode(65 + idx)}</div>
          <div class="option-text">${opt}</div>
        </div>
      `;
    }).join('');

    const mins = Math.floor(this.examTimeLeft / 60);
    const secs = this.examTimeLeft % 60;

    let html = `
      <div class="exam-workspace animate-fade-in">
        <div class="exam-left-pane">
          <div class="exam-topbar">
            <span class="exam-badge-tag">${q.chapterTitle}</span>
            <div id="exam-timer" class="exam-timer-badge">⏳ ${mins}:${secs < 10 ? '0' : ''}${secs}</div>
            <button class="btn btn-sm ${isFlagged ? 'btn-warning' : 'btn-outline'}" onclick="game.toggleExamFlag()">
              ${isFlagged ? '🚩 ปักหมุดแล้ว' : '🏳️ ปักหมุดทบทวน'}
            </button>
          </div>

          <div class="quiz-card" style="margin-top: 15px;">
            <div class="text-dim text-small" style="margin-bottom: 8px;">ข้อที่ ${this.examCurrentIndex + 1} จาก ${totalQ}</div>
            <h3 class="quiz-question">${q.question}</h3>
            
            <div class="quiz-options-list">
              ${optionsHtml}
            </div>

            <div class="exam-nav-bar">
              <button class="btn btn-secondary" onclick="game.prevExamQuestion()" ${this.examCurrentIndex === 0 ? 'disabled' : ''}>◀ ข้อก่อนหน้า</button>
              <button class="btn btn-primary" onclick="game.nextExamQuestion()">
                ${this.examCurrentIndex + 1 >= totalQ ? 'ตรวจทานข้อสอบ ➔' : 'ข้อถัดไป ▶'}
              </button>
            </div>
          </div>
        </div>

        <div class="exam-sidebar">
          <h4 class="sidebar-title">ตารางสถานะข้อสอบ</h4>
          <div class="palette-grid">
            ${paletteHtml}
          </div>

          <div class="palette-legend">
            <div><span class="legend-dot dot-answered"></span> ตอบแล้ว (${Object.keys(this.examAnswers).length})</div>
            <div><span class="legend-dot dot-flagged"></span> ปักหมุด (${this.examFlagged.size})</div>
            <div><span class="legend-dot dot-unanswered"></span> ยังไม่ตอบ (${totalQ - Object.keys(this.examAnswers).length})</div>
          </div>

          <button class="btn btn-danger btn-block" style="margin-top: 20px;" onclick="game.confirmSubmitExam()">
            📥 ส่งข้อสอบสิ้นสุดการสอบ
          </button>
        </div>
      </div>
    `;

    document.getElementById('main-game-area').innerHTML = html;
  }

  selectExamOption(idx) {
    sfx.playClick();
    this.examAnswers[this.examCurrentIndex] = idx;
    this.renderExamInterface();
  }

  toggleExamFlag() {
    sfx.playClick();
    if (this.examFlagged.has(this.examCurrentIndex)) {
      this.examFlagged.delete(this.examCurrentIndex);
    } else {
      this.examFlagged.add(this.examCurrentIndex);
    }
    this.renderExamInterface();
  }

  jumpExamQuestion(idx) {
    sfx.playClick();
    this.examCurrentIndex = idx;
    this.renderExamInterface();
  }

  prevExamQuestion() {
    if (this.examCurrentIndex > 0) {
      this.jumpExamQuestion(this.examCurrentIndex - 1);
    }
  }

  nextExamQuestion() {
    if (this.examCurrentIndex + 1 < this.examQuestions.length) {
      this.jumpExamQuestion(this.examCurrentIndex + 1);
    }
  }

  confirmSubmitExam() {
    const answeredCount = Object.keys(this.examAnswers).length;
    const totalQ = this.examQuestions.length;
    const unans = totalQ - answeredCount;

    if (unans > 0) {
      if (!confirm(`คุณยังเหลือข้อที่ไม่ได้ตอบอีก ${unans} ข้อ ต้องการส่งข้อสอบเลยหรือไม่?`)) {
        return;
      }
    }
    this.submitExam(false);
  }

  submitExam(timedOut) {
    if (this.examTimer) clearInterval(this.examTimer);
    sfx.playVictory();

    let score = 0;
    const categoryStats = {
      concept: { total: 0, correct: 0, title: "พื้นฐานและประเภทของกราฟ" },
      representation: { total: 0, correct: 0, title: "การแทนกราฟ Matrix vs List" },
      traversal: { total: 0, correct: 0, title: "การท่องกราฟ BFS vs DFS" },
      mst: { total: 0, correct: 0, title: "Minimum Spanning Tree (MST)" },
      shortest_path: { total: 0, correct: 0, title: "Dijkstra เส้นทางสั้นสุด" },
      complexity: { total: 0, correct: 0, title: "ความซับซ้อนและการเปรียบเทียบ" }
    };

    this.examQuestions.forEach((q, idx) => {
      const top = q.topic || 'concept';
      if (!categoryStats[top]) categoryStats[top] = { total: 0, correct: 0, title: top };
      categoryStats[top].total++;

      if (this.examAnswers[idx] === q.answer) {
        score++;
        categoryStats[top].correct++;
      }
    });

    const percent = Math.round((score / this.examQuestions.length) * 100);
    let grade = 'F';
    let gradeColor = 'text-rose';
    if (percent >= 90) { grade = 'A+'; gradeColor = 'text-emerald'; }
    else if (percent >= 80) { grade = 'A'; gradeColor = 'text-emerald'; }
    else if (percent >= 75) { grade = 'B+'; gradeColor = 'text-cyan'; }
    else if (percent >= 70) { grade = 'B'; gradeColor = 'text-cyan'; }
    else if (percent >= 60) { grade = 'C'; gradeColor = 'text-amber'; }
    else if (percent >= 50) { grade = 'D'; gradeColor = 'text-amber'; }

    // Save to history
    this.player.examHistory.push({
      date: new Date().toLocaleDateString('th-TH'),
      score: score,
      total: this.examQuestions.length,
      grade: grade,
      percent: percent
    });
    this.addXP(score * 15);
    this.savePlayerData();

    // Render detailed report
    let catHtml = Object.keys(categoryStats).filter(k => categoryStats[k].total > 0).map(k => {
      const st = categoryStats[k];
      const p = Math.round((st.correct / st.total) * 100);
      return `
        <div class="cat-stat-row">
          <div class="cat-name">${st.title}</div>
          <div class="cat-bar-wrap">
            <div class="cat-bar" style="width: ${p}%"></div>
          </div>
          <div class="cat-score">${st.correct}/${st.total} (${p}%)</div>
        </div>
      `;
    }).join('');

    let reviewListHtml = this.examQuestions.map((q, idx) => {
      const userAns = this.examAnswers[idx];
      const isCorrect = userAns === q.answer;
      return `
        <div class="review-item ${isCorrect ? 'rev-correct' : 'rev-wrong'}">
          <div class="rev-header">
            <strong>ข้อที่ ${idx + 1}: ${isCorrect ? '✅ ถูกต้อง' : '❌ ตอบผิด'}</strong>
            <span class="badge badge-accent">${q.slideRef || 'สไลด์อ้างอิง'}</span>
          </div>
          <p class="rev-q">${q.question}</p>
          <div class="rev-ans-info">
            <div>คำตอบของคุณ: <span class="${isCorrect ? 'text-emerald' : 'text-rose'} font-bold">${userAns !== undefined ? q.options[userAns] : 'ไม่ได้ตอบ'}</span></div>
            ${!isCorrect ? `<div>คำตอบที่ถูก: <span class="text-emerald font-bold">${q.options[q.answer]}</span></div>` : ''}
          </div>
          <p class="rev-exp">${q.explanation}</p>
        </div>
      `;
    }).join('');

    let html = `
      <div class="section-container animate-fade-in">
        <div class="exam-result-banner">
          <div class="grade-circle ${gradeColor}">
            <div class="grade-letter">${grade}</div>
            <div class="grade-percent">${percent}%</div>
          </div>
          <div class="exam-result-info">
            <h2>ผลการสอบเสมือนจริง (Exam Scorecard)</h2>
            <p>${timedOut ? '⏱️ เวลาสอบหมดแล้ว!' : '🎉 ทำข้อสอบเสร็จสมบูรณ์'}</p>
            <div class="exam-score-nums">คะแนนดิบ: <strong>${score}</strong> จาก ${this.examQuestions.length} ข้อ | ได้รับ +${score * 15} XP</div>
          </div>
        </div>

        <div class="exam-breakdown-card">
          <h3>📊 การวิเคราะห์ผลสัมฤทธิ์รายหัวข้อ</h3>
          <div class="cat-stats-container">
            ${catHtml}
          </div>
        </div>

        <div class="review-section">
          <h3>📝 เฉลยละเอียดข้อสอบและจุดควรจำจากสไลด์</h3>
          ${reviewListHtml}
        </div>

        <div style="text-align: center; margin: 30px 0;">
          <button class="btn btn-primary btn-lg" onclick="game.renderExamSetup()">ทำข้อสอบชุดใหม่อีกครั้ง ↺</button>
        </div>
      </div>
    `;

    document.getElementById('main-game-area').innerHTML = html;
  }

  // ==========================================
  // INTERACTIVE ALGORITHM LAB
  // ==========================================
  renderLab() {
    let html = `
      <div class="section-container animate-fade-in">
        <div class="section-header">
          <div>
            <h2 class="section-title">🕹️ ห้องทดลองจำลองภาพ (Algorithm Sandbox & Tracer)</h2>
            <p class="section-desc">ดูภาพแอนิเมชันกราฟและ Trace การทำงานของอัลกอริทึมทีละขั้นตอนจากสไลด์จริง</p>
          </div>
        </div>

        <div class="lab-tabs">
          <button class="lab-tab ${this.activeLabAlgo === 'bfs' ? 'active' : ''}" onclick="game.switchLabAlgo('bfs')">🌐 BFS Level Tracer (หน้า 13)</button>
          <button class="lab-tab ${this.activeLabAlgo === 'dfs' ? 'active' : ''}" onclick="game.switchLabAlgo('dfs')">🌲 DFS Depth Tracer (หน้า 15)</button>
          <button class="lab-tab ${this.activeLabAlgo === 'dijkstra' ? 'active' : ''}" onclick="game.switchLabAlgo('dijkstra')">⚡ Dijkstra Shortest Path (หน้า 24)</button>
          <button class="lab-tab ${this.activeLabAlgo === 'prim' ? 'active' : ''}" onclick="game.switchLabAlgo('prim')">🌿 Prim's MST (หน้า 20)</button>
          <button class="lab-tab ${this.activeLabAlgo === 'kruskal' ? 'active' : ''}" onclick="game.switchLabAlgo('kruskal')">🔗 Kruskal's MST (หน้า 21)</button>
        </div>

        <div id="graph-sim-mount" class="graph-sim-mount"></div>
      </div>
    `;

    document.getElementById('main-game-area').innerHTML = html;
    window.graphSim = new GraphSimulator('graph-sim-mount');
    window.graphSim.setAlgorithm(this.activeLabAlgo);
  }

  switchLabAlgo(algoKey) {
    sfx.playClick();
    this.activeLabAlgo = algoKey;
    document.querySelectorAll('.lab-tab').forEach(b => {
      b.classList.toggle('active', b.getAttribute('onclick').includes(algoKey));
    });
    if (window.graphSim) {
      window.graphSim.setAlgorithm(algoKey);
    }
  }

  // ==========================================
  // CHEAT SHEET & SUMMARY
  // ==========================================
  renderCheatSheet() {
    let html = `
      <div class="section-container animate-fade-in">
        <div class="section-header">
          <div>
            <h2 class="section-title">📖 สรุปย่อหัวใจสำคัญก่อนสอบ (Exam Cheat Sheet)</h2>
            <p class="section-desc">รวบรวมตารางเปรียบเทียบ ความซับซ้อน และสูตรโกงข้อสอบจากสไลด์ทั้ง 27 หน้า</p>
          </div>
        </div>

        <div class="cheatsheet-grid">
          <!-- Card 1: Time Complexity Master Table -->
          <div class="cheat-card">
            <h3>⏱️ ตารางสรุป Time & Space Complexity (สไลด์หน้า 26)</h3>
            <table class="cheat-table">
              <thead>
                <tr>
                  <th>อัลกอริทึม</th>
                  <th>ประเภทงาน</th>
                  <th>โครงสร้างหลัก</th>
                  <th>Time Complexity</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>BFS</strong></td>
                  <td>ท่องแบบกว้าง / ทางสั้นสุด (Unweighted)</td>
                  <td>Queue (FIFO)</td>
                  <td><code class="text-cyan">O(V + E)</code></td>
                </tr>
                <tr>
                  <td><strong>DFS</strong></td>
                  <td>ท่องแบบลึก / Cycle / Topo Sort</td>
                  <td>Stack (LIFO) / Recursion</td>
                  <td><code class="text-cyan">O(V + E)</code></td>
                </tr>
                <tr>
                  <td><strong>Dijkstra</strong></td>
                  <td>ทางสั้นสุด (Non-negative)</td>
                  <td>Priority Queue (Min-Heap)</td>
                  <td><code class="text-amber">O((V + E) log V)</code></td>
                </tr>
                <tr>
                  <td><strong>Prim</strong></td>
                  <td>Minimum Spanning Tree (MST)</td>
                  <td>Priority Queue (Min-Heap)</td>
                  <td><code class="text-amber">O((V + E) log V)</code></td>
                </tr>
                <tr>
                  <td><strong>Kruskal</strong></td>
                  <td>Minimum Spanning Tree (MST)</td>
                  <td>Sort Edges + Union-Find</td>
                  <td><code class="text-rose">O(E log E)</code></td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Card 2: Matrix vs List -->
          <div class="cheat-card">
            <h3>📊 Adjacency Matrix vs Adjacency List (สไลด์หน้า 9-11)</h3>
            <table class="cheat-table">
              <thead>
                <tr>
                  <th>ประเด็นเปรียบเทียบ</th>
                  <th>Adjacency Matrix</th>
                  <th>Adjacency List</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>หน่วยความจำ (Space)</td>
                  <td><code>O(V²)</code></td>
                  <td><code class="text-emerald">O(V + E)</code></td>
                </tr>
                <tr>
                  <td>เช็คเส้นเชื่อม u-v</td>
                  <td><code class="text-emerald">O(1) เร็วมาก!</code></td>
                  <td><code>O(degree(u))</code></td>
                </tr>
                <tr>
                  <td>ท่องเพื่อนบ้านทั้งหมด</td>
                  <td><code>O(V)</code></td>
                  <td><code class="text-emerald">O(degree(u)) เร็ว!</code></td>
                </tr>
                <tr>
                  <td>เหมาะกับกราฟแบบใด</td>
                  <td><strong>Dense Graph</strong> (|E| ≈ |V|²)</td>
                  <td><strong>Sparse Graph</strong> (|E| << |V|²)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Card 3: BFS vs DFS -->
          <div class="cheat-card">
            <h3>🧭 เปรียบเทียบ BFS vs DFS (สไลด์หน้า 16)</h3>
            <table class="cheat-table">
              <thead>
                <tr>
                  <th>คุณสมบัติ</th>
                  <th>BFS (กว้าง)</th>
                  <th>DFS (ลึก)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>โครงสร้างข้อมูล</td>
                  <td><strong>Queue</strong> (FIFO)</td>
                  <td><strong>Stack / Call Stack</strong> (LIFO)</td>
                </tr>
                <tr>
                  <td>ลำดับการสำรวจ</td>
                  <td>ทีละระดับ (Level by Level)</td>
                  <td>ลึกสุดก่อน (Depth First)</td>
                </tr>
                <tr>
                  <td>หาทางสั้นสุด</td>
                  <td><span class="text-emerald">✅ ได้ (บน Unweighted)</span></td>
                  <td><span class="text-rose">❌ ไม่การันตี</span></td>
                </tr>
                <tr>
                  <td>หน่วยความจำ</td>
                  <td>มากกว่า (เก็บทั้งระดับ)</td>
                  <td>น้อยกว่า</td>
                </tr>
                <tr>
                  <td>ตรวจจับ Cycle</td>
                  <td>ทำได้</td>
                  <td><span class="text-emerald">✅ นิยมและเหมาะกว่ามาก</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Card 4: Dijkstra vs Prim -->
          <div class="cheat-card">
            <h3>⚡ เปรียบเทียบ Dijkstra vs Prim (สไลด์หน้า 25)</h3>
            <table class="cheat-table">
              <thead>
                <tr>
                  <th>คุณสมบัติ</th>
                  <th>Dijkstra</th>
                  <th>Prim</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>เป้าหมาย</td>
                  <td>Shortest Path จากจุดเดียว</td>
                  <td>Minimum Spanning Tree (MST)</td>
                </tr>
                <tr>
                  <td>ประเภทกราฟ</td>
                  <td>Directed และ Undirected</td>
                  <td><strong>Undirected เท่านั้น</strong></td>
                </tr>
                <tr>
                  <td>น้ำหนักติดลบ</td>
                  <td><strong class="text-rose">❌ ห้ามเด็ดขาด!</strong></td>
                  <td><strong class="text-emerald">✅ ใช้ได้</strong></td>
                </tr>
                <tr>
                  <td>หลักการ Greedy</td>
                  <td>เลือกจุดที่ <code>dist[u] + w</code> น้อยสุด</td>
                  <td>เลือกเส้นเชื่อม <code>w</code> น้อยสุดเข้า Tree</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Card 5: Core Traps -->
          <div class="cheat-card full-width">
            <h3>⚠️ 4 จุดกับดักที่ข้อสอบชอบหลอกมากที่สุด!</h3>
            <div class="traps-grid">
              <div class="trap-item">
                <div class="trap-num">1</div>
                <div>
                  <strong>Spanning Tree ต้องมี V - 1 เส้นเสมอ:</strong> ถ้ามี 5 จุดยอด จะมี 4 เส้นเชื่อมเป๊ะๆ ไม่มีวงจรและเชื่อมทั่วถึง
                </div>
              </div>
              <div class="trap-num-wrap trap-item">
                <div class="trap-num">2</div>
                <div>
                  <strong>Dijkstra ใช้กับน้ำหนักลบไม่ได้:</strong> เพราะ Greedy จะดึงจุดยอดออกแล้วคิดว่าสั้นสุดแล้ว แต่ถ้ามีลบมาทำให้ทางเก่าสั้นลงอีก จะคำนวณพลาด
                </div>
              </div>
              <div class="trap-num-wrap trap-item">
                <div class="trap-num">3</div>
                <div>
                  <strong>Kruskal ปฏิเสธเส้นเชื่อมเมื่อ find(u) == find(v):</strong> ถ้าสองจุดอยู่ในกลุ่มเดียวกันแล้ว การต่อเส้นเชื่อมจะทำให้เกิด Cycle ทันที
                </div>
              </div>
              <div class="trap-num-wrap trap-item">
                <div class="trap-num">4</div>
                <div>
                  <strong>BFS หาทางสั้นสุดได้เฉพาะกราฟไม่มีน้ำหนัก (Unweighted):</strong> หากกราฟมีน้ำหนัก ต้องใช้ Dijkstra เท่านั้น!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    document.getElementById('main-game-area').innerHTML = html;
  }

  shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
}

// Global game instance
window.game = new GameManager();

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.game.updateHUD();
  window.game.switchMode('campaign');

  // Audio toggle button
  const soundBtn = document.getElementById('sound-toggle-btn');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      const isEnabled = sfx.toggle();
      soundBtn.innerHTML = isEnabled ? '🔊 เสียงเปิด' : '🔇 ปิดเสียง';
      soundBtn.classList.toggle('btn-outline', isEnabled);
      soundBtn.classList.toggle('btn-secondary', !isEnabled);
      if (isEnabled) sfx.playClick();
    });
  }
});
