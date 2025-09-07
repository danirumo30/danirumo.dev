// toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

// sections and nav links
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');
const visibility = new Map();

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute('id');
    visibility.set(id, entry.intersectionRatio);

    if (entry.intersectionRatio > 0.01) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show');
    }
  });

  let maxId = null, maxRatio = 0;
  visibility.forEach((ratio, id) => {
    if (ratio > maxRatio) { maxRatio = ratio; maxId = id; }
  });
  if (maxRatio > 0 && maxId) {
    navLinks.forEach(link => link.classList.remove('active'));
    const active = document.querySelector(`header nav a[href*=${maxId}]`);
    if (active) active.classList.add('active');
  }
}, { threshold: [0, 0.01, 0.25, 0.5, 0.75, 1] });

sections.forEach(s => observer.observe(s));

// sticky header + close menu on scroll
window.addEventListener('scroll', () => {
  let header = document.querySelector('header');
  header.classList.toggle('sticky', window.scrollY > 100);
  menuIcon.classList.remove('bx-x');
  navbar.classList.remove('active');
});