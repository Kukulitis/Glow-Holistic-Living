/* glow.js — Shared scripts · Glow Holistic Living */

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
