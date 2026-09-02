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
 * **This used to be an IntersectionObserver and isn't any more.** The observer
 * reports the state of a target at the moment it gets a rendering opportunity,
 * not every transition the target went through — so a tile scrolled past
 * between two of those opportunities is only ever reported as "not
 * intersecting", and stays at opacity 0 for good. Reading `boundingClientRect`
 * to spot targets that had gone past helped, but only for tiles the observer
 * reported on at all; three of the five grids on the live homepage were still
 * blank after a fast scroll. A rAF-throttled sweep can't miss one, because it
 * asks where things are now rather than waiting to be told.
 *
 * The cost is a scroll listener, which is what observers exist to avoid — but
 * it measures at most a dozen elements, only on frames where the page actually
 * scrolled, and it removes itself the moment the last tile has been revealed.
 *
 * Three other things it handles deliberately:
 *
 *   - **No JavaScript, or a thrown error.** The hiding class never gets added,
 *     so every tile renders normally. Content is never hidden by a rule that
 *     nothing is left alive to undo.
 *   - **Reduced motion.** Returns before adding the class, so the whole
 *     feature is inert rather than instant-but-still-there.
 *   - **Client-side navigation.** next/link swaps the DOM without a fresh
 *     document, so a MutationObserver picks up tiles that arrive later. Without
 *     it, everything past the first page load would stay invisible.
 */
export const revealScript = `
(function(){
  var root = document.documentElement;
  try {
    if (!('MutationObserver' in window) || !('requestAnimationFrame' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    root.classList.add('reveal-on');

    var pending = [];
    var queued = false;
    var listening = false;

    var sweep = function(){
      queued = false;
      // Trigger a little before the bottom edge, so a tile is properly on
      // screen when it starts moving rather than a sliver of it. Anything with
      // a negative top has been scrolled past and is revealed on the same
      // test — no separate branch, and nothing can slip between two states.
      var line = window.innerHeight * 0.9;
      for (var i = pending.length - 1; i >= 0; i--) {
        if (pending[i].getBoundingClientRect().top < line) {
          pending[i].classList.add('revealed');
          pending.splice(i, 1);
        }
      }
      if (!pending.length && listening) {
        window.removeEventListener('scroll', request);
        window.removeEventListener('resize', request);
        listening = false;
      }
    };

    var request = function(){
      if (queued) return;
      queued = true;
      window.requestAnimationFrame(sweep);
    };

    var watch = function(scope){
      var found = scope.querySelectorAll('[data-reveal], [data-reveal-items]');
      for (var i = 0; i < found.length; i++) {
        if (found[i].className.indexOf('revealed') === -1) pending.push(found[i]);
      }
      if (!pending.length) return;
      if (!listening) {
        window.addEventListener('scroll', request, { passive: true });
        window.addEventListener('resize', request);
        listening = true;
      }
      request();
    };

    var start = function(){
      // Its own try/catch: this can run a tick later, by which point the outer
      // one is long gone, and an error escaping here would strand every tile
      // on the page at opacity 0 with nothing left to undo it.
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

        // Late images and fonts change where everything sits, so re-measure
        // once the page has finished settling.
        window.addEventListener('load', request);
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
