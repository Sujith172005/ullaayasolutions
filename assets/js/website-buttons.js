(function () {
  function init() {
    var buttons = document.querySelectorAll('#businesses .business-card .card-link, #home #slidePrimary, .business-page-hero .btn.btn-primary, .website-box .card-link');
    if (!buttons.length) return;
    var motion = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
    var timers = [];
    function phase(gold, duration) {
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].style.setProperty('transition-duration', duration + 'ms', 'important');
        if (gold) buttons[i].classList.add('website-gold-phase');
        else buttons[i].classList.remove('website-gold-phase');
      }
    }
    function cycle() {
      timers = [];
      timers.push(window.setTimeout(function () { phase(true, 900); }, 450));
      timers.push(window.setTimeout(function () { phase(false, 1200); }, 1800));
      timers.push(window.setTimeout(cycle, 3000));
    }
    function restart() {
      for (var i = 0; i < timers.length; i++) window.clearTimeout(timers[i]);
      timers = [];
      phase(false, 0);
      if (!motion.matches && !document.hidden) cycle();
    }
    if (motion.addEventListener) motion.addEventListener('change', restart);
    else if (motion.addListener) motion.addListener(restart);
    document.addEventListener('visibilitychange', restart);
    restart();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
