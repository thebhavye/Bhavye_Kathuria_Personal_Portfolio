"use strict";

const progressBar = document.getElementById("scroll-progress");

function updateScrollProgress() {
  const scrollTop    = window.scrollY;
  const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPct    = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = scrollPct + "%";
}

window.addEventListener("scroll", updateScrollProgress, { passive: true });


const navbar = document.getElementById("navbar");

function handleNavbarScroll() {
  if (window.scrollY > 40) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", handleNavbarScroll, { passive: true });
handleNavbarScroll();


const hamburger = document.getElementById("hamburger");
const navLinks  = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  hamburger.classList.toggle("active", isOpen);
  hamburger.setAttribute("aria-expanded", isOpen.toString());
  document.body.style.overflow = isOpen ? "hidden" : "";
});

navLinks.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    hamburger.classList.remove("active");
    hamburger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  });
});

document.addEventListener("click", (e) => {
  if (!navbar.contains(e.target)) {
    navLinks.classList.remove("open");
    hamburger.classList.remove("active");
    hamburger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }
});


const typedEl = document.getElementById("typed-text");

const phrases = [
  "Web Developer",
  "Problem Solver",
  "Hackathon Enthusiast",
];

let phraseIdx   = 0;
let charIdx     = 0;
let isDeleting  = false;
let typePause   = false;

function typeLoop() {
  if (!typedEl) return;

  const currentPhrase = phrases[phraseIdx];

  if (typePause) {
    typePause = false;
    setTimeout(typeLoop, 1400);
    return;
  }

  if (!isDeleting) {
    typedEl.textContent = currentPhrase.slice(0, charIdx + 1);
    charIdx++;

    if (charIdx === currentPhrase.length) {
      isDeleting = true;
      typePause  = true;
      setTimeout(typeLoop, 1400);
      return;
    }
    setTimeout(typeLoop, 72);
  } else {
    typedEl.textContent = currentPhrase.slice(0, charIdx - 1);
    charIdx--;

    if (charIdx === 0) {
      isDeleting = false;
      phraseIdx  = (phraseIdx + 1) % phrases.length;
      setTimeout(typeLoop, 350);
      return;
    }
    setTimeout(typeLoop, 38);
  }
}

setTimeout(typeLoop, 800);


const revealEls = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px",
  }
);

revealEls.forEach((el) => revealObserver.observe(el));


const skillBarFills = document.querySelectorAll(".skill-bar-fill");

const skillBarObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const fill      = entry.target;
        const targetPct = fill.getAttribute("data-width") || "0";
        requestAnimationFrame(() => {
          fill.style.width = targetPct + "%";
        });
        skillBarObserver.unobserve(fill);
      }
    });
  },
  { threshold: 0.4 }
);

skillBarFills.forEach((fill) => skillBarObserver.observe(fill));


const sections  = document.querySelectorAll("section[id]");
const navItems  = document.querySelectorAll(".nav-link");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navItems.forEach((n) => n.classList.remove("active-nav"));
        const id     = entry.target.getAttribute("id");
        const active = document.querySelector(`.nav-link[href="#${id}"]`);
        if (active) active.classList.add("active-nav");
      }
    });
  },
  {
    threshold: 0,
    rootMargin: "-60px 0px -55% 0px",
  }
);

sections.forEach((s) => sectionObserver.observe(s));


const activeStyle = document.createElement("style");
activeStyle.textContent = `.nav-link.active-nav { color: var(--accent) !important; }
.nav-link.active-nav::after { width: 100% !important; }`;
document.head.appendChild(activeStyle);


const staggerParents = document.querySelectorAll(
  ".skills-grid, .projects-grid, .contact-grid, .achievements-col"
);

staggerParents.forEach((parent) => {
  const children = parent.querySelectorAll(".reveal");
  children.forEach((child, i) => {
    child.style.transitionDelay = `${i * 0.1}s`;
  });
});
const semesterBlocks = document.querySelectorAll(".semester-block");

semesterBlocks.forEach((block) => {
  const toggle = block.querySelector(".semester-toggle");
  toggle.addEventListener("click", () => {
    const isOpen = block.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen.toString());
  });
});
