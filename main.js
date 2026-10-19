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
