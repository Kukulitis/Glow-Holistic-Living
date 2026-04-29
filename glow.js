/* glow.js — Shared scripts · Harmony Living */

// Page transition overlay
const overlay = document.createElement('div');
overlay.style.cssText = 'position:fixed;inset:0;background:#F4F8FC;z-index:99999;opacity:1;transition:opacity 0.38s ease;pointer-events:none';
document.body.appendChild(overlay);
(document.fonts ? document.fonts.ready : Promise.resolve()).then(() => {
  requestAnimationFrame(() => { overlay.style.opacity = '0'; });
});

document.addEventListener('click', e => {
  const link = e.target.closest('a[href]');
  if (!link) return;
  const href = link.getAttribute('href');
  if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel') || link.target === '_blank') return;
  e.preventDefault();
  overlay.style.opacity = '1';
  setTimeout(() => { window.location.href = href; }, 400);
});

// Scroll reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale').forEach(el => revealObserver.observe(el));

// Nav compact on scroll
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 60), { passive: true });

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navUl = document.querySelector('nav ul');
if (navToggle && navUl) {
  navToggle.addEventListener('click', () => {
    navUl.classList.toggle('mobile-open');
    const spans = navToggle.querySelectorAll('span');
    const open = navUl.classList.contains('mobile-open');
    spans[0].style.transform = open ? 'translateY(6.5px) rotate(45deg)' : '';
    spans[1].style.opacity = open ? '0' : '';
    spans[2].style.transform = open ? 'translateY(-6.5px) rotate(-45deg)' : '';
  });
  document.addEventListener('click', e => {
    if (!nav.contains(e.target)) {
      navUl.classList.remove('mobile-open');
      navToggle.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });
}

// More dropdown
const navMore = document.querySelector('.nav-more');
if (navMore) {
  navMore.querySelector('.nav-more-trigger').addEventListener('click', e => {
    e.preventDefault(); e.stopPropagation();
    navMore.classList.toggle('open');
  });
  document.addEventListener('click', e => { if (!navMore.contains(e.target)) navMore.classList.remove('open'); });
}

// Cursor glow
const glow = document.createElement('div');
glow.className = 'cursor-glow';
document.body.appendChild(glow);
let glowX = window.innerWidth / 2, glowY = window.innerHeight / 2, currX = glowX, currY = glowY;
document.addEventListener('mousemove', e => { glowX = e.clientX; glowY = e.clientY; });
(function animateGlow() {
  currX += (glowX - currX) * 0.07;
  currY += (glowY - currY) * 0.07;
  glow.style.left = currX + 'px';
  glow.style.top = currY + 'px';
  requestAnimationFrame(animateGlow);
})();

// Button ripple
document.querySelectorAll('.btn-primary,.btn-outline,.btn-rose,.submit-btn,.nl-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    const r = btn.getBoundingClientRect();
    const size = Math.max(r.width, r.height);
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - r.left - size / 2}px;top:${e.clientY - r.top - size / 2}px`;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// ── PEEK CAT ──
(function(){
  const style = document.createElement('style');
  style.textContent = `
    #pcat-wrap{position:fixed;z-index:199;pointer-events:none;transform:translateX(-50%)}
    #pcat-inner{transform:translateY(-108%);will-change:transform;filter:drop-shadow(0 8px 20px rgba(30,58,95,0.22))}
    #pcat-inner svg{display:block;transform:rotate(180deg)}
    @keyframes pcat-blink{0%,100%{transform:scaleY(1)}46%,54%{transform:scaleY(0.06)}}
    #pcat-inner .peye{transform-box:fill-box;transform-origin:center}
    #pcat-inner.blink .peye{animation:pcat-blink 0.17s ease-in-out 2}
  `;
  document.head.appendChild(style);

  const wrap = document.createElement('div'); wrap.id = 'pcat-wrap';
  const inner = document.createElement('div'); inner.id = 'pcat-inner';
  inner.innerHTML = `<svg viewBox="0 0 100 90" width="100" height="90" xmlns="http://www.w3.org/2000/svg">
    <path d="M50,87 C25,87 11,71 11,54 C11,37 20,25 50,21 C80,25 89,37 89,54 C89,71 75,87 50,87Z" fill="#EDE8DC" stroke="#7A6A52" stroke-width="1.5"/>
    <path d="M19,40 L8,10 L36,26Z" fill="#EDE8DC" stroke="#7A6A52" stroke-width="1.5"/>
    <path d="M20,38 L12,16 L33,27Z" fill="#F2C0BC"/>
    <path d="M81,40 L92,10 L64,26Z" fill="#EDE8DC" stroke="#7A6A52" stroke-width="1.5"/>
    <path d="M80,38 L88,16 L67,27Z" fill="#F2C0BC"/>
    <path d="M26,30 L22,40" stroke="#C0A888" stroke-width="1" fill="none" opacity="0.5"/>
    <path d="M33,24 L30,33" stroke="#C0A888" stroke-width="1" fill="none" opacity="0.4"/>
    <path d="M74,30 L78,40" stroke="#C0A888" stroke-width="1" fill="none" opacity="0.5"/>
    <path d="M67,24 L70,33" stroke="#C0A888" stroke-width="1" fill="none" opacity="0.4"/>
    <ellipse cx="34" cy="51" rx="11" ry="9.5" fill="white" stroke="#7A6A52" stroke-width="1.2"/>
    <ellipse cx="66" cy="51" rx="11" ry="9.5" fill="white" stroke="#7A6A52" stroke-width="1.2"/>
    <ellipse class="peye" cx="34" cy="51" rx="8.5" ry="8.5" fill="#4A7FB5"/>
    <ellipse class="peye" cx="66" cy="51" rx="8.5" ry="8.5" fill="#4A7FB5"/>
    <ellipse class="peye" cx="34" cy="51" rx="2.8" ry="8" fill="#1A2E4A"/>
    <ellipse class="peye" cx="66" cy="51" rx="2.8" ry="8" fill="#1A2E4A"/>
    <circle cx="38" cy="47" r="2.5" fill="white" opacity="0.95"/>
    <circle cx="70" cy="47" r="2.5" fill="white" opacity="0.95"/>
    <circle cx="31" cy="55" r="1.2" fill="white" opacity="0.5"/>
    <circle cx="63" cy="55" r="1.2" fill="white" opacity="0.5"/>
    <path d="M47,62 Q50,59 53,62 L51.5,65.5 Q50,66.5 48.5,65.5Z" fill="#E8A0B0" stroke="#CC7080" stroke-width="1"/>
    <line x1="50" y1="65" x2="50" y2="69" stroke="#9B8070" stroke-width="1.2"/>
    <path d="M44,70 Q50,76 56,70" fill="none" stroke="#9B8070" stroke-width="1.5" stroke-linecap="round"/>
    <circle cx="31" cy="66" r="1.4" fill="#9B8070" opacity="0.55"/>
    <circle cx="27" cy="71" r="1.4" fill="#9B8070" opacity="0.55"/>
    <circle cx="69" cy="66" r="1.4" fill="#9B8070" opacity="0.55"/>
    <circle cx="73" cy="71" r="1.4" fill="#9B8070" opacity="0.55"/>
    <line x1="1" y1="62" x2="39" y2="66" stroke="#D0C0A0" stroke-width="0.9"/>
    <line x1="1" y1="68" x2="39" y2="68" stroke="#D0C0A0" stroke-width="0.9"/>
    <line x1="1" y1="74" x2="39" y2="71" stroke="#D0C0A0" stroke-width="0.9"/>
    <line x1="61" y1="66" x2="99" y2="62" stroke="#D0C0A0" stroke-width="0.9"/>
    <line x1="61" y1="68" x2="99" y2="68" stroke="#D0C0A0" stroke-width="0.9"/>
    <line x1="61" y1="71" x2="99" y2="74" stroke="#D0C0A0" stroke-width="0.9"/>
  </svg>`;
  wrap.appendChild(inner);
  document.body.appendChild(wrap);

  let busy = false;
  function peekCat(linkEl) {
    if (busy) return; busy = true;
    const rect = linkEl.getBoundingClientRect();
    const navEl = document.querySelector('nav');
    const navBottom = navEl ? navEl.getBoundingClientRect().bottom : 68;
    const cx = Math.max(54, Math.min(window.innerWidth - 54, rect.left + rect.width / 2));
    wrap.style.left = cx + 'px';
    wrap.style.top = navBottom + 'px';
    inner.style.transition = 'transform 0.52s cubic-bezier(0.34,1.56,0.64,1)';
    inner.style.transform = 'translateY(0)';
    setTimeout(() => inner.classList.add('blink'), 580);
    setTimeout(() => inner.classList.remove('blink'), 960);
    setTimeout(() => {
      inner.style.transition = 'transform 0.4s cubic-bezier(0.6,0,0.8,0.45)';
      inner.style.transform = 'translateY(-108%)';
      setTimeout(() => { busy = false; }, 420);
    }, 1900);
  }

  const cur = location.pathname.split('/').pop() || 'home.html';
  document.addEventListener('click', e => {
    const link = e.target.closest('nav a[href]');
    if (!link) return;
    if (link.getAttribute('href') === cur) { e.stopPropagation(); e.preventDefault(); peekCat(link); }
  }, true);
})();
