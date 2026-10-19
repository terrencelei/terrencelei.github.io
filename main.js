/* Terrence Lei portfolio: nav, theme, reveals, explainer playback, counters, video. No libraries. */
(function () {
  'use strict';

  var root = document.documentElement;
  var params;
  try { params = new URLSearchParams(location.search); } catch (e) { params = { get: function () { return null; }, has: function () { return false; } }; }
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Headless screenshots use a very tall window; reveal everything so nothing renders hidden.
  var showAll = params.has('shot') || window.innerHeight > 2400 || !('IntersectionObserver' in window);
  var staticMode = params.has('shot') || window.innerHeight > 2400;
  if (staticMode) { root.classList.add('static'); reduceMotion = true; }

  /* ---------- theme toggle ---------- */
  function currentTheme() {
    var t = root.getAttribute('data-theme');
    if (t) return t;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  var toggle = document.querySelector('.theme-toggle');
  function labelToggle() {
    if (!toggle) return;
    toggle.setAttribute('aria-label', currentTheme() === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  }
  if (toggle) {
    labelToggle();
    toggle.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) { /* storage blocked: theme lasts this visit */ }
      labelToggle();
    });
  }

  /* ---------- mobile menu ---------- */
  var nav = document.querySelector('.nav');
  var menuBtn = document.querySelector('.menu-btn');
  if (nav && menuBtn) {
    menuBtn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    nav.querySelectorAll('.nav-links a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.setAttribute('aria-label', 'Open menu');
      });
    });
  }

  /* ---------- reveal on scroll ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if (showAll || reduceMotion) {
    reveals.forEach(function (el) { el.classList.add('in'); });
  } else {
    var rio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); rio.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { rio.observe(el); });
  }

  /* ---------- counters ---------- */
  function fmt(n) { return Math.round(n).toLocaleString('en-US'); }
  function runCounter(el) {
    if (el.dataset.done) return;
    el.dataset.done = '1';
    var to = parseFloat(el.dataset.countTo), suffix = el.dataset.suffix || '';
    if (reduceMotion) { el.textContent = fmt(to) + suffix; return; }
    var start = null, dur = 1600;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min(1, (ts - start) / dur), e = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(to * e) + (p === 1 ? suffix : '');
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ---------- powder readout: fast far from target, slow near it ---------- */
  var readout = document.getElementById('g-readout');
  var readoutOn = false, readoutStart = 0;
  function readoutTick(ts) {
    if (!readoutOn) return;
    if (!readoutStart) readoutStart = ts;
    var cycle = 3000, t = ((ts - readoutStart) % cycle) / cycle;   // matches the 3 s CSS loop
    var p = Math.min(1, t / 0.75), e = 1 - Math.pow(1 - p, 3);
    readout.textContent = (10 * e).toFixed(2);
    requestAnimationFrame(readoutTick);
  }

  /* ---------- explainers: animate only while in view ---------- */
  var explainers = document.querySelectorAll('.explainer');
  function setPlaying(el, on) {
    el.classList.toggle('is-playing', on);
    if (on) el.querySelectorAll('[data-count-to]').forEach(runCounter);
    if (readout && el.contains(readout)) {
      if (on && !readoutOn) { readoutOn = true; readoutStart = 0; requestAnimationFrame(readoutTick); }
      if (!on) { readoutOn = false; readout.textContent = '10.00'; }
    }
  }
  if (reduceMotion) {
    // static final state: no animation, counters show their final values
    document.querySelectorAll('[data-count-to]').forEach(runCounter);
  } else if (!('IntersectionObserver' in window) || params.has('shot')) {
    explainers.forEach(function (el) { setPlaying(el, true); });
  } else {
    var eio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { setPlaying(en.target, en.isIntersecting); });
    }, { threshold: 0.3 });
    explainers.forEach(function (el) { eio.observe(el); });
  }

  /* ---------- cart video: play only while visible ---------- */
  var vids = document.querySelectorAll('video.autoplay-in-view');
  if (reduceMotion) {
    vids.forEach(function (v) { v.setAttribute('controls', ''); v.pause(); });
  } else if ('IntersectionObserver' in window) {
    var vio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { var p = en.target.play(); if (p && p.catch) p.catch(function () {}); }
        else en.target.pause();
      });
    }, { threshold: 0.35 });
    vids.forEach(function (v) { vio.observe(v); });
  }

  /* ---------- footer year ---------- */
  var y = document.getElementById('year');
  if (y) y.textContent = String(new Date().getFullYear());
})();

/* ---------- mini follow simulation (ported from the cart project site) ---------- */
(function () {
  var route = document.getElementById('sim-route');
  if (!route || !route.getTotalLength) return;
  var $ = function (id) { return document.getElementById(id); };
  var shopper = $('sim-shopper'), cart = $('sim-cart'), body = $('sim-cartbody'), cone = $('sim-cone'),
      tether = $('sim-tether'), label = $('sim-gap'), pillR = $('sim-moderect'), pillT = $('sim-modetext');
  var obs = [1, 2, 3].map(function (i) { return { g: $('sim-o' + i), ring: $('sim-o' + i + 'r') }; });
  var L = route.getTotalLength(), V = 58, VMAX = 150, KP = 10, GAP = 92, PXM = 46, T = L / V;
  var TEAL = '#6FB3A8', CORAL = '#F0766B';
  var at = function (d) { return route.getPointAtLength(((d % L) + L) % L); };
  var wrap = function (a) { while (a > Math.PI) a -= 2 * Math.PI; while (a < -Math.PI) a += 2 * Math.PI; return a; };
  function obPos(i, tm, t) {
    if (i === 0) { var t0 = 2, v = 54, dur = 616 / v; if (tm < t0 || tm > t0 + dur) return null; return { x: 668 - v * (tm - t0), y: 480 }; }
    if (i === 1) { var ph = t % 17; if (ph < 4 || ph > 4 + 225 / 46) return null; return { x: 585, y: 30 + 46 * (ph - 4) }; }
    var a = t * 2 * Math.PI / 11; return { x: 612 + 16 * Math.cos(a), y: 250 + 12 * Math.sin(a) };
  }
  function blocking(c, s, o) {
    var dx = s.x - c.x, dy = s.y - c.y, l2 = dx * dx + dy * dy; if (l2 < 1) return false;
    var k = ((o.x - c.x) * dx + (o.y - c.y) * dy) / l2; if (k < .05 || k > .95) return false;
    var px = c.x + k * dx - o.x, py = c.y + k * dy - o.y;
    return px * px + py * py < 52 * 52 && Math.pow(o.x - c.x, 2) + Math.pow(o.y - c.y, 2) < 170 * 170;
  }
  function pill(txt, col, bg, br) {
    pillT.textContent = txt; pillT.setAttribute('fill', col); pillR.setAttribute('fill', bg); pillR.setAttribute('stroke', br);
    var w = Math.ceil(pillT.getComputedTextLength()) + 34; pillR.setAttribute('width', w); pillT.setAttribute('x', w / 2);
  }
  function place(s, c, heading) {
    shopper.setAttribute('transform', 'translate(' + s.x + ',' + s.y + ')');
    cart.setAttribute('transform', 'translate(' + c.x + ',' + c.y + ')');
    body.setAttribute('transform', 'rotate(' + (heading * 180 / Math.PI) + ')');
    tether.setAttribute('x1', c.x); tether.setAttribute('y1', c.y); tether.setAttribute('x2', s.x); tether.setAttribute('y2', s.y);
    label.setAttribute('x', (s.x + c.x) / 2); label.setAttribute('y', (s.y + c.y) / 2 - 12);
  }
  var c0 = at(-GAP), a0 = at(-GAP + 6), d_c = -GAP, heading = Math.atan2(a0.y - c0.y, a0.x - c0.x), blockUntil = -9, lastMode = '', prevT, running = false, raf = 0;
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || document.documentElement.classList.contains('static')) {
    var d = GAP + 170, s0 = at(d), c1 = at(d - GAP), a1 = at(d - GAP + 6); place(s0, c1, Math.atan2(a1.y - c1.y, a1.x - c1.x));
    [[455, 480], [585, 140], [615, 255]].forEach(function (p, i) { obs[i].g.setAttribute('opacity', 1); obs[i].g.setAttribute('transform', 'translate(' + p[0] + ',' + p[1] + ')'); });
    return;
  }
  function tick(now) {
    if (!running) return; raf = requestAnimationFrame(tick);
    var t = now / 1000, dt = Math.min(prevT === undefined ? 0.016 : t - prevT, 0.05); prevT = t;
    var tm = t % T, d_s = V * t, s = at(d_s), opos = [];
    obs.forEach(function (o, i) { var p = obPos(i, tm, t); if (p) { o.g.setAttribute('opacity', 1); o.g.setAttribute('transform', 'translate(' + p.x + ',' + p.y + ')'); } else o.g.setAttribute('opacity', 0); opos[i] = p; });
    var gap = ((d_s - d_c) % L + L) % L; if (gap > 600) { d_c = d_s - GAP; gap = GAP; }
    var c = at(d_c), blocker = -1;
    opos.forEach(function (p, i) { if (p && blocking(c, s, p)) blocker = i; });
    if (blocker >= 0) blockUntil = t + 0.6;
    var mode = t < blockUntil ? 'BLOCKED' : 'FOLLOW';
    if (mode !== 'BLOCKED') { var err = gap - GAP; if (err < 3) d_c = d_s - GAP; else d_c += Math.min(KP * err, VMAX) * dt; }
    var c2 = at(d_c), des;
    if (mode === 'BLOCKED') des = Math.atan2(s.y - c2.y, s.x - c2.x); else { var a = at(d_c + 6); des = Math.atan2(a.y - c2.y, a.x - c2.x); }
    heading += Math.max(-4.5 * dt, Math.min(4.5 * dt, wrap(des - heading)));
    place(s, c2, heading);
    var dist = Math.hypot(s.x - c2.x, s.y - c2.y);
    tether.setAttribute('stroke', mode === 'BLOCKED' ? 'rgba(240,118,107,.7)' : 'rgba(111,179,168,.6)');
    label.setAttribute('fill', mode === 'BLOCKED' ? CORAL : TEAL); label.textContent = (dist / PXM).toFixed(1) + ' m';
    cone.setAttribute('fill', mode === 'BLOCKED' ? 'rgba(240,118,107,.10)' : 'rgba(111,179,168,.10)');
    obs.forEach(function (o, i) { var isB = (i === blocker && mode === 'BLOCKED'); o.ring.setAttribute('r', isB ? 22 + 3 * Math.sin(t * 10) : 18); o.ring.setAttribute('stroke', isB ? 'rgba(240,118,107,.95)' : 'rgba(240,118,107,.5)'); });
    if (mode !== lastMode) { lastMode = mode; if (mode === 'FOLLOW') pill('FOLLOW', TEAL, 'rgba(111,179,168,.14)', 'rgba(111,179,168,.5)'); else pill('WAITING FOR PATH', CORAL, 'rgba(240,118,107,.14)', 'rgba(240,118,107,.5)'); }
  }
  function start() { if (running) return; running = true; prevT = undefined; raf = requestAnimationFrame(tick); }
  function stop() { running = false; cancelAnimationFrame(raf); }
  var svg = document.getElementById('sim');
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (en) { en.forEach(function (e) { e.isIntersecting ? start() : stop(); }); }, { threshold: .1 }).observe(svg);
  } else start();
})();
