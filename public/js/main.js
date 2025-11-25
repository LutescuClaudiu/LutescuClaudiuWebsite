
const sections = document.querySelectorAll("section, .hero");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2 }
);

sections.forEach((sec) => observer.observe(sec));

const navLinks = document.querySelectorAll(".navbar nav a");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((sec) => {
    const sectionTop = sec.offsetTop - 80;
    if (pageYOffset >= sectionTop) {
      current = sec.getAttribute("id");
    }
  });
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});
