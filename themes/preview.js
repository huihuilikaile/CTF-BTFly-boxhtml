const theme = document.body.dataset.theme || "signal";
const info = {
  signal: { label: "Signal Blue", subtitle: "专业蓝灰 · 清晰、稳健、适合长时间工作" },
  carbon: { label: "Carbon Lime", subtitle: "碳黑荧光 · 工业感强、适合 CTF 品牌表达" },
  warm: { label: "Warm Sand", subtitle: "暖沙高对比 · 克制、舒适、弱化传统蓝色控制台感" },
  nord: { label: "Nord Violet", subtitle: "Nord 紫蓝 · 低刺激、层级柔和、适合夜间使用" },
  neon: { label: "Neon Pop", subtitle: "霓虹潮流 · 洋红与电光青、年轻且富有舞台感" },
  obsidian: { label: "Obsidian Mono", subtitle: "纯黑极简 · 去除多余色彩、内容优先" },
  ivory: { label: "Ivory Studio", subtitle: "乳白工作室 · 温柔纸张感、沉稳而不老气" },
  citrus: { label: "Citrus Sky", subtitle: "柑橘蓝 · 清亮活力、适合青春亮色方向" },
  sakura: { label: "Sakura Soda", subtitle: "樱花汽水 · 粉青撞色、轻快且有记忆点" },
  mint: { label: "Mint Paper", subtitle: "薄荷纸张 · 清新自然、亮色但不刺眼" },
  aurora: { label: "Aurora Flux", subtitle: "极光流动 · 青绿、湖蓝与紫色的冷调渐变" },
  sunset: { label: "Sunset Drive", subtitle: "落日公路 · 柑橘、珊瑚红与洋红的暖调渐变" },
  ocean: { label: "Ocean Prism", subtitle: "深海棱镜 · 青绿到电光蓝的科技渐变" },
  ultraviolet: { label: "Ultra Violet", subtitle: "紫电光谱 · 蓝紫与桃红渐变、未来感鲜明" },
  pearl: { label: "Pearl Glow", subtitle: "珍珠柔光 · 乳白底上的粉紫蓝轻盈渐变" },
}[theme];

const links = [
  ["signal", "Signal", "signal-blue.html"],
  ["carbon", "Carbon", "carbon-lime.html"],
  ["warm", "Warm", "warm-sand.html"],
  ["nord", "Nord", "nord-violet.html"],
  ["neon", "Neon", "neon-pop.html"],
  ["obsidian", "Black", "obsidian-mono.html"],
  ["ivory", "Ivory", "ivory-studio.html"],
  ["citrus", "Citrus", "citrus-sky.html"],
  ["sakura", "Sakura", "sakura-soda.html"],
  ["mint", "Mint", "mint-paper.html"],
  ["aurora", "Aurora", "aurora-flux.html"],
  ["sunset", "Sunset", "sunset-drive.html"],
  ["ocean", "Ocean", "ocean-prism.html"],
  ["ultraviolet", "Violet", "ultra-violet.html"],
  ["pearl", "Pearl", "pearl-glow.html"],
];

document.body.innerHTML = `
  <div class="app">
    <header class="titlebar"><span class="brand">CTF-BTFly</span><span class="crumb">/ local control plane / 任务控制台</span><span class="status"><i class="dot"></i> daemon · connected</span></header>
    <div class="shell">
      <aside class="sidebar">
        <div class="eyebrow">Autonomous CTF Workspace</div>
        <button class="primary">＋ 新建题目</button>
        <button class="primary secondary-launch">✣ 超级模式</button>
        <div class="nav-scroll">
          <button class="nav-item"><span class="nav-icon">▦</span><span>系统概况</span></button>
          <button class="nav-item active"><span class="nav-icon">⌘</span><span>任务控制台</span><span class="count">4</span></button>
          <button class="nav-item"><span class="nav-icon">⚑</span><span>Flag 审核</span><span class="count">1</span></button>
          <button class="nav-item"><span class="nav-icon">◷</span><span>历史题目</span><span class="count">135</span></button>
          <div class="nav-title">Challenge Types</div>
          <button class="nav-item"><span class="nav-icon">◎</span><span>Web</span><span class="count">2</span></button>
          <button class="nav-item"><span class="nav-icon">▣</span><span>Pwn</span><span class="count">1</span></button>
          <button class="nav-item"><span class="nav-icon">◇</span><span>逆向</span><span class="count">3</span></button>
          <button class="nav-item"><span class="nav-icon">⚿</span><span>密码</span><span class="count">2</span></button>
          <button class="nav-item"><span class="nav-icon">⌕</span><span>取证</span><span class="count">1</span></button>
          <button class="nav-item"><span class="nav-icon">⬡</span><span>杂项</span><span class="count">2</span></button>
          <div class="nav-title">System</div>
          <button class="nav-item"><span class="nav-icon">◴</span><span>模型用量</span></button>
        </div>
        <div class="sidebar-footer"><span class="avatar">CP</span><span class="footer-copy">本机控制平面<small>v2.7.1 · 已授权</small></span><button id="open-settings" class="icon-button" title="应用设置">⚙</button></div>
      </aside>
      <main class="main">
        <div class="workspace">
          <section class="content">
            <header class="page-head"><div><h1>任务控制台</h1><p>${info.label} · ${info.subtitle}</p></div><input class="search" placeholder="搜索题目 / 模型 / ID" /></header>
            <div class="metrics">
              <article class="metric"><span class="metric-label">活跃 Agent</span><strong>3</strong><small>3 个任务正在执行</small></article>
              <article class="metric"><span class="metric-label">调度队列</span><strong>1</strong><small>根任务容量 2 / 4</small></article>
              <article class="metric"><span class="metric-label">Flag 审核</span><strong>1</strong><small>存在高置信度候选</small></article>
              <article class="metric"><span class="metric-label">主机资源</span><strong>42%</strong><small>内存 61% · 22 逻辑线程</small></article>
            </div>
            <div class="section-head"><div><h2>任务控制台 · 运行与排队</h2><p>统一显示全部、活跃、需处理和已完成任务</p></div><div class="filters"><button class="filter active">全部</button><button class="filter">活跃</button><button class="filter">需处理</button></div></div>
            <div class="cards">
              <article class="task-card selected"><div class="task-top"><span class="task-glyph">◇</span><span class="task-title"><strong>Blackboard multi Pi smoke</strong><small>Perform a minimal independent analysis of this challenge.</small></span><span class="badge">运行中</span></div><div class="progress"><i></i></div><div class="meta"><span>MISC · attempt 01</span><span>blackboard</span><span>3 Agents</span></div></article>
              <article class="task-card"><div class="task-top"><span class="task-glyph">⚿</span><span class="task-title"><strong>RSA partial key recovery</strong><small>恢复偏移素数并验证最终明文。</small></span><span class="badge">已锁定</span></div><div class="progress"><i style="width:100%"></i></div><div class="meta"><span>CRYPTO · attempt 02</span><span>standard</span><span>1 Agent</span></div></article>
              <article class="task-card"><div class="task-top"><span class="task-glyph">⌕</span><span class="task-title"><strong>Memory image triage</strong><small>Volatility profile and suspicious process analysis.</small></span><span class="badge" style="color:var(--warning)">待审核</span></div><div class="progress"><i style="width:91%"></i></div><div class="meta"><span>FORENSICS · attempt 01</span><span>blackboard</span><span>4 Agents</span></div></article>
              <article class="task-card"><div class="task-top"><span class="task-glyph">◎</span><span class="task-title"><strong>API authorization chain</strong><small>Inspect request signing and identify the bypass.</small></span><span class="badge">运行中</span></div><div class="progress"><i style="width:54%"></i></div><div class="meta"><span>WEB · attempt 03</span><span>standard</span><span>1 Agent</span></div></article>
            </div>
          </section>
          <aside class="inspector"><div class="inspector-head"><span class="live">● LIVE TASK · MISC</span><h3>Blackboard multi Pi smoke</h3><p>attempt 01 · blackboard · deepseek-v4-flash</p></div><div class="tabs"><button class="tab active">事件流</button><button class="tab">黑板</button><button class="tab">文件 3</button><button class="tab">审计</button></div><div class="event-list"><div class="event"><time>16:42:01</time><div><strong>Agent 已启动</strong>任务容器准备完成，开始读取附件。</div></div><div class="event"><time>16:42:14</time><div><strong>模型推理</strong>正在识别文件格式并规划取证流程。</div></div><div class="event"><time>16:42:31</time><div><strong>工具调用</strong>host__example_file_analyzer · succeeded · 128 ms</div></div><div class="event"><time>16:42:45</time><div><strong>Flag 候选</strong>发现高置信度候选，等待人工确认。</div></div></div></aside>
        </div>
      </main>
    </div>
  </div>
  <nav class="theme-links">${links.map(([id, label, href]) => `<a class="${id === theme ? "current" : ""}" href="${href}">${label}</a>`).join("")}</nav>
  <div id="settings-overlay" class="overlay" role="dialog" aria-modal="true" aria-label="应用设置">
    <section class="settings">
      <header class="settings-head"><span class="avatar">⚙</span><div><h2>应用设置</h2><p>更清晰的设置分组、更大的辅助文字和稳定的底部入口</p></div><button id="close-settings" class="close">关闭</button></header>
      <div class="settings-body">
        <nav class="settings-nav">
          <div class="settings-category">常规</div>
          <button class="nav-item"><span class="nav-icon">◉</span><span>外观与主题</span></button>
          <button class="nav-item"><span class="nav-icon">▤</span><span>数据与授权</span></button>
          <div class="settings-category">运行环境</div>
          <button class="nav-item"><span class="nav-icon">◴</span><span>资源与并发</span></button>
          <button class="nav-item"><span class="nav-icon">⬡</span><span>Windows 沙箱</span></button>
          <div class="settings-category">工具与集成</div>
          <button class="nav-item"><span class="nav-icon">▣</span><span>基础工具</span></button>
          <button class="nav-item"><span class="nav-icon">◇</span><span>Tool Pack</span></button>
          <button class="nav-item"><span class="nav-icon">⌁</span><span>MCP 工具</span></button>
          <button class="nav-item active"><span class="nav-icon">⚒</span><span>本机工具</span></button>
          <div class="settings-category">Agent</div>
          <button class="nav-item"><span class="nav-icon">✣</span><span>系统提示词</span></button>
        </nav>
        <main class="settings-page"><h3>本机工具插件</h3><p>从宿主机安全运行固定 EXE、Python 或脚本，通过任务级 MCP 返回结果。</p>
          <section class="settings-card"><div class="settings-card-title"><span class="dot"></span>插件已启用<small>daemon connected</small></div><div class="form-grid"><div class="field"><label>工具名前缀</label><input value="host" readonly /></div><div class="field"><label>默认权限</label><select><option>只读</option></select></div><div class="field"><label>执行策略</label><input value="受控运行" readonly /></div></div></section>
          <section class="settings-card"><div class="settings-card-title">已配置工具<div class="tool-actions"><button class="button">EXE 示例</button><button class="button">Python 示例</button><button class="button emphasis">＋ 新增工具</button></div></div><div class="tool-row"><span class="dot"></span><div><strong>Example File Analyzer</strong><small>forensics · Windows EXE · read-only</small></div><span class="badge" style="margin-left:auto">可用</span></div></section>
          <section class="settings-card"><div class="settings-card-title">新增工具</div><div class="form-grid"><div class="field"><label>所属方向</label><select><option>Forensics</option></select></div><div class="field"><label>工具 ID</label><input value="example-file-analyzer" /></div><div class="field"><label>显示名称</label><input value="EXE 文件分析示例" /></div><div class="field"><label>运行平台</label><select><option>Windows 本机</option></select></div><div class="field"><label>Runner</label><select><option>EXE</option></select></div><div class="field"><label>参数模式</label><input value="固定模板" /></div></div><div class="hint">高级 Schema、环境变量和文件交换参数默认折叠；常用配置保持在首屏内完成。</div></section>
        </main>
      </div>
    </section>
  </div>`;

const overlay = document.getElementById("settings-overlay");
document.getElementById("open-settings").addEventListener("click", () => overlay.classList.add("open"));
document.getElementById("close-settings").addEventListener("click", () => overlay.classList.remove("open"));
overlay.addEventListener("click", event => { if (event.target === overlay) overlay.classList.remove("open"); });
document.addEventListener("keydown", event => { if (event.key === "Escape") overlay.classList.remove("open"); });
if (new URLSearchParams(location.search).get("settings") === "1") overlay.classList.add("open");
