/**
 * Assembles obfuscated email and phone elements at runtime.
 * Bots reading raw HTML see nothing — content is assembled from
 * base64-encoded data attributes only after JS executes.
 *
 * Supports two modes for email links:
 *   - Normal:    sets href AND textContent (assembled address or data-label)
 *   - Icon-only: sets href only, leaves innerHTML untouched (preserves SVG icon)
 *                Indicated by data-icon-only="true" on the element.
 */
(function () {
  // ── Email links ───────────────────────────────────────────────────────────
  document.querySelectorAll('a.obf-email').forEach(function(el) {
    try {
      var user   = atob(el.dataset.u);
      var domain = atob(el.dataset.d);
      var addr   = user + '@' + domain;
      var label  = el.dataset.label ? atob(el.dataset.label) : addr;

      el.href = 'mailto:' + addr;

      if (el.dataset.iconOnly !== 'true') {
        el.textContent = label;
      }
      // Icon-only: href is set, innerHTML (the SVG) is left untouched
    } catch (_) {}
  });

  // ── Phone spans ───────────────────────────────────────────────────────────
  document.querySelectorAll('span.obf-phone').forEach(function(el) {
    try {
      var parts = JSON.parse(atob(el.dataset.parts));
      var sep   = atob(el.dataset.sep);
      el.textContent = parts.join(sep);
    } catch (_) {}
  });
})();
