(() => {
  document.querySelectorAll('[data-dr-year]').forEach(el => { el.textContent = String(new Date().getFullYear()); });

  // Target videos are optional. Empty sources leave the designed placeholder visible.
  document.querySelectorAll('[data-structure-video]').forEach(video => {
    if (!(video instanceof HTMLVideoElement) || !video.dataset.src) return;
    const panel = video.closest('[data-target-panel]');
    const placeholder = panel?.querySelector('[data-structure-placeholder]');
    let loaded = false;
    video.addEventListener('loadedmetadata', () => {
      video.hidden = false;
      if (placeholder instanceof HTMLElement) placeholder.hidden = true;
    });
    video.addEventListener('error', () => {
      video.hidden = true;
      if (placeholder instanceof HTMLElement) {
        placeholder.hidden = false;
        const status = placeholder.querySelector('[data-structure-status]');
        if (status) status.textContent = 'Structure video currently unavailable';
      }
    });
    const load = () => {
      if (loaded) return;
      loaded = true;
      video.preload = 'metadata';
      video.src = video.dataset.src;
      video.load();
    };
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) load(); else video.pause();
      }, {rootMargin: '200px'}).observe(panel || video);
    } else load();
  });

  const video = document.querySelector('[data-dr-video]');
  const button = document.querySelector('[data-dr-motion]');
  if (!(video instanceof HTMLVideoElement) || !(button instanceof HTMLButtonElement)) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  let userPaused = false;
  let inView = true;
  const setButton = () => {
    const label = button.querySelector('[data-dr-motion-label]');
    const icon = button.querySelector('[data-dr-motion-icon]');
    if (label) label.textContent = video.paused ? 'Play motion' : 'Pause motion';
    if (icon) icon.textContent = video.paused ? '▶' : 'Ⅱ';
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
