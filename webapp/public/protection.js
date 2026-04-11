(function () {
  'use strict';

  const email = (window.__USER_EMAIL__ || '').trim();
  const name  = (window.__USER_NAME__  || '').trim();
  const label = name && name !== email ? name + ' \u00B7 ' + email : email;

  // ── 1. WATERMARK ──────────────────────────────────────────────────────────
  function buildWatermarkDataUrl() {
    const W = 420, H = 200, dpr = Math.min(window.devicePixelRatio || 1, 2);
    const c = document.createElement('canvas');
    c.width  = W * dpr;
    c.height = H * dpr;
    const ctx = c.getContext('2d');
    ctx.scale(dpr, dpr);
    ctx.save();
    ctx.translate(W / 2, H / 2);
    ctx.rotate(-28 * Math.PI / 180);
    ctx.font = '13px Arial, sans-serif';
    ctx.fillStyle = 'rgba(0,0,0,0.07)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, 0, 0);
    ctx.restore();
    return c.toDataURL();
  }

  function applyWatermark() {
    let wm = document.getElementById('__umely_wm__');
    if (!wm) {
      wm = document.createElement('div');
      wm.id = '__umely_wm__';
      wm.setAttribute('aria-hidden', 'true');
      document.body.appendChild(wm);
    }
    const url = buildWatermarkDataUrl();
    wm.style.cssText =
      'position:fixed;top:0;left:0;right:0;bottom:0;' +
      'background-image:url(' + url + ');background-repeat:repeat;' +
      'pointer-events:none;z-index:2147483647;user-select:none;' +
      'mix-blend-mode:multiply;';
  }

  // ── 2. PRINT BLOCK ────────────────────────────────────────────────────────
  var ps = document.createElement('style');
  ps.textContent =
    '@media print{' +
      'body>*{visibility:hidden!important;display:none!important}' +
      'body::after{' +
        'visibility:visible!important;display:block!important;' +
        'content:"Afdrukken is niet toegestaan voor beschermde leerinhoud.";' +
        'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);' +
        'font-size:20px;font-family:Arial,sans-serif;color:#333;' +
        'text-align:center;max-width:400px;line-height:1.5' +
      '}' +
    '}';
  document.head.appendChild(ps);

  // ── 3. RIGHT-CLICK / SELECT / COPY — alleen binnen lesinhoud ──────────────
  function isLessonContent(el) {
    return !!(el && el.closest && (
      el.closest('.screen') ||
      el.closest('#app') ||
      el.closest('.module-wrapper') ||
      el.closest('#module-content')
    ));
  }

  document.addEventListener('contextmenu', function (e) {
    if (isLessonContent(e.target)) e.preventDefault();
  }, true);

  document.addEventListener('selectstart', function (e) {
    if (isLessonContent(e.target)) e.preventDefault();
  }, true);

  document.addEventListener('copy', function (e) {
    if (isLessonContent(e.target)) e.preventDefault();
  }, true);

  // ── 4. DEVTOOLS DETECTIE ──────────────────────────────────────────────────
  var _devOpen = false;
  var _blurTarget = null;

  function getBlurTarget() {
    return document.getElementById('app') ||
           document.querySelector('.module-wrapper') ||
           document.body;
  }

  function setBlur(open) {
    if (open === _devOpen) return;
    _devOpen = open;
    if (!_blurTarget) _blurTarget = getBlurTarget();
    if (open) {
      _blurTarget.style.filter     = 'blur(10px)';
      _blurTarget.style.userSelect = 'none';
    } else {
      _blurTarget.style.filter     = '';
      _blurTarget.style.userSelect = '';
    }
  }

  function checkDevtools() {
    var wDiff = window.outerWidth  - window.innerWidth;
    var hDiff = window.outerHeight - window.innerHeight;
    // >200px verschil = devtools waarschijnlijk open (docked)
    setBlur(wDiff > 200 || hDiff > 200);
  }

  setInterval(checkDevtools, 800);

  // ── INIT ──────────────────────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      _blurTarget = getBlurTarget();
      applyWatermark();
    });
  } else {
    _blurTarget = getBlurTarget();
    applyWatermark();
  }

  // Herlaad watermark bij terugkeer naar tabblad
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden) applyWatermark();
  });

  // Herlaad watermark bij route-changes (hash/popstate)
  window.addEventListener('hashchange', applyWatermark);
  window.addEventListener('popstate',   applyWatermark);

}());
