// =====================================================================
// TETAPAN WHATSAPP: tukar di sini sahaja.
// Format Malaysia: 601XXXXXXXX (tanpa +, sengkang atau ruang).
// Nombor rasmi: Signboard Expert / NMK Maju Resources 017-975 3629
// =====================================================================
const WHATSAPP_NUMBER = '60179753629';
const DEFAULT_MESSAGE = 'Assalamualaikum Signboard Expert, saya nak minta sebut harga.';

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Pautan WhatsApp ---------- */
(function setupWhatsApp(){
  if (!/^60\d{9,11}$/.test(WHATSAPP_NUMBER)) {
    console.warn('NMK: WHATSAPP_NUMBER tidak sah. Sila kemas kini dalam js/main.js.');
    return;
  }
  $$('.wa-link').forEach(link => {
    const msg = link.dataset.message || DEFAULT_MESSAGE;
    link.href = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(msg);
  });
})();

/* ---------- Tahun footer ---------- */
const yearEl = $('#year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ---------- Navigasi ---------- */
const topbar = $('#topbar');
const menuBtn = $('#menu-btn');
const siteNav = $('#site-nav');
const hero = $('#utama');
const waFloat = $('#wa-float');
const progressBar = $('#progress-bar');
let pastHero = false;

function onScroll(){
  const y = window.scrollY;
  topbar.classList.toggle('solid', y > 40 || siteNav.classList.contains('open'));
  pastHero = y > hero.offsetHeight * 0.6;
  waFloat.classList.toggle('show', pastHero);
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';
}

function setMenu(open){
  siteNav.classList.toggle('open', open);
  document.body.classList.toggle('menu-open', open);
  menuBtn.setAttribute('aria-expanded', String(open));
  $('.menu-label', menuBtn).textContent = open ? 'Tutup' : 'Menu';
  onScroll();
}
menuBtn.addEventListener('click', () => setMenu(!siteNav.classList.contains('open')));
$$('a', siteNav).forEach(a => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && siteNav.classList.contains('open')) { setMenu(false); menuBtn.focus(); }
});
window.matchMedia('(min-width: 1024px)').addEventListener('change', e => { if (e.matches) setMenu(false); });

/* ---------- Penunjuk babak ---------- */
(function setupScenes(){
  const links = $$('#scenes a');
  if (!('IntersectionObserver' in window) || !links.length) return;
  const map = new Map(links.map(a => [a.dataset.target, a]));
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(a => a.classList.remove('active'));
      const link = map.get(entry.target.id);
      if (link) link.classList.add('active');
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  $$('.scene').forEach(s => obs.observe(s));
})();

/* ---------- Animasi skrol + kiraan nombor ---------- */
function countUp(el){
  const target = parseInt(el.dataset.count, 10);
  const width = el.textContent.trim().length;
  const fmt = n => String(n).padStart(width, '0');
  if (reduceMotion || isNaN(target)) return;
  const start = performance.now();
  const duration = 1400;
  const tick = now => {
    const p = Math.min((now - start) / duration, 1);
    el.textContent = fmt(Math.round(target * (1 - Math.pow(1 - p, 3))));
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

if ('IntersectionObserver' in window) {
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      $$('[data-count]', entry.target).forEach(countUp);
      if (entry.target.matches('[data-count]')) countUp(entry.target);
      revealObs.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  $$('.reveal, .reveal-img').forEach(el => revealObs.observe(el));
} else {
  $$('.reveal, .reveal-img').forEach(el => el.classList.add('visible'));
}

/* ---------- Slider pembinaan mendatar ---------- */
(function setupReel(){
  const track = $('#reel-track');
  if (!track) return;
  const slides = $$('.slide', track);
  const prev = $('#reel-prev');
  const next = $('#reel-next');
  const current = $('#reel-current');
  const bar = $('#reel-bar');
  const pad = n => String(n).padStart(2, '0');
  $('#reel-total').textContent = pad(slides.length);
  let index = 0;

  const startOffset = () => parseFloat(getComputedStyle(track).scrollPaddingInlineStart) || 0;

  function nearestIndex(){
    const max = track.scrollWidth - track.clientWidth;
    if (track.scrollLeft >= max - 4) return slides.length - 1;
    const left = track.scrollLeft + startOffset();
    let best = 0, bestDist = Infinity;
    slides.forEach((s, i) => {
      const d = Math.abs(s.offsetLeft - left);
      if (d < bestDist) { bestDist = d; best = i; }
    });
    return best;
  }

  function render(){
    index = nearestIndex();
    slides.forEach((s, i) => s.classList.toggle('is-active', i === index));
    current.textContent = pad(index + 1);
    bar.style.transform = 'scaleX(' + (index + 1) / slides.length + ')';
    prev.disabled = index === 0;
    next.disabled = index === slides.length - 1;
  }

  function goTo(i){
    i = Math.max(0, Math.min(slides.length - 1, i));
    track.scrollTo({ left: slides[i].offsetLeft - startOffset(), behavior: reduceMotion ? 'auto' : 'smooth' });
  }

  let ticking = false;
  track.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { render(); ticking = false; });
  }, { passive: true });
  prev.addEventListener('click', () => goTo(index - 1));
  next.addEventListener('click', () => goTo(index + 1));
  track.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { e.preventDefault(); goTo(index + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(index - 1); }
  });
  window.addEventListener('resize', render);

  // Seret dengan tetikus (desktop)
  let dragging = false, startX = 0, startScroll = 0, moved = 0;
  track.addEventListener('pointerdown', e => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    dragging = true; moved = 0;
    startX = e.clientX; startScroll = track.scrollLeft;
  });
  window.addEventListener('pointermove', e => {
    if (!dragging) return;
    const dx = e.clientX - startX;
    moved = Math.max(moved, Math.abs(dx));
    if (moved > 4) track.classList.add('dragging');
    track.scrollLeft = startScroll - dx;
  });
  window.addEventListener('pointerup', () => {
    if (!dragging) return;
    dragging = false;
    if (!track.classList.contains('dragging')) return;
    const dir = track.scrollLeft - startScroll;
    track.classList.remove('dragging');
    const base = nearestIndex();
    goTo(Math.abs(dir) > 60 && base === index ? index + Math.sign(dir) : base);
  });

  render();
})();

onScroll();
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll);
