// Personalize links and resume path here.
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
document.querySelectorAll("[data-link]").forEach(link => {
  const key = link.dataset.link;
  link.href = profile[key] || "#";
  if (link.href.startsWith("http")) { link.target = "_blank"; link.rel = "noopener noreferrer"; }
  link.addEventListener("click", event => {
    if (!profile[key] || profile[key].includes("YOUR_")) {
      event.preventDefault();
      alert("Update this placeholder link in script.js with your real profile or project URL.");
    }
  });
});
document.querySelectorAll("[data-resume]").forEach(link => {
  link.href = profile.resume;
  link.addEventListener("click", event => {
    if (profile.resume.includes("YOUR_") || !profile.resume) {
      event.preventDefault();
      alert("Add your resume PDF to the assets folder and update the resume path in script.js.");
    }
  });
});
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
  toggle.textContent = open ? "×" : "☰";
});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  nav.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); toggle.textContent = "☰";
}));
document.querySelector("#year").textContent = new Date().getFullYear();
