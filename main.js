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


/* ---------- dark lab: one sample path, two different hands ---------- */
(function () {
  var svg = document.getElementById('dl-scene'); if (!svg) return;
  var $ = function (id) { return document.getElementById(id); };
  var up = $('dl-up'), fore = $('dl-fore'), elbow = $('dl-elbow'), grip = $('dl-grip'), sample = $('dl-sample');
  var head = $('dl-head'), body = $('dl-body'), legA = $('dl-legA'), legB = $('dl-legB'), up2 = $('dl-up2'), fore2 = $('dl-fore2');
  var carriage = $('dl-carriage'), cone = $('dl-conePath'), lswA = $('dl-lswA'), lswB = $('dl-lswB'), toggle = $('dl-toggle');
  var TRAY = { x: 91, y: 224 }, FIX = { x: 292, y: 220 }, CHUTE = { x: 352, y: 232 }, PASS = { x: 400, y: 211 }, FAIL = { x: 400, y: 245 };
  var BASE = { x: 188, y: 120 }, L1 = 80, L2 = 60;           // robot: overhead mount on a centre column; one elbow branch, forearm crosses in front
  var SH_Y = 190, A1 = 22, A2 = 20;                          // person: shoulder height, upper arm, forearm
  var RAIL = { a: 84, b: 316 };
  var T = 3.2, PERSON_S = 2, AUTO_S = 8;
  var manual = false, person = false;
  function setMode(p) { person = p; svg.classList.toggle('is-person', p); }
  var ease = function (u) { return u < .5 ? 2 * u * u : -1 + (4 - 2 * u) * u; };
  var lerp = function (a, b, u) { return { x: a.x + (b.x - a.x) * u, y: a.y + (b.y - a.y) * u }; };
  function arc(a, b, u, lift) { var e = ease(u); return { x: a.x + (b.x - a.x) * e, y: a.y + (b.y - a.y) * e - lift * Math.sin(Math.PI * e) }; }
  function hand(ph) {
    if (ph < .10) return { x: TRAY.x, y: TRAY.y - 6 * ease(ph / .10) };
    if (ph < .48) return arc({ x: TRAY.x, y: TRAY.y - 6 }, FIX, (ph - .10) / .38, 50);
    if (ph < .60) return FIX;
    return arc(FIX, TRAY, (ph - .60) / .40, 40);
  }
  function samplePos(ph, k) {
    if (ph < .48) return hand(ph);
    if (ph < .62) return FIX;
    if (ph < .72) return lerp(FIX, CHUTE, ease((ph - .62) / .10));
    if (ph < .82) return lerp(CHUTE, (k % 2) ? FAIL : PASS, ease((ph - .72) / .10));
    return null;
  }
  // two-link IK; `side` picks the elbow branch and stays fixed so the motion never jumps
  function ik(base, target, l1, l2, side) {
    var dx = target.x - base.x, dy = target.y - base.y;
    var d = Math.max(Math.abs(l1 - l2) + 1, Math.min(Math.hypot(dx, dy), l1 + l2 - 1));
    var a = Math.atan2(dy, dx), b = Math.acos((l1 * l1 + d * d - l2 * l2) / (2 * l1 * d));
    var th = a + side * b;
    return { x: base.x + l1 * Math.cos(th), y: base.y + l1 * Math.sin(th) };
  }
  function setLine(el, a, b) { el.setAttribute('x1', a.x); el.setAttribute('y1', a.y); el.setAttribute('x2', b.x); el.setAttribute('y2', b.y); }
  function draw(ph, k) {
    var h = hand(ph), sp = samplePos(ph, k);
    // robot
    var wrist = { x: h.x, y: h.y - 12 }, el = ik(BASE, wrist, L1, L2, 1);
    setLine(up, BASE, el); setLine(fore, el, wrist); elbow.setAttribute('cx', el.x); elbow.setAttribute('cy', el.y);
    grip.setAttribute('transform', 'translate(' + wrist.x + ',' + (wrist.y + 10) + ')');
    // person: stands just left of the work and walks with it
    var px = Math.max(104, Math.min(274, h.x - 16)), sh = { x: px, y: SH_Y };
    head.setAttribute('cx', px); head.setAttribute('cy', 172);
    setLine(body, { x: px, y: 180 }, { x: px, y: 222 });
    setLine(legA, { x: px, y: 222 }, { x: px - 8, y: 250 }); setLine(legB, { x: px, y: 222 }, { x: px + 8, y: 250 });
    var ph2 = { x: h.x, y: h.y - 5 }, el2 = ik(sh, ph2, A1, A2, 1);
    setLine(up2, sh, el2); setLine(fore2, el2, ph2);
    // gantry carriage + camera track the work; limit switches light at the ends
    var cx = RAIL.a + (RAIL.b - RAIL.a) * Math.max(0, Math.min(1, (h.x - TRAY.x) / (FIX.x - TRAY.x)));
    carriage.setAttribute('transform', 'translate(' + cx + ',64)');
    cone.setAttribute('d', 'M' + cx + ' 96 L' + (cx - 50) + ' 250 L' + (cx + 50) + ' 250 Z');
    lswA.setAttribute('opacity', cx < RAIL.a + 3 ? 1 : .25); lswB.setAttribute('opacity', cx > RAIL.b - 3 ? 1 : .25);
    if (sp) { sample.style.display = ''; sample.setAttribute('transform', 'translate(' + sp.x + ',' + sp.y + ')'); sample.setAttribute('fill', (ph >= .72 && (k % 2)) ? '#F0766B' : '#6FB3A8'); }
    else sample.style.display = 'none';
  }
  var reduced = (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) || document.documentElement.classList.contains('static');
  toggle.addEventListener('click', function () { manual = true; setMode(!person); });
  toggle.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); manual = true; setMode(!person); } });
  if (reduced) { setMode(false); draw(.30, 0); return; }
  var running = false, raf = 0, t0 = null;
  function tick(now) {
    if (!running) return; raf = requestAnimationFrame(tick);
    if (t0 === null) t0 = now; var t = (now - t0) / 1000;
    if (!manual) setMode((t % (PERSON_S + AUTO_S)) < PERSON_S);
    draw((t % T) / T, Math.floor(t / T));
  }
  function start() { if (running) return; running = true; t0 = null; raf = requestAnimationFrame(tick); }
  function stop() { running = false; cancelAnimationFrame(raf); }
  setMode(true); draw(0, 0);
  if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { en.forEach(function (e) { e.isIntersecting ? start() : stop(); }); }, { threshold: .15 }).observe(svg);
  else start();
})();

/* ---------- Applied Materials: crank-slider linkage driven with the gears ---------- */
(function () {
  var svg = document.getElementById('am-scene'); if (!svg) return;
  var g1 = document.getElementById('am-gear1'), g2 = document.getElementById('am-gear2'), link = document.getElementById('am-link'), slider = document.getElementById('am-slider');
  var C = { x: 78, y: 154 }, R = 9, L = 34, SX = 95;
  function draw(a) {
    g1.setAttribute('transform', 'rotate(' + (a * 180 / Math.PI) + ' 78 154)');
    g2.setAttribute('transform', 'rotate(' + (-a * 180 / Math.PI * 15 / 7) + ' 108 164)');
    var px = C.x + R * Math.cos(a), py = C.y + R * Math.sin(a);
    var sy = py - Math.sqrt(Math.max(0, L * L - (SX - px) * (SX - px)));
    link.setAttribute('x1', px); link.setAttribute('y1', py); link.setAttribute('x2', SX); link.setAttribute('y2', sy);
    slider.setAttribute('cy', sy);
  }
  var reduced = (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) || document.documentElement.classList.contains('static');
  draw(-Math.PI / 2);
  if (reduced) return;
  var running = false, raf = 0;
  function tick(now) { if (!running) return; raf = requestAnimationFrame(tick); draw((now / 1000) * 2 * Math.PI / 4); }
  function start() { if (running) return; running = true; raf = requestAnimationFrame(tick); }
  function stop() { running = false; cancelAnimationFrame(raf); }
  if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { en.forEach(function (e) { e.isIntersecting ? start() : stop(); }); }, { threshold: .15 }).observe(svg);
  else start();
})();

/* ---------- Applied Materials: rotating globe of fab sites ---------- */
(function () {
  var svg = document.getElementById('am-globe'); if (!svg) return;
  var NS = 'http://www.w3.org/2000/svg', CX = 150, CY = 118, R = 92, TILT = 18 * Math.PI / 180;
  var sites = [
    { n: 'Santa Clara · HQ', lat: 37.4, lon: -121.9, home: true, label: true },
    { n: 'Hillsboro · Intel', lat: 45.5, lon: -122.9, label: true }, { n: 'Boise', lat: 43.6, lon: -116.2 }, { n: 'Malta, NY', lat: 42.9, lon: -73.8 },
    { n: 'Dresden', lat: 51.0, lon: 13.7, label: true }, { n: 'Hsinchu · TSMC', lat: 24.8, lon: 121.0, label: true },
    { n: 'Korea · Samsung, SK hynix', lat: 37.2, lon: 127.2, label: true, dy: -6 },
    { n: 'Yokkaichi · Kioxia', lat: 35.0, lon: 136.6, label: true, dy: 11 }, { n: 'Shanghai', lat: 31.2, lon: 121.5 }, { n: 'Singapore', lat: 1.35, lon: 103.8 }, { n: 'Chandler', lat: 33.3, lon: -111.8 }
  ];
  var grat = document.getElementById('am-grat'), pts = document.getElementById('am-pts');
  function proj(lat, lon, phi) {
    var la = lat * Math.PI / 180, lo = lon * Math.PI / 180 - phi;
    var x = Math.cos(la) * Math.sin(lo), y = Math.sin(la), z = Math.cos(la) * Math.cos(lo);
    var y2 = y * Math.cos(TILT) - z * Math.sin(TILT), z2 = y * Math.sin(TILT) + z * Math.cos(TILT);
    return { x: CX + R * x, y: CY - R * y2, vis: z2 };
  }
  var meridians = [], parallels = [];
  for (var i = 0; i < 12; i++) { var pth = document.createElementNS(NS, 'path'); grat.appendChild(pth); meridians.push(pth); }
  for (var j = -60; j <= 60; j += 30) { var pp = document.createElementNS(NS, 'path'); grat.appendChild(pp); parallels.push({ el: pp, lat: j }); }
  var dots = sites.map(function (s) {
    var g = document.createElementNS(NS, 'g'); var c = document.createElementNS(NS, 'circle'); var t = document.createElementNS(NS, 'text');
    c.setAttribute('r', s.home ? 4 : 3); c.setAttribute('class', s.home ? 'f-sec' : 'f-acc');
    t.setAttribute('class', 'svg-t ink'); t.setAttribute('style', 'font-size:8.5px;paint-order:stroke;stroke:var(--g-surf);stroke-width:3px;stroke-linejoin:round'); t.textContent = s.label ? s.n : '';
    g.appendChild(c); g.appendChild(t); pts.appendChild(g); return { g: g, c: c, t: t, s: s };
  });
  function linePath(points) {
    var d = '', pen = false;
    points.forEach(function (p) { if (p.vis > 0) { d += (pen ? 'L' : 'M') + p.x.toFixed(1) + ' ' + p.y.toFixed(1); pen = true; } else pen = false; });
    return d;
  }
  function draw(phi) {
    meridians.forEach(function (el, k) { var lon = k * 30, arr = []; for (var la = -90; la <= 90; la += 6) arr.push(proj(la, lon, phi)); el.setAttribute('d', linePath(arr)); });
    parallels.forEach(function (o) { var arr = []; for (var lo = -180; lo <= 180; lo += 6) arr.push(proj(o.lat, lo, phi)); o.el.setAttribute('d', linePath(arr)); });
    dots.forEach(function (d) {
      var p = proj(d.s.lat, d.s.lon, phi), on = p.vis > 0.05;
      d.g.setAttribute('opacity', on ? Math.min(1, p.vis * 2.5) : 0);
      d.t.setAttribute('opacity', Math.max(0, Math.min(1, (p.vis - 0.45) * 4)));   // labels only while facing the viewer
      d.c.setAttribute('cx', p.x); d.c.setAttribute('cy', p.y);
      var right = p.x >= CX; d.t.setAttribute('x', p.x + (right ? 6 : -6));   // labels point outward, away from the globe centre
      d.t.setAttribute('y', p.y + (d.s.dy !== undefined ? d.s.dy : (d.s.home ? 11 : 3))); d.t.setAttribute('y', p.y + (d.s.dy !== undefined ? d.s.dy : (d.s.home ? 11 : 3))); d.t.setAttribute('text-anchor', right ? 'start' : 'end');
    });
  }
  var reduced = (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) || document.documentElement.classList.contains('static');
  draw(2.1);
  if (reduced) return;
  var running = false, raf = 0;
  function tick(now) { if (!running) return; raf = requestAnimationFrame(tick); draw(2.1 + now / 1000 * 2 * Math.PI / 28); }
  function start() { if (running) return; running = true; raf = requestAnimationFrame(tick); }
  function stop() { running = false; cancelAnimationFrame(raf); }
  if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { en.forEach(function (e) { e.isIntersecting ? start() : stop(); }); }, { threshold: .15 }).observe(svg);
  else start();
})();
