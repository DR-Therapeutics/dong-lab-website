(() => {
  const header = document.querySelector('[data-dr-header]');
  if (header && header.dataset.ready !== 'true') {
    const toggle = header.querySelector('.dr-menu-toggle');
    const menu = header.querySelector('.dr-menu');
    const closeMenu = () => { header.dataset.menuOpen = 'false'; toggle?.setAttribute('aria-expanded', 'false'); };
    toggle?.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      header.dataset.menuOpen = String(open);
      toggle.setAttribute('aria-expanded', String(open));
    });
    menu?.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
    document.addEventListener('click', event => { if (!header.contains(event.target)) closeMenu(); });
    header.addEventListener('keydown', event => {
      if (event.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') { closeMenu(); toggle.focus(); }
    });
    header.addEventListener('focusout', () => requestAnimationFrame(() => { if (!header.contains(document.activeElement)) closeMenu(); }));
    matchMedia('(max-width:1100px)').addEventListener('change', closeMenu);
    closeMenu(); header.dataset.ready = 'true';
  }
  document.querySelectorAll('[data-dr-year]').forEach(el => { el.textContent = String(new Date().getFullYear()); });
  const video = document.querySelector('[data-dr-video]');
  const button = document.querySelector('[data-dr-motion]');
  if (!(video instanceof HTMLVideoElement) || !(button instanceof HTMLButtonElement)) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  let userPaused = false;
  let inView = true;
  const setButton = () => {
    button.querySelector('[data-dr-motion-label]').textContent = video.paused ? 'Play motion' : 'Pause motion';
    button.querySelector('[data-dr-motion-icon]').textContent = video.paused ? '▶' : 'Ⅱ';
    button.setAttribute('aria-label', video.paused ? 'Play background animation' : 'Pause background animation');
  };
  const play = async () => {
    if (!video.getAttribute('src')) { video.src = video.dataset.src; video.load(); }
    video.muted = true;
    try { await video.play(); } catch { setButton(); }
  };
  video.addEventListener('playing', () => { video.dataset.playing = 'true'; setButton(); });
  video.addEventListener('pause', setButton);
  video.addEventListener('error', () => { video.dataset.playing = 'false'; button.hidden = true; });
  button.addEventListener('click', () => { userPaused = !video.paused; if (userPaused) video.pause(); else play(); });
  const preference = () => {
    if (reduce.matches) { video.pause(); video.dataset.playing = 'false'; }
    else if (!userPaused && inView && !document.hidden) play();
    setButton();
  };
  reduce.addEventListener('change', preference);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      inView = entries[0].isIntersecting;
      if (!inView) video.pause(); else if (!userPaused && !reduce.matches && !document.hidden) play();
    }, {threshold: 0.05}).observe(video.closest('.dr-hero'));
  }
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) video.pause(); else if (inView && !userPaused && !reduce.matches) play();
  });
  button.hidden = false;
  preference();
})();
