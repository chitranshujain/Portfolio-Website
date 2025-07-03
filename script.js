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
const aboutText = "I’m a first-year B.Tech student in Artificial Intelligence & Data Sciene passionate about programming, web development, and problem solving.I enjoy learning new technologies, working on real-world projects, and continuously improving my problem-solving skills.I believe in staying curious, consistent, and creative in everything I do.";
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

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => document.body.classList.add("loaded"), 80);
  setTimeout(typeEffect, 600);
  setTimeout(aboutTypeEffect, 900);

  // Theme toggle
  const themeToggle = document.getElementById("themeToggle");
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    themeToggle.innerHTML = document.body.classList.contains("light-theme")
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-solid fa-moon"></i>';
  });
  if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    document.body.classList.add("light-theme");
    themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
  }

  // Smooth scroll with navbar offset
  function smoothScrollWithOffset(targetId) {
    const target = document.getElementById(targetId);
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    if (target) {
      const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight - 10;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        smoothScrollWithOffset(href.slice(1));
      }
    });
  });

  // Scrollspy highlight
  const sections = Array.from(document.querySelectorAll('.section'));
  function scrollSpy() {
    let current = "home";
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    sections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= navbarHeight + 30 && rect.bottom > navbarHeight + 30) {
        current = sec.id;
      }
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  }
  window.addEventListener('scroll', scrollSpy);
  scrollSpy();

  // Contact form validation + success animation
  const contactForm = document.getElementById("contact-form");
  const formMessage = document.getElementById("form-message");
  if (contactForm && formMessage) {
    contactForm.addEventListener("submit", e => {
      e.preventDefault();
      const name = contactForm.name.value.trim();
      const email = contactForm.email.value.trim();
      const message = contactForm.message.value.trim();
      if (!name || !/\S+@\S+\.\S+/.test(email) || !message) {
        formMessage.textContent = "Please fill all fields with valid information.";
        formMessage.style.color = "#ff4b4b";
        contactForm.classList.remove("contact-success");
        contactForm.classList.add("contact-error");
        setTimeout(() => contactForm.classList.remove("contact-error"), 800);
        return;
      }
      formMessage.textContent = "Your message has been sent! Thank you.";
      formMessage.style.color = "var(--accent)";
      contactForm.reset();
      contactForm.classList.remove("contact-error");
      contactForm.classList.add("contact-success");
      setTimeout(() => {
        formMessage.textContent = "";
        contactForm.classList.remove("contact-success");
      }, 1200);
    });
  }

  // About image animation on scroll
  const aboutImg = document.querySelector('.about-img');
  function animateAboutImg() {
    if (!aboutImg) return;
    const rect = aboutImg.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) {
      aboutImg.classList.add('visible');
      window.removeEventListener('scroll', animateAboutImg);
    }
  }
  window.addEventListener('scroll', animateAboutImg);
  animateAboutImg();

  // --- Auto-cycle & hover/focus for skills ---
  const skillCards = Array.from(document.querySelectorAll('.skill-card'));
  let skillIndex = 0;
  let skillInterval;
  function cycleSkills() {
    skillCards.forEach((card, idx) => {
      card.classList.toggle('active-skill', idx === skillIndex);
    });
    skillIndex = (skillIndex + 1) % skillCards.length;
  }

  // --- Auto-cycle & hover/focus for education ---
  const eduCards = Array.from(document.querySelectorAll('.edu-card'));
  let eduIndex = 0;
  let eduInterval;
  function cycleEdu() {
    eduCards.forEach((card, idx) => {
      card.classList.toggle('active-edu', idx === eduIndex);
    });
    eduIndex = (eduIndex + 1) % eduCards.length;
  }

  // --- Auto-cycle & hover/focus for projects ---
  const projectCards = Array.from(document.querySelectorAll('.project-card'));
  let projectIndex = 0;
  let projectInterval;
  function cycleProjects() {
    projectCards.forEach((card, idx) => {
      card.classList.toggle('active-project', idx === projectIndex);
    });
    projectIndex = (projectIndex + 1) % projectCards.length;
  }

  // --- Intersection Observer for section-triggered auto-cycle ---
  function setupSectionObserver() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3
    };

    const callback = (entries, observer) => {
      entries.forEach(entry => {
        const target = entry.target;
        if (target.id === 'education') {
          if (entry.isIntersecting) {
            cycleEdu();
            eduInterval = setInterval(cycleEdu, 1800); // slower
          } else {
            clearInterval(eduInterval);
            eduCards.forEach(c => c.classList.remove('active-edu'));
          }
        }
        if (target.id === 'skills') {
          if (entry.isIntersecting) {
            cycleSkills();
            skillInterval = setInterval(cycleSkills, 1000);
          } else {
            clearInterval(skillInterval);
            skillCards.forEach(c => c.classList.remove('active-skill'));
          }
        }
        if (target.id === 'projects') {
          if (entry.isIntersecting) {
            cycleProjects();
            projectInterval = setInterval(cycleProjects, 1000);
          } else {
            clearInterval(projectInterval);
            projectCards.forEach(c => c.classList.remove('active-project'));
          }
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(document.getElementById('education'));
    observer.observe(document.getElementById('skills'));
    observer.observe(document.getElementById('projects'));
  }
  setupSectionObserver();

  // Manual hover/focus for skills, education, projects
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

  eduCards.forEach((card, idx) => {
    card.addEventListener('mouseenter', () => {
      clearInterval(eduInterval);
      eduCards.forEach(c => c.classList.remove('active-edu'));
      card.classList.add('active-edu');
    });
    card.addEventListener('mouseleave', () => {
      cycleEdu();
      eduInterval = setInterval(cycleEdu, 1800);
    });
    card.addEventListener('focus', () => {
      clearInterval(eduInterval);
      eduCards.forEach(c => c.classList.remove('active-edu'));
      card.classList.add('active-edu');
    });
    card.addEventListener('blur', () => {
      cycleEdu();
      eduInterval = setInterval(cycleEdu, 1800);
    });
  });

  projectCards.forEach((card, idx) => {
    card.addEventListener('mouseenter', () => {
      clearInterval(projectInterval);
      projectCards.forEach(c => c.classList.remove('active-project'));
      card.classList.add('active-project');
    });
    card.addEventListener('mouseleave', () => {
      cycleProjects();
      projectInterval = setInterval(cycleProjects, 1000);
    });
    card.addEventListener('focus', () => {
      clearInterval(projectInterval);
      projectCards.forEach(c => c.classList.remove('active-project'));
      card.classList.add('active-project');
    });
    card.addEventListener('blur', () => {
      cycleProjects();
      projectInterval = setInterval(cycleProjects, 1000);
    });
  });
});
