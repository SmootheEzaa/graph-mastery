// Interactive Graph Visualizer & Algorithm Step Simulator
// Supports BFS, DFS, Dijkstra, Prim, and Kruskal with live SVG rendering

class GraphSimulator {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.currentAlgo = 'bfs';
    this.currentStep = 0;
    this.isPlaying = false;
    this.playInterval = null;
    this.playSpeed = 1500; // ms
    this.data = TRACE_SCENARIOS.bfs;
  }

  setAlgorithm(algoKey) {
    if (this.isPlaying) this.stopAutoPlay();
    this.currentAlgo = algoKey;
    this.currentStep = 0;
    this.data = TRACE_SCENARIOS[algoKey];
    this.render();
  }

  nextStep() {
    if (!this.data) return;
    const maxSteps = (this.data.steps ? this.data.steps.length : this.data.sortedEdges.length) - 1;
    if (this.currentStep < maxSteps) {
      this.currentStep++;
      if (typeof sfx !== 'undefined') sfx.playClick();
      this.render();
    } else {
      this.stopAutoPlay();
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
      if (typeof sfx !== 'undefined') sfx.playClick();
      this.render();
    }
  }

  reset() {
    this.stopAutoPlay();
    this.currentStep = 0;
    if (typeof sfx !== 'undefined') sfx.playClick();
    this.render();
  }

  toggleAutoPlay() {
    if (this.isPlaying) {
      this.stopAutoPlay();
    } else {
      this.startAutoPlay();
    }
  }

  startAutoPlay() {
    this.isPlaying = true;
    const playBtn = document.getElementById('sim-play-btn');
    if (playBtn) playBtn.innerHTML = '⏸ หยุดชั่วคราว';
    this.playInterval = setInterval(() => {
      const maxSteps = (this.data.steps ? this.data.steps.length : this.data.sortedEdges.length) - 1;
      if (this.currentStep >= maxSteps) {
        this.stopAutoPlay();
      } else {
        this.nextStep();
      }
    }, this.playSpeed);
  }

  stopAutoPlay() {
    this.isPlaying = false;
    clearInterval(this.playInterval);
    const playBtn = document.getElementById('sim-play-btn');
    if (playBtn) playBtn.innerHTML = '▶ เล่นอัตโนมัติ';
  }

  render() {
    if (!this.container) return;

    if (this.currentAlgo === 'kruskal') {
      this.renderKruskalView();
      return;
    }

    const scenario = this.data;
    const step = scenario.steps[this.currentStep] || scenario.steps[0];
    const totalSteps = scenario.steps.length;

    // Determine visited/active nodes and edges
    const visitedSet = new Set(step.visited || []);
    const inQueueSet = new Set(step.queue || step.stack || []);
    const currentNode = step.current !== undefined ? step.current : (step.pick ? step.pick.charAt(0) : null);

    // Build SVG
    let svgHtml = `
      <svg class="graph-svg" viewBox="0 0 460 330" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
    `;

    // Render Edges
    scenario.edges.forEach(edge => {
      const uNode = scenario.nodes.find(n => n.id === edge.u);
      const vNode = scenario.nodes.find(n => n.id === edge.v);
      if (!uNode || !vNode) return;

      let edgeClass = "graph-edge";
      let isEdgeInMst = false;

      if (this.currentAlgo === 'prim' && step.mstEdges) {
        const edgeKey1 = `${edge.u}-${edge.v}`;
        const edgeKey2 = `${edge.v}-${edge.u}`;
        isEdgeInMst = step.mstEdges.includes(edgeKey1) || step.mstEdges.includes(edgeKey2);
      }

      if (isEdgeInMst) {
        edgeClass += " edge-mst";
      } else if (visitedSet.has(edge.u) && visitedSet.has(edge.v)) {
        edgeClass += " edge-visited";
      }

      const midX = (uNode.x + vNode.x) / 2;
      const midY = (uNode.y + vNode.y) / 2;

      svgHtml += `<line x1="${uNode.x}" y1="${uNode.y}" x2="${vNode.x}" y2="${vNode.y}" class="${edgeClass}" />`;

      if (edge.w !== undefined) {
        svgHtml += `
          <rect x="${midX - 14}" y="${midY - 12}" width="28" height="20" rx="4" class="edge-weight-bg" />
          <text x="${midX}" y="${midY + 2}" class="edge-weight-text">${edge.w}</text>
        `;
      }
    });

    // Render Nodes
    scenario.nodes.forEach(node => {
      let nodeClass = "graph-node";
      let statusBadge = "";

      if (node.id === currentNode) {
        nodeClass += " node-current";
        statusBadge = "⚡";
      } else if (visitedSet.has(node.id)) {
        nodeClass += " node-visited";
      } else if (inQueueSet.has(node.id)) {
        nodeClass += " node-queued";
      }

      let distText = "";
      if (this.currentAlgo === 'dijkstra' && step.dist) {
        distText = `<text x="${node.x}" y="${node.y + 36}" class="node-dist-label">dist: ${step.dist[node.id]}</text>`;
      }

      svgHtml += `
        <g class="${nodeClass}" data-node-id="${node.id}">
          <circle cx="${node.x}" cy="${node.y}" r="22" class="node-circle" />
          <text x="${node.x}" y="${node.y + 6}" class="node-label">${node.label}</text>
          ${distText}
        </g>
      `;
    });

    svgHtml += `</svg>`;

    // Step state inspection panel
    let statePanelHtml = "";
    if (this.currentAlgo === 'bfs') {
      const qList = step.queue.map(id => `<span class="data-pill pill-cyan">${id}</span>`).join(' ') || '<span class="text-dim">ว่าง</span>';
      const vList = step.visited.map(id => `<span class="data-pill pill-green">${id}</span>`).join(' ') || '<span class="text-dim">ว่าง</span>';
      statePanelHtml = `
        <div class="sim-state-grid">
          <div class="state-card">
            <div class="state-label">Queue (FIFO - คิวเข้าก่อนออกก่อน):</div>
            <div class="state-values">[ ${qList} ]</div>
          </div>
          <div class="state-card">
            <div class="state-label">Visited Set (เยี่ยมแล้ว):</div>
            <div class="state-values">{ ${vList} }</div>
          </div>
        </div>
      `;
    } else if (this.currentAlgo === 'dfs') {
      const sList = step.stack.map(id => `<span class="data-pill pill-purple">${id}</span>`).join(' ') || '<span class="text-dim">ว่าง</span>';
      const vList = step.visited.map(id => `<span class="data-pill pill-green">${id}</span>`).join(' ') || '<span class="text-dim">ว่าง</span>';
      statePanelHtml = `
        <div class="sim-state-grid">
          <div class="state-card">
            <div class="state-label">Call Stack / Stack (LIFO):</div>
            <div class="state-values">[ ${sList} ]</div>
          </div>
          <div class="state-card">
            <div class="state-label">Visited Set (เยี่ยมแล้ว):</div>
            <div class="state-values">{ ${vList} }</div>
          </div>
        </div>
      `;
    } else if (this.currentAlgo === 'dijkstra') {
      const distRow = Object.keys(step.dist).map(k => {
        const val = step.dist[k];
        const isMin = (k === currentNode);
        return `<div class="dist-cell ${isMin ? 'dist-current' : ''}">
          <span class="dist-key">${k}</span>
          <span class="dist-val">${val}</span>
        </div>`;
      }).join('');

      statePanelHtml = `
        <div class="state-card" style="margin-top: 10px;">
          <div class="state-label">ตารางระยะทางสั้นสุดปัจจุบัน (dist[] Table):</div>
          <div class="dist-table-row">${distRow}</div>
        </div>
      `;
    } else if (this.currentAlgo === 'prim') {
      statePanelHtml = `
        <div class="sim-state-grid">
          <div class="state-card">
            <div class="state-label">เส้นเชื่อมที่เลือกเข้า MST:</div>
            <div class="state-values">${(step.mstEdges || []).map(e => `<span class="data-pill pill-green">${e}</span>`).join(' ') || 'ยังไม่มี'}</div>
          </div>
          <div class="state-card">
            <div class="state-label">น้ำหนักรวมปัจจุบัน:</div>
            <div class="state-values"><strong class="text-amber">${step.weight}</strong> / 10</div>
          </div>
        </div>
      `;
    }

    // Assemble View
    this.container.innerHTML = `
      <div class="sim-view-wrapper">
        <div class="sim-header">
          <div>
            <h4 class="sim-title">${scenario.title}</h4>
            <p class="sim-subtitle">${scenario.description}</p>
          </div>
          <div class="sim-step-badge">ก้าวที่ ${this.currentStep + 1} / ${totalSteps}</div>
        </div>

        <div class="sim-body">
          <div class="svg-container">
            ${svgHtml}
          </div>
          <div class="sim-info-pane">
            <div class="sim-step-box">
              <div class="sim-step-action-tag">${step.action || step.pick || 'การดำเนินการ'}</div>
              <p class="sim-step-text">${step.text}</p>
            </div>
            ${statePanelHtml}
            ${scenario.expectedOrder ? `<div class="sim-order-banner">ลำดับผลลัพธ์: <strong>${scenario.expectedOrder}</strong></div>` : ''}
          </div>
        </div>

        <div class="sim-controls">
          <button class="btn btn-secondary" onclick="graphSim.prevStep()" ${this.currentStep === 0 ? 'disabled' : ''}>◀ ย้อนกลับ</button>
          <button class="btn btn-primary" id="sim-play-btn" onclick="graphSim.toggleAutoPlay()">${this.isPlaying ? '⏸ หยุดชั่วคราว' : '▶ เล่นอัตโนมัติ'}</button>
          <button class="btn btn-secondary" onclick="graphSim.nextStep()" ${this.currentStep >= totalSteps - 1 ? 'disabled' : ''}>ก้าวถัดไป ▶</button>
          <button class="btn btn-outline" onclick="graphSim.reset()">🔄 เริ่มต้นใหม่</button>
        </div>
      </div>
    `;
  }

  renderKruskalView() {
    const scenario = this.data;
    const items = scenario.sortedEdges;
    const currentIdx = this.currentStep;

    let rowsHtml = items.map((item, idx) => {
      let rowClass = "kruskal-row";
      let badgeClass = "badge-neutral";
      if (idx < currentIdx) {
        if (item.status.includes('เลือก')) {
          rowClass += " row-accepted";
          badgeClass = "badge-success";
        } else if (item.status.includes('ข้าม')) {
          rowClass += " row-rejected";
          badgeClass = "badge-danger";
        } else {
          rowClass += " row-skipped";
          badgeClass = "badge-neutral";
        }
      } else if (idx === currentIdx) {
        rowClass += " row-active";
        badgeClass = "badge-warning";
      }

      return `
        <tr class="${rowClass}">
          <td><strong>#${idx + 1}</strong></td>
          <td><span class="edge-name">${item.u} — ${item.v}</span></td>
          <td><strong class="text-amber">${item.w}</strong></td>
          <td><span class="badge ${badgeClass}">${idx <= currentIdx ? item.status : 'รอพิจารณา'}</span></td>
          <td class="text-small">${idx <= currentIdx ? item.reason : '—'}</td>
        </tr>
      `;
    }).join('');

    this.container.innerHTML = `
      <div class="sim-view-wrapper">
        <div class="sim-header">
          <div>
            <h4 class="sim-title">${scenario.title}</h4>
            <p class="sim-subtitle">${scenario.description}</p>
          </div>
          <div class="sim-step-badge">พิจารณาเส้นที่ ${this.currentStep + 1} / ${items.length}</div>
        </div>

        <div class="kruskal-table-container">
          <table class="kruskal-table">
            <thead>
              <tr>
                <th>ลำดับ</th>
                <th>เส้นเชื่อม (Edge)</th>
                <th>น้ำหนัก (Weight)</th>
                <th>ผลการตัดสินใจ</th>
                <th>เหตุผล (Union-Find Check)</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
        </div>

        <div class="kruskal-summary-card">
          <div>🎯 <strong>ผลรวมน้ำหนัก MST ทั้งหมด:</strong> <span class="text-emerald font-bold">${scenario.totalWeight}</span></div>
          <div class="text-dim text-small">กฎเหล็ก: ต้องมีครบ V - 1 = 5 - 1 = 4 เส้นเชื่อม และไม่มีวงจร (Cycle)</div>
        </div>

        <div class="sim-controls">
          <button class="btn btn-secondary" onclick="graphSim.prevStep()" ${this.currentStep === 0 ? 'disabled' : ''}>◀ ย้อนกลับ</button>
          <button class="btn btn-primary" id="sim-play-btn" onclick="graphSim.toggleAutoPlay()">${this.isPlaying ? '⏸ หยุดชั่วคราว' : '▶ เล่นอัตโนมัติ'}</button>
          <button class="btn btn-secondary" onclick="graphSim.nextStep()" ${this.currentStep >= items.length - 1 ? 'disabled' : ''}>ก้าวถัดไป ▶</button>
          <button class="btn btn-outline" onclick="graphSim.reset()">🔄 เริ่มต้นใหม่</button>
        </div>
      </div>
    `;
  }
}
