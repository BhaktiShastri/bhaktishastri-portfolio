// ====== Footer year ======
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// ====== Scrollspy: highlight nav links as you scroll ======
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

function handleScrollSpy() {
  let currentId = "";

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const offsetTop = rect.top;
    const height = rect.height;

    // Section is "active" when its top is within this viewport band
    if (offsetTop <= 120 && offsetTop > -height + 120) {
      currentId = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    const href = link.getAttribute("href");
    if (href === `#${currentId}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", handleScrollSpy);
handleScrollSpy(); // run once on load

// ====== Reveal-on-scroll animations (fade + slight zoom) ======
const revealElements = document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target); // only animate once
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  revealElements.forEach((el) => observer.observe(el));
} else {
  // Fallback for very old browsers: just show them
  revealElements.forEach((el) => el.classList.add("is-visible"));
}

// ====== Dark / Light theme toggle with localStorage ======
const themeToggleBtn = document.getElementById("themeToggle");
const prefersDark =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

function setTheme(theme) {
  const isLight = theme === "light";
  document.body.classList.toggle("theme-light", isLight);
  localStorage.setItem("theme", theme);

  // Icon: ☾ when in light mode (to switch to dark), ☀ when in dark mode
  if (themeToggleBtn) {
    themeToggleBtn.textContent = isLight ? "☾" : "☀";
  }
}

// Initialize theme from localStorage or system preference
(function initTheme() {
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme === "light" || storedTheme === "dark") {
    setTheme(storedTheme);
  } else {
    setTheme(prefersDark ? "dark" : "light");
  }
})();

// Toggle theme on button click
if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", () => {
    const isCurrentlyLight = document.body.classList.contains("theme-light");
    setTheme(isCurrentlyLight ? "dark" : "light");
  });
}

// ====== Certification filters (All / Security / Networking / Cloud) ======
const certFilterButtons = document.querySelectorAll("[data-cert-filter]");
const certCards = document.querySelectorAll("[data-cert-category]");

if (certFilterButtons.length && certCards.length) {
  certFilterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-cert-filter");

      // Active button styling
      certFilterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      // Show/hide cards
      certCards.forEach((card) => {
        const categories = card
          .getAttribute("data-cert-category")
          .toLowerCase()
          .split(" ");

        if (filter === "all" || categories.includes(filter)) {
          card.style.display = "";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}
