// Responsive Navbar Toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// Typing effect in hero section
const typingText = "Chitranshu Jain";
const typingTarget = document.getElementById("typing");
let i = 0, forward = true;
function typeEffect() {
  if (!typingTarget) return;
  if (forward) {
    if (i <= typingText.length) {
      typingTarget.textContent = typingText.slice(0, i);
      i++;
      setTimeout(typeEffect, 120);
    } else {
      forward = false;
      setTimeout(typeEffect, 1000);
    }
  } else {
    if (i > 0) {
      typingTarget.textContent = typingText.slice(0, i - 1);
      i--;
      setTimeout(typeEffect, 60);
    } else {
      forward = true;
      setTimeout(typeEffect, 600);
    }
  }
}

// Typing effect for About Me section
const aboutText = "I'm a B.Tech AI & Data Science student and web developer passionate about building beautiful, accessible, and high-performance web applications.";
const aboutTypingTarget = document.getElementById("about-typing");
let j = 0;
function aboutTypeEffect() {
  if (!aboutTypingTarget) return;
  if (j <= aboutText.length) {
    aboutTypingTarget.textContent = aboutText.slice(0, j);
    j++;
    setTimeout(aboutTypeEffect, 22);
  }
}

// DOMContentLoaded: Initialize effects
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(typeEffect, 600);
  setTimeout(aboutTypeEffect, 900);

  // Theme toggle
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light-theme");
    });
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      document.body.classList.add("light-theme");
    }
  }

  // Scrollspy highlight
  const navLinksEls = document.querySelectorAll('.nav-links a');
  const sections = Array.from(document.querySelectorAll('.section, .section-skills, .section-edu'));
  function scrollSpy() {
    let current = "home";
    sections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= 120 && rect.bottom > 120) {
        current = sec.id;
      }
    });
    navLinksEls.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  }
  window.addEventListener('scroll', scrollSpy);
  scrollSpy();

  // Smooth scroll on nav click
  navLinksEls.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // Skills auto-cycle & hover/focus
  const skillCards = Array.from(document.querySelectorAll('.skill-card'));
  let skillIndex = 0;
  let skillInterval;
  function cycleSkills() {
    skillCards.forEach((card, idx) => {
      card.classList.toggle('active-skill', idx === skillIndex);
    });
    skillIndex = (skillIndex + 1) % skillCards.length;
  }
  if (skillCards.length) {
    cycleSkills();
    skillInterval = setInterval(cycleSkills, 1000);
    skillCards.forEach((card, idx) => {
      card.addEventListener('mouseenter', () => {
        clearInterval(skillInterval);
        skillCards.forEach(c => c.classList.remove('active-skill'));
        card.classList.add('active-skill');
      });
      card.addEventListener('mouseleave', () => {
        cycleSkills();
        skillInterval = setInterval(cycleSkills, 1000);
      });
      card.addEventListener('focus', () => {
        clearInterval(skillInterval);
        skillCards.forEach(c => c.classList.remove('active-skill'));
        card.classList.add('active-skill');
      });
      card.addEventListener('blur', () => {
        cycleSkills();
        skillInterval = setInterval(cycleSkills, 1000);
      });
    });
  }

  // Education cards auto-cycle & hover/focus
  const eduCards = Array.from(document.querySelectorAll('.edu-card'));
  let eduIndex = 0;
  let eduInterval;
  function cycleEdu() {
    eduCards.forEach((card, idx) => {
      card.classList.toggle('active-edu', idx === eduIndex);
    });
    eduIndex = (eduIndex + 1) % eduCards.length;
  }
  if (eduCards.length) {
    cycleEdu();
    eduInterval = setInterval(cycleEdu, 1000);
    eduCards.forEach((card, idx) => {
      card.addEventListener('mouseenter', () => {
        clearInterval(eduInterval);
        eduCards.forEach(c => c.classList.remove('active-edu'));
        card.classList.add('active-edu');
      });
      card.addEventListener('mouseleave', () => {
        cycleEdu();
        eduInterval = setInterval(cycleEdu, 1000);
      });
      card.addEventListener('focus', () => {
        clearInterval(eduInterval);
        eduCards.forEach(c => c.classList.remove('active-edu'));
        card.classList.add('active-edu');
      });
      card.addEventListener('blur', () => {
        cycleEdu();
        eduInterval = setInterval(cycleEdu, 1000);
      });
    });
  }
});
