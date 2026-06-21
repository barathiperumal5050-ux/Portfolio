// script.js — Bharathi Portfolio

// 1. CUSTOM CURSOR
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
  setTimeout(() => {
    follower.style.left = e.clientX + 'px';
    follower.style.top  = e.clientY + 'px';
  }, 80);
});
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(2.5)';
    follower.style.borderColor = 'rgba(245,158,11,0.8)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    follower.style.borderColor = 'rgba(245,158,11,0.4)';
  });
});

// 2. TYPING EFFECT
const roles = [
  '// AI & Data Science Student',
  '// Full Stack Developer',
  '// UI/UX Enthusiast',
  '// Problem Solver',
];
let ri = 0, ci = 0, deleting = false;
const el = document.getElementById('typed');
function type() {
  const cur = roles[ri];
  el.textContent = deleting ? cur.substring(0, ci--) : cur.substring(0, ci++);
  let spd = deleting ? 40 : 65;
  if (!deleting && ci === cur.length + 1) { deleting = true; spd = 1800; }
  else if (deleting && ci === 0) { deleting = false; ri = (ri + 1) % roles.length; spd = 400; }
  setTimeout(type, spd);
}
setTimeout(type, 1000);

// 3. BUBBLE MOUSE PARALLAX
const bubbles = document.querySelectorAll('.bubble');
document.addEventListener('mousemove', (e) => {
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  const dx = (e.clientX - cx) / cx;
  const dy = (e.clientY - cy) / cy;
  bubbles.forEach((b, i) => {
    const depth = (i % 3 + 1) * 6;
    b.style.transform = `translate(${dx * depth}px, ${dy * depth}px)`;
  });
});

// 4. SCROLL REVEAL
const cards = document.querySelectorAll('.proj-card');
const obs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 150);
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
cards.forEach(c => obs.observe(c));

// 5. ACTIVE NAV
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 160) current = s.id; });
  navLinks.forEach(l => {
    l.style.color = '';
    if (l.getAttribute('href') === '#' + current) l.style.color = '#faf8f4';
  });
  document.getElementById('navbar').style.background =
    window.scrollY > 60 ? 'rgba(14,12,10,0.98)' : 'rgba(14,12,10,0.9)';
});

// 6. SMOOTH SCROLL
navLinks.forEach(l => {
  l.addEventListener('click', e => {
    const h = l.getAttribute('href');
    if (h.startsWith('#')) { e.preventDefault(); document.querySelector(h)?.scrollIntoView({ behavior: 'smooth' }); }
  });
});
