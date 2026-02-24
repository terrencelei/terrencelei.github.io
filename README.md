<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Terrence Lei — Engineering Portfolio</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&family=Syne:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
  :root {
    --bg: #0a0a0a;
    --surface: #111111;
    --surface2: #1a1a1a;
    --border: #222222;
    --text: #e8e4dc;
    --muted: #666660;
    --accent: #d4a853;
    --accent2: #7bc4c4;
    --accent3: #c97b5a;
    --mono: 'DM Mono', monospace;
    --sans: 'Syne', sans-serif;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--mono);
    font-size: 14px;
    line-height: 1.7;
    overflow-x: hidden;
  }

  /* NOISE TEXTURE OVERLAY */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 999;
    opacity: 0.5;
  }

  /* NAV */
  nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.25rem 3rem;
    border-bottom: 1px solid var(--border);
    background: rgba(10,10,10,0.92);
    backdrop-filter: blur(12px);
  }

  .nav-logo {
    font-family: var(--sans);
    font-weight: 800;
    font-size: 1rem;
    letter-spacing: -0.02em;
    color: var(--text);
    text-decoration: none;
  }

  .nav-logo span { color: var(--accent); }

  .nav-links {
    display: flex;
    gap: 2.5rem;
    list-style: none;
  }

  .nav-links a {
    color: var(--muted);
    text-decoration: none;
    font-size: 12px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    transition: color 0.2s;
  }

  .nav-links a:hover { color: var(--accent); }

  /* HERO */
  .hero {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    border-bottom: 1px solid var(--border);
    padding-top: 70px;
  }

  .hero-left {
    padding: 6rem 3rem 4rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-right: 1px solid var(--border);
    position: relative;
    overflow: hidden;
  }

  .hero-left::after {
    content: '';
    position: absolute;
    top: -200px;
    left: -200px;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(212,168,83,0.06) 0%, transparent 70%);
    pointer-events: none;
  }

  .hero-tag {
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .hero-tag::before {
    content: '';
    display: block;
    width: 2rem;
    height: 1px;
    background: var(--accent);
  }

  .hero-name {
    font-family: var(--sans);
    font-size: clamp(3rem, 6vw, 5rem);
    font-weight: 800;
    line-height: 0.95;
    letter-spacing: -0.03em;
    margin-bottom: 1rem;
  }

  .hero-name .line2 {
    color: transparent;
    -webkit-text-stroke: 1px var(--muted);
  }

  .hero-sub {
    font-size: 13px;
    color: var(--muted);
    max-width: 340px;
    margin-bottom: 3rem;
    line-height: 1.8;
  }

  .hero-sub strong { color: var(--text); font-weight: 400; }

  .hero-ctas {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.7rem 1.4rem;
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    text-decoration: none;
    border: 1px solid var(--border);
    background: transparent;
    color: var(--text);
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn:hover { border-color: var(--accent); color: var(--accent); }
  .btn.primary { background: var(--accent); border-color: var(--accent); color: #000; }
  .btn.primary:hover { background: transparent; color: var(--accent); }

  .hero-right {
    padding: 4rem 3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0;
  }

  .hero-stat {
    padding: 1.75rem 0;
    border-bottom: 1px solid var(--border);
    display: grid;
    grid-template-columns: 80px 1fr;
    gap: 1rem;
    align-items: start;
    opacity: 0;
    transform: translateX(20px);
    animation: slideIn 0.5s forwards;
  }

  .hero-stat:nth-child(1) { animation-delay: 0.1s; }
  .hero-stat:nth-child(2) { animation-delay: 0.2s; }
  .hero-stat:nth-child(3) { animation-delay: 0.3s; }
  .hero-stat:nth-child(4) { animation-delay: 0.4s; }

  @keyframes slideIn {
    to { opacity: 1; transform: translateX(0); }
  }

  .stat-num {
    font-family: var(--sans);
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--accent);
    line-height: 1;
  }

  .stat-label {
    font-size: 11px;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-top: 0.25rem;
  }

  .stat-desc {
    font-size: 13px;
    color: var(--text);
    line-height: 1.6;
    align-self: center;
  }

  /* SECTIONS */
  section {
    padding: 6rem 3rem;
    border-bottom: 1px solid var(--border);
  }

  .section-header {
    display: flex;
    align-items: baseline;
    gap: 1rem;
    margin-bottom: 4rem;
  }

  .section-num {
    font-family: var(--sans);
    font-size: 0.7rem;
    font-weight: 600;
    color: var(--accent);
    letter-spacing: 0.15em;
  }

  .section-title {
    font-family: var(--sans);
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: -0.02em;
  }

  .section-line {
    flex: 1;
    height: 1px;
    background: var(--border);
    margin-left: 1rem;
  }

  /* PROJECTS GRID */
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0;
    border: 1px solid var(--border);
  }

  .project-card {
    padding: 2.5rem;
    border-right: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    position: relative;
    cursor: pointer;
    transition: background 0.25s;
    overflow: hidden;
  }

  .project-card:nth-child(even) { border-right: none; }
  .project-card:nth-child(3), .project-card:nth-child(4) { border-bottom: none; }

  .project-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(212,168,83,0.04) 0%, transparent 60%);
    opacity: 0;
    transition: opacity 0.3s;
  }

  .project-card:hover { background: var(--surface); }
  .project-card:hover::before { opacity: 1; }

  .project-card:hover .project-arrow { transform: translate(4px, -4px); }

  .project-num {
    font-size: 11px;
    color: var(--muted);
    letter-spacing: 0.15em;
    margin-bottom: 0.75rem;
  }

  .project-title {
    font-family: var(--sans);
    font-size: 1.2rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    margin-bottom: 0.5rem;
    padding-right: 2rem;
    line-height: 1.3;
  }

  .project-org {
    font-size: 11px;
    color: var(--accent2);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 1.25rem;
  }

  .project-problem {
    font-size: 13px;
    color: var(--muted);
    margin-bottom: 1.5rem;
    line-height: 1.7;
  }

  .project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }

  .tag {
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 0.25rem 0.6rem;
    border: 1px solid var(--border);
    color: var(--muted);
  }

  .tag.accent { border-color: rgba(212,168,83,0.3); color: var(--accent); }
  .tag.teal { border-color: rgba(123,196,196,0.3); color: var(--accent2); }

  .project-result {
    font-size: 13px;
    color: var(--text);
    padding: 1rem;
    border-left: 2px solid var(--accent);
    background: rgba(212,168,83,0.04);
    margin-top: auto;
  }

  .project-arrow {
    position: absolute;
    top: 2.5rem;
    right: 2.5rem;
    color: var(--muted);
    font-size: 1rem;
    transition: transform 0.2s;
  }

  /* PROJECT DETAILS (expandable) */
  .project-details {
    display: none;
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--border);
  }

  .project-card.open .project-details { display: block; }

  .detail-section {
    margin-bottom: 1.25rem;
  }

  .detail-label {
    font-size: 10px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 0.5rem;
  }

  .detail-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .detail-list li {
    font-size: 13px;
    color: var(--muted);
    padding-left: 1rem;
    position: relative;
  }

  .detail-list li::before {
    content: '→';
    position: absolute;
    left: 0;
    color: var(--accent);
  }

  /* SKILLS */
  .skills-layout {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0;
    border: 1px solid var(--border);
  }

  .skill-col {
    padding: 2.5rem;
    border-right: 1px solid var(--border);
  }

  .skill-col:last-child { border-right: none; }

  .skill-col-title {
    font-family: var(--sans);
    font-size: 0.9rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    color: var(--accent);
    margin-bottom: 2rem;
    text-transform: uppercase;
    font-size: 11px;
    letter-spacing: 0.2em;
  }

  .skill-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.6rem 0;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    gap: 1rem;
  }

  .skill-name {
    font-size: 13px;
    color: var(--text);
  }

  .skill-bar {
    flex: 0 0 80px;
    height: 2px;
    background: var(--border);
    position: relative;
    overflow: hidden;
  }

  .skill-bar-fill {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    background: var(--accent);
    transition: width 1s ease;
  }

  /* MINDSET */
  .mindset-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 0;
    border: 1px solid var(--border);
  }

  .mindset-item {
    padding: 2.5rem 2rem;
    border-right: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .mindset-item:last-child { border-right: none; }

  .mindset-num {
    font-family: var(--sans);
    font-size: 3rem;
    font-weight: 800;
    color: transparent;
    -webkit-text-stroke: 1px rgba(212,168,83,0.25);
    line-height: 1;
  }

  .mindset-text {
    font-size: 13px;
    color: var(--text);
    line-height: 1.6;
  }

  .mindset-sub {
    font-size: 11px;
    color: var(--muted);
    line-height: 1.6;
  }

  /* CONTACT */
  .contact-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    border: 1px solid var(--border);
  }

  .contact-left {
    padding: 4rem;
    border-right: 1px solid var(--border);
  }

  .contact-left h2 {
    font-family: var(--sans);
    font-size: 2.5rem;
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.03em;
    margin-bottom: 1.5rem;
  }

  .contact-left h2 span {
    color: transparent;
    -webkit-text-stroke: 1px var(--muted);
  }

  .contact-left p {
    color: var(--muted);
    font-size: 13px;
    max-width: 340px;
    line-height: 1.8;
    margin-bottom: 2.5rem;
  }

  .contact-right {
    padding: 4rem;
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .contact-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem 0;
    border-bottom: 1px solid var(--border);
    text-decoration: none;
    color: var(--text);
    transition: color 0.2s;
    group: '';
  }

  .contact-link:hover { color: var(--accent); }
  .contact-link:hover .contact-link-arrow { transform: translate(4px, -4px); }

  .contact-link-info {}
  .contact-link-platform {
    font-size: 11px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 0.25rem;
  }

  .contact-link-name {
    font-family: var(--sans);
    font-size: 1.1rem;
    font-weight: 600;
  }

  .contact-link-arrow {
    color: var(--muted);
    transition: transform 0.2s;
  }

  /* FOOTER */
  footer {
    padding: 2rem 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  footer span {
    font-size: 11px;
    color: var(--muted);
    letter-spacing: 0.1em;
  }

  /* HERO ANIMATIONS */
  .hero-left .hero-tag,
  .hero-left .hero-name,
  .hero-left .hero-sub,
  .hero-left .hero-ctas {
    opacity: 0;
    transform: translateY(20px);
    animation: fadeUp 0.6s forwards;
  }

  .hero-left .hero-tag { animation-delay: 0.1s; }
  .hero-left .hero-name { animation-delay: 0.2s; }
  .hero-left .hero-sub { animation-delay: 0.3s; }
  .hero-left .hero-ctas { animation-delay: 0.4s; }

  @keyframes fadeUp {
    to { opacity: 1; transform: translateY(0); }
  }

  /* SCROLL REVEAL */
  .reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.7s, transform 0.7s;
  }

  .reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* TICKER */
  .ticker-wrap {
    overflow: hidden;
    border-bottom: 1px solid var(--border);
    padding: 0.75rem 0;
    background: var(--surface);
  }

  .ticker {
    display: flex;
    animation: ticker 30s linear infinite;
    white-space: nowrap;
  }

  .ticker-item {
    padding: 0 3rem;
    font-size: 11px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--muted);
    flex-shrink: 0;
  }

  .ticker-item span {
    color: var(--accent);
    margin-right: 3rem;
  }

  @keyframes ticker {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }

  /* RESPONSIVE */
  @media (max-width: 900px) {
    nav { padding: 1rem 1.5rem; }
    .nav-links { display: none; }
    .hero { grid-template-columns: 1fr; }
    .hero-left { border-right: none; padding: 4rem 1.5rem 2rem; }
    .hero-right { padding: 2rem 1.5rem; }
    section { padding: 4rem 1.5rem; }
    .projects-grid { grid-template-columns: 1fr; }
    .project-card { border-right: none !important; }
    .project-card:nth-child(3) { border-bottom: 1px solid var(--border) !important; }
    .skills-layout { grid-template-columns: 1fr; }
    .skill-col { border-right: none; border-bottom: 1px solid var(--border); }
    .mindset-grid { grid-template-columns: 1fr 1fr; }
    .mindset-item:nth-child(even) { border-right: none; }
    .mindset-item:nth-child(5) { border-right: none; }
    .contact-layout { grid-template-columns: 1fr; }
    .contact-left { border-right: none; border-bottom: 1px solid var(--border); padding: 2rem 1.5rem; }
    .contact-right { padding: 2rem 1.5rem; }
    footer { padding: 1.5rem; flex-direction: column; gap: 0.5rem; text-align: center; }
  }
</style>
</head>
<body>

<!-- NAV -->
<nav>
  <a href="#" class="nav-logo">TL<span>.</span></a>
  <ul class="nav-links">
    <li><a href="#projects">Projects</a></li>
    <li><a href="#skills">Skills</a></li>
    <li><a href="#mindset">Approach</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
</nav>

<!-- TICKER -->
<div class="ticker-wrap" style="margin-top:70px;">
  <div class="ticker">
    <div class="ticker-item"><span>→</span> Hardware Test & Validation</div>
    <div class="ticker-item"><span>→</span> Electromechanical Systems</div>
    <div class="ticker-item"><span>→</span> Test Automation</div>
    <div class="ticker-item"><span>→</span> Failure Analysis</div>
    <div class="ticker-item"><span>→</span> Aerospace Manufacturing</div>
    <div class="ticker-item"><span>→</span> Systems Engineering</div>
    <div class="ticker-item"><span>→</span> FEA & Structural Analysis</div>
    <div class="ticker-item"><span>→</span> Liquid Propulsion</div>
    <!-- Duplicate for seamless loop -->
    <div class="ticker-item"><span>→</span> Hardware Test & Validation</div>
    <div class="ticker-item"><span>→</span> Electromechanical Systems</div>
    <div class="ticker-item"><span>→</span> Test Automation</div>
    <div class="ticker-item"><span>→</span> Failure Analysis</div>
    <div class="ticker-item"><span>→</span> Aerospace Manufacturing</div>
    <div class="ticker-item"><span>→</span> Systems Engineering</div>
    <div class="ticker-item"><span>→</span> FEA & Structural Analysis</div>
    <div class="ticker-item"><span>→</span> Liquid Propulsion</div>
  </div>
</div>

<!-- HERO -->
<div class="hero" style="margin-top:0; border-top: none;">
  <div class="hero-left">
    <div class="hero-tag">UCSB · Aerospace &amp; Energy Systems</div>
    <h1 class="hero-name">
      Terrence<br>
      <span class="line2">Lei.</span>
    </h1>
    <p class="hero-sub">
      <strong>Mechanical Engineering &amp; Data Science student</strong> building hardware that has to work the first time — and the test systems that prove it.
    </p>
    <div class="hero-ctas">
      <a href="#" class="btn primary">↓ Resume (PDF)</a>
      <a href="#projects" class="btn">View Projects</a>
      <a href="https://github.com" class="btn" target="_blank">GitHub</a>
      <a href="https://linkedin.com" class="btn" target="_blank">LinkedIn</a>
    </div>
  </div>

  <div class="hero-right">
    <div class="hero-stat">
      <div>
        <div class="stat-num">25+</div>
        <div class="stat-label">Team size</div>
      </div>
      <div class="stat-desc">Led multidisciplinary engineering teams across propulsion, structures, controls, and test.</div>
    </div>
    <div class="hero-stat">
      <div>
        <div class="stat-num">–1mo</div>
        <div class="stat-label">Lead time cut</div>
      </div>
      <div class="stat-desc">Reduced production lead times at Northrop Grumman through qualification testing and process redesign.</div>
    </div>
    <div class="hero-stat">
      <div>
        <div class="stat-num">×100</div>
        <div class="stat-label">Speed-up</div>
      </div>
      <div class="stat-desc">Compressed materials testing timelines from months to days with autonomous robotic test platform.</div>
    </div>
    <div class="hero-stat">
      <div>
        <div class="stat-num">4</div>
        <div class="stat-label">Domains</div>
      </div>
      <div class="stat-desc">Hardware spanning aerospace manufacturing, liquid propulsion, autonomous robotics, and structural FEA.</div>
    </div>
  </div>
</div>

<!-- PROJECTS -->
<section id="projects">
  <div class="section-header reveal">
    <span class="section-num">01</span>
    <h2 class="section-title">Featured Projects</h2>
    <div class="section-line"></div>
  </div>

  <div class="projects-grid reveal">

    <!-- Project 1 -->
    <div class="project-card" onclick="toggleProject(this)">
      <span class="project-arrow">↗</span>
      <div class="project-num">001</div>
      <h3 class="project-title">Autonomous Test Platform for Materials Characterization</h3>
      <div class="project-org">Research Lab · UCSB</div>
      <p class="project-problem">Manual materials testing created multi-month bottlenecks for aerospace partners. The lab needed throughput, not headcount.</p>
      <div class="project-tags">
        <span class="tag accent">Test Automation</span>
        <span class="tag teal">Machine Vision</span>
        <span class="tag">Robotics</span>
        <span class="tag">Fixture Design</span>
      </div>
      <div class="project-result">
        Compressed testing timelines from months to days — fully operator-free.
      </div>
      <div class="project-details">
        <div class="detail-section">
          <div class="detail-label">What I Built</div>
          <ul class="detail-list">
            <li>Robotic arm sequencing system guided by machine vision</li>
            <li>Vacuum gripper mechanisms for delicate specimen handling</li>
            <li>Automated test workflow integrating mechanical tooling + software</li>
          </ul>
        </div>
        <div class="detail-section">
          <div class="detail-label">Engineering Focus</div>
          <ul class="detail-list">
            <li>Test automation architecture &amp; instrumentation</li>
            <li>Mechanical fixture design for repeatability</li>
            <li>Cross-disciplinary integration (ME + CS + Robotics)</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Project 2 -->
    <div class="project-card" onclick="toggleProject(this)">
      <span class="project-arrow">↗</span>
      <div class="project-num">002</div>
      <h3 class="project-title">Hardware Qualification &amp; Failure Analysis</h3>
      <div class="project-org">Northrop Grumman · Internship</div>
      <p class="project-problem">Assembly failures and material defects were driving up production lead times and cost across a critical manufacturing line.</p>
      <div class="project-tags">
        <span class="tag accent">Failure Analysis</span>
        <span class="tag teal">Qualification Testing</span>
        <span class="tag">GD&T</span>
        <span class="tag">DFM/DFA</span>
      </div>
      <div class="project-result">
        ~1 month reduction in production lead time. Eliminated recurring defects through process redesign.
      </div>
      <div class="project-details">
        <div class="detail-section">
          <div class="detail-label">My Contributions</div>
          <ul class="detail-list">
            <li>Designed and executed qualification tests for new wiring &amp; solder processes</li>
            <li>Built a solar array harness test assembly to validate layouts before production</li>
            <li>Characterized corrosion-inhibiting primer defects and root-caused failures</li>
            <li>Released drawings with worst-case GD&T and DFM/DFA principles</li>
          </ul>
        </div>
        <div class="detail-section">
          <div class="detail-label">Tools & Methods</div>
          <ul class="detail-list">
            <li>Test fixture design, test plan documentation</li>
            <li>Root cause investigation and corrective action</li>
            <li>Manufacturing-informed design validation</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Project 3 -->
    <div class="project-card" onclick="toggleProject(this)">
      <span class="project-arrow">↗</span>
      <div class="project-num">003</div>
      <h3 class="project-title">Liquid Rocket &amp; VTOL Hopper Development</h3>
      <div class="project-org">Gaucho Rocket Project · VP / Systems Lead</div>
      <p class="project-problem">Build a liquid propulsion rocket and reusable VTOL flight platform from scratch — with a 25-person team spanning multiple disciplines.</p>
      <div class="project-tags">
        <span class="tag accent">Systems Engineering</span>
        <span class="tag teal">Liquid Propulsion</span>
        <span class="tag">VTOL</span>
        <span class="tag">Safety-Critical Testing</span>
      </div>
      <div class="project-result">
        Led full system architecture, test campaigns, and hardware validation for both rocket and hopper programs.
      </div>
      <div class="project-details">
        <div class="detail-section">
          <div class="detail-label">My Role</div>
          <ul class="detail-list">
            <li>Led 25-person team across propulsion, structures, controls, and testing</li>
            <li>Oversaw hardware design, test planning, and validation strategy</li>
            <li>Supporting VTOL hopper to validate control laws and mechanisms</li>
          </ul>
        </div>
        <div class="detail-section">
          <div class="detail-label">Engineering Focus</div>
          <ul class="detail-list">
            <li>System architecture &amp; test campaign planning</li>
            <li>Electromechanical integration across subsystems</li>
            <li>Static fire, subsystem, and qualification testing</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Project 4 -->
    <div class="project-card" onclick="toggleProject(this)">
      <span class="project-arrow">↗</span>
      <div class="project-num">004</div>
      <h3 class="project-title">Suspension &amp; Structural FEA — Performance Vehicle</h3>
      <div class="project-org">Gaucho Racing · Design Engineer</div>
      <p class="project-problem">Achieve better vehicle performance through lighter, stiffer suspension components while ensuring structural safety under dynamic load cases.</p>
      <div class="project-tags">
        <span class="tag accent">FEA</span>
        <span class="tag teal">Carbon Fiber</span>
        <span class="tag">Suspension Design</span>
        <span class="tag">Optimization</span>
      </div>
      <div class="project-result">
        Highest competition judge score for the team. Improved vehicle performance through weight-optimized FEA-driven design.
      </div>
      <div class="project-details">
        <div class="detail-section">
          <div class="detail-label">What I Did</div>
          <ul class="detail-list">
            <li>Designed adjustable steering and decoupled front suspension system</li>
            <li>Performed FEA on carbon fiber control arms with defined load cases</li>
            <li>Optimized for stiffness, weight, and manufacturability</li>
          </ul>
        </div>
        <div class="detail-section">
          <div class="detail-label">Engineering Focus</div>
          <ul class="detail-list">
            <li>Structural analysis: stress, displacement, safety factor</li>
            <li>Load case definition from vehicle dynamics</li>
            <li>Iterative design progression documented and presented</li>
          </ul>
        </div>
      </div>
    </div>

  </div>
</section>

<!-- SKILLS -->
<section id="skills">
  <div class="section-header reveal">
    <span class="section-num">02</span>
    <h2 class="section-title">Hardware Testing Skillset</h2>
    <div class="section-line"></div>
  </div>

  <div class="skills-layout reveal">
    <div class="skill-col">
      <div class="skill-col-title">Test & Validation</div>
      <div class="skill-item"><span class="skill-name">Design of Experiments (DOE)</span><div class="skill-bar"><div class="skill-bar-fill" style="width:90%"></div></div></div>
      <div class="skill-item"><span class="skill-name">Hardware Qualification Testing</span><div class="skill-bar"><div class="skill-bar-fill" style="width:95%"></div></div></div>
      <div class="skill-item"><span class="skill-name">Failure Analysis & Teardown</span><div class="skill-bar"><div class="skill-bar-fill" style="width:90%"></div></div></div>
      <div class="skill-item"><span class="skill-name">Test Documentation & Reporting</span><div class="skill-bar"><div class="skill-bar-fill" style="width:85%"></div></div></div>
      <div class="skill-item"><span class="skill-name">Root Cause Investigation</span><div class="skill-bar"><div class="skill-bar-fill" style="width:88%"></div></div></div>
      <div class="skill-item"><span class="skill-name">GD&T / DFM / DFA</span><div class="skill-bar"><div class="skill-bar-fill" style="width:80%"></div></div></div>
    </div>
    <div class="skill-col">
      <div class="skill-col-title">Hardware & Tools</div>
      <div class="skill-item"><span class="skill-name">Test Fixtures & Harnesses</span><div class="skill-bar"><div class="skill-bar-fill" style="width:95%"></div></div></div>
      <div class="skill-item"><span class="skill-name">Vacuum Gripper Mechanisms</span><div class="skill-bar"><div class="skill-bar-fill" style="width:85%"></div></div></div>
      <div class="skill-item"><span class="skill-name">Instrumentation</span><div class="skill-bar"><div class="skill-bar-fill" style="width:88%"></div></div></div>
      <div class="skill-item"><span class="skill-name">FEA (Structural/Thermal)</span><div class="skill-bar"><div class="skill-bar-fill" style="width:85%"></div></div></div>
      <div class="skill-item"><span class="skill-name">CAD (SolidWorks / Fusion)</span><div class="skill-bar"><div class="skill-bar-fill" style="width:90%"></div></div></div>
      <div class="skill-item"><span class="skill-name">Environmental Test Setups</span><div class="skill-bar"><div class="skill-bar-fill" style="width:80%"></div></div></div>
    </div>
    <div class="skill-col">
      <div class="skill-col-title">Software & Automation</div>
      <div class="skill-item"><span class="skill-name">Python</span><div class="skill-bar"><div class="skill-bar-fill" style="width:92%"></div></div></div>
      <div class="skill-item"><span class="skill-name">MATLAB</span><div class="skill-bar"><div class="skill-bar-fill" style="width:88%"></div></div></div>
      <div class="skill-item"><span class="skill-name">C++</span><div class="skill-bar"><div class="skill-bar-fill" style="width:78%"></div></div></div>
      <div class="skill-item"><span class="skill-name">Data Analysis & Visualization</span><div class="skill-bar"><div class="skill-bar-fill" style="width:90%"></div></div></div>
      <div class="skill-item"><span class="skill-name">Test Automation Pipelines</span><div class="skill-bar"><div class="skill-bar-fill" style="width:85%"></div></div></div>
      <div class="skill-item"><span class="skill-name">Machine Vision</span><div class="skill-bar"><div class="skill-bar-fill" style="width:75%"></div></div></div>
    </div>
  </div>
</section>

<!-- MINDSET -->
<section id="mindset">
  <div class="section-header reveal">
    <span class="section-num">03</span>
    <h2 class="section-title">Engineering Approach</h2>
    <div class="section-line"></div>
  </div>

  <div class="mindset-grid reveal">
    <div class="mindset-item">
      <div class="mindset-num">01</div>
      <div class="mindset-text">Understand failure modes first</div>
      <div class="mindset-sub">Before building a test, map every way the hardware can fail. Prioritize the ones that matter.</div>
    </div>
    <div class="mindset-item">
      <div class="mindset-num">02</div>
      <div class="mindset-text">Design tests that isolate variables</div>
      <div class="mindset-sub">A test that measures everything at once tells you nothing. Control conditions ruthlessly.</div>
    </div>
    <div class="mindset-item">
      <div class="mindset-num">03</div>
      <div class="mindset-text">Build simple, repeatable fixtures</div>
      <div class="mindset-sub">Complexity in fixtures introduces noise. The best setup is the one anyone can reproduce.</div>
    </div>
    <div class="mindset-item">
      <div class="mindset-num">04</div>
      <div class="mindset-text">Let data drive decisions</div>
      <div class="mindset-sub">Intuition identifies hypotheses. Data confirms or kills them. Skip the politics.</div>
    </div>
    <div class="mindset-item">
      <div class="mindset-num">05</div>
      <div class="mindset-text">Iterate fast, document everything</div>
      <div class="mindset-sub">Speed without documentation means solving the same problem twice. Write it down.</div>
    </div>
  </div>
</section>

<!-- CONTACT -->
<section id="contact" style="padding-bottom: 0;">
  <div class="section-header reveal">
    <span class="section-num">04</span>
    <h2 class="section-title">Let's Connect</h2>
    <div class="section-line"></div>
  </div>

  <div class="contact-layout reveal">
    <div class="contact-left">
      <h2>Open to<br><span>internships</span><br>&amp; roles.</h2>
      <p>Looking for hardware test, systems, or mechanical engineering opportunities — especially in aerospace, energy, and hardware-forward startups.</p>
      <a href="mailto:terrencelei@ucsb.edu" class="btn primary">↗ Send an Email</a>
    </div>
    <div class="contact-right">
      <a href="https://linkedin.com" target="_blank" class="contact-link">
        <div class="contact-link-info">
          <div class="contact-link-platform">LinkedIn</div>
          <div class="contact-link-name">linkedin.com/in/terrencelei</div>
        </div>
        <span class="contact-link-arrow">↗</span>
      </a>
      <a href="https://github.com" target="_blank" class="contact-link">
        <div class="contact-link-info">
          <div class="contact-link-platform">GitHub</div>
          <div class="contact-link-name">github.com/terrencelei</div>
        </div>
        <span class="contact-link-arrow">↗</span>
      </a>
      <a href="#" class="contact-link">
        <div class="contact-link-info">
          <div class="contact-link-platform">Resume</div>
          <div class="contact-link-name">Download PDF →</div>
        </div>
        <span class="contact-link-arrow">↗</span>
      </a>
      <a href="mailto:terrencelei@ucsb.edu" class="contact-link">
        <div class="contact-link-info">
          <div class="contact-link-platform">Email</div>
          <div class="contact-link-name">terrencelei@ucsb.edu</div>
        </div>
        <span class="contact-link-arrow">↗</span>
      </a>
    </div>
  </div>
</section>

<footer>
  <span>© 2025 Terrence Lei · UCSB Mechanical Engineering</span>
  <span>Built with care — no templates, no fluff.</span>
</footer>

<script>
  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(el => observer.observe(el));

  // Toggle project details
  function toggleProject(card) {
    card.classList.toggle('open');
    const arrow = card.querySelector('.project-arrow');
    arrow.textContent = card.classList.contains('open') ? '↙' : '↗';
  }

  // Skill bar animation on scroll
  const skillSection = document.getElementById('skills');
  let barsAnimated = false;
  const skillObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !barsAnimated) {
      barsAnimated = true;
      document.querySelectorAll('.skill-bar-fill').forEach(bar => {
        const w = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => { bar.style.width = w; }, 100);
      });
    }
  }, { threshold: 0.2 });
  if (skillSection) skillObserver.observe(skillSection);
</script>
</body>
</html>
