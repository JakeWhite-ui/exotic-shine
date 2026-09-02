/**
 * Scroll reveal: tiles rise and fade in as they come into view.
 *
 * Mark up with one of two attributes, both plain HTML — nothing here needs a
 * client component, so the grids stay server-rendered:
 *
 *     <div data-reveal>          one element, reveals on its own
 *     <ul data-reveal-items>     children reveal in sequence
 *
 * Inlined in the head rather than run after hydration, for the same reason as
 * `themeScript`: the CSS that hides these elements is gated on a class this
 * script adds, so if it ran later the page would paint everything, then hide
 * it, then animate it back. Doing it before first paint means the only state a
 * visitor ever sees is the intended one.
 *
 * Three things it deliberately handles:
 *
 *   - **No JavaScript, or a thrown error.** The hiding class never gets added,
 *     so every tile renders normally. Content is never hidden by a rule that
 *     nothing is left alive to undo.
 *   - **Reduced motion.** Returns before adding the class, so the whole
 *     feature is inert rather than instant-but-still-there.
 *   - **Client-side navigation.** next/link swaps the DOM without a fresh
 *     document, so a MutationObserver picks up tiles that arrive later. Without
 *     it, everything below the first page load would stay invisible forever.
 */
export const revealScript = `
(function(){
  var root = document.documentElement;
  try {
    if (!('IntersectionObserver' in window) || !('MutationObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    root.classList.add('reveal-on');

    var io = new IntersectionObserver(function(entries){
      for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        // The second clause catches a tile that got past without ever being
        // seen inside the viewport — a hard flick on a phone, or a jump to an
        // anchor. The observer reports only the latest state, which for those
        // is "above, and not intersecting"; without this they'd sit at
        // opacity 0 and the visitor would find a blank grid on scrolling back.
        if (!entry.isIntersecting && entry.boundingClientRect.top >= 0) continue;
        entry.target.classList.add('revealed');
        io.unobserve(entry.target);
      }
    }, {
      // Held back from the very bottom edge so a tile starts moving once it's
      // properly on screen, not while it's still a sliver.
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.08
    });

    var watch = function(scope){
      var found = scope.querySelectorAll('[data-reveal], [data-reveal-items]');
      for (var i = 0; i < found.length; i++) io.observe(found[i]);
    };

    var start = function(){
      // Its own try/catch because this can run a tick later, by which point
      // the outer one is long gone — and an error escaping here would strand
      // every tile on the page at opacity 0 with nothing left to undo it.
      try {
        watch(document);
        new MutationObserver(function(records){
          for (var i = 0; i < records.length; i++) {
            var added = records[i].addedNodes;
            for (var j = 0; j < added.length; j++) {
              if (added[j].nodeType === 1) watch(added[j]);
            }
          }
        }).observe(document.body, { childList: true, subtree: true });
      } catch (e) {
        root.classList.remove('reveal-on');
      }
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', start);
    } else {
      start();
    }
  } catch (e) {
    // Anything unexpected and the page goes back to being a plain page.
    root.classList.remove('reveal-on');
  }
})();
`;
