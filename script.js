// Portfolio interactions — lightweight vanilla JavaScript.
const profile = {
  github: "https://github.com/itsanu2005",
  linkedin: "https://www.linkedin.com/in/anurag-yadav-5928112b2/",
  leetcode: "https://leetcode.com/u/anxydv_/",
  motosched: "https://github.com/YOUR_USERNAME/motosched",
  security: "https://github.com/YOUR_USERNAME/YOUR_SECURITY_PROJECT",
  chatbot: "https://github.com/YOUR_USERNAME/YOUR_CHATBOT_PROJECT",
  studentdb: "https://github.com/YOUR_USERNAME/YOUR_STUDENT_DB_PROJECT",
  dsa: "#", webdev: "#", cyber: "#", aiml: "#",
  resume: "assets/Anurag-Yadav-Resume.pdf"
};

// Set configured profile/project URLs and make external links safe.
document.querySelectorAll("[data-link]").forEach((link) => {
  const key = link.dataset.link;
  link.href = profile[key] || "#";
  if (link.href.startsWith("http")) {
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  }
  link.addEventListener("click", (event) => {
    if (!profile[key] || profile[key] === "#" || profile[key].includes("YOUR_")) {
      event.preventDefault();
      alert("This link is a placeholder. Update the '" + key + "' URL in script.js before publishing.");
    }
  });
});

// Resume download. Place your PDF at the path below.
document.querySelectorAll("[data-resume]").forEach((link) => {
  link.href = profile.resume;
  link.addEventListener("click", (event) => {
    if (!profile.resume || profile.resume.includes("YOUR_")) {
      event.preventDefault();
      alert("Add your resume PDF to the assets folder and update the resume path in script.js.");
    }
  });
});

// Accessible mobile navigation.
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    toggle.innerHTML = open ? '<span></span><span></span>' : '<span></span><span></span>';
    toggle.classList.toggle("is-open", open);
  });

  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation");
    toggle.classList.remove("is-open");
  }));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("open")) {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.focus();
    }
  });
}

// Current year.
const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

// Scroll progress and back-to-top control.
const progress = document.querySelector(".scroll-progress span");
const backToTop = document.querySelector(".back-to-top");
let ticking = false;
function updateScrollUI() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const percent = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  if (progress) progress.style.width = percent + "%";
  if (backToTop) backToTop.classList.toggle("visible", window.scrollY > 500);
  ticking = false;
}
window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(updateScrollUI);
    ticking = true;
  }
}, { passive: true });
updateScrollUI();

// Reveal content as it enters the viewport, with reduced-motion support.
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealTargets = document.querySelectorAll(
  ".about-copy, .center-heading, .skill-card, .project-card, .timeline article, .cert-card, .education-card, .education-mini article, .contact-links a"
);
if (!reduceMotion && "IntersectionObserver" in window) {
  document.body.classList.add("reveal-ready");
  revealTargets.forEach((element) => element.classList.add("reveal"));
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
  revealTargets.forEach((element) => observer.observe(element));
}

// Highlight the navigation item for the section currently in view.
const sectionLinks = [...document.querySelectorAll('.nav a[href^="#"]')];
const sections = sectionLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);
if ("IntersectionObserver" in window && sections.length) {
  const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        sectionLinks.forEach((link) => {
          const active = link.getAttribute("href") === "#" + entry.target.id;
          link.classList.toggle("active", active);
          if (active) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      }
    });
  }, { rootMargin: "-25% 0px -60% 0px", threshold: 0 });
  sections.forEach((section) => activeObserver.observe(section));
}


// Theme switcher with a remembered preference.
const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector(".theme-icon");
const savedTheme = (() => { try { return localStorage.getItem("anurag-portfolio-theme"); } catch (_) { return null; } })();
if (savedTheme === "dark") document.body.classList.add("dark-theme");
function syncThemeButton() {
  const dark = document.body.classList.contains("dark-theme");
  if (themeIcon) themeIcon.textContent = dark ? "☀" : "☾";
  if (themeToggle) {
    themeToggle.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
    themeToggle.setAttribute("title", dark ? "Switch to light theme" : "Switch to dark theme");
  }
}
syncThemeButton();
if (themeToggle) themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  try { localStorage.setItem("anurag-portfolio-theme", document.body.classList.contains("dark-theme") ? "dark" : "light"); } catch (_) {}
  syncThemeButton();
});

// Project filters keep the portfolio browsable without hiding content by default.
const filterButtons = document.querySelectorAll("[data-filter]");
const projectCards = document.querySelectorAll(".project-card[data-category]");
filterButtons.forEach((button) => button.addEventListener("click", () => {
  const filter = button.dataset.filter;
  filterButtons.forEach((item) => {
    const active = item === button;
    item.classList.toggle("is-active", active);
    item.setAttribute("aria-pressed", String(active));
  });
  projectCards.forEach((card) => {
    const categories = (card.dataset.category || "").split(/\s+/);
    card.hidden = filter !== "all" && !categories.includes(filter);
  });
}));
