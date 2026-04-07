/* ============================================================
   Grandvo Technologies — script.js (Light Theme)
============================================================ */
(function () {
  "use strict";

  /* ─── Sticky Navbar ─── */
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    window.addEventListener("scroll", () => {
      navbar.classList.toggle("scrolled", window.scrollY > 30);
    });
  }

  /* ─── Mobile Menu Toggle ─── */
  const hamburger = document.querySelector(".hamburger");
  const navMobile = document.querySelector(".nav-mobile");
  if (hamburger && navMobile) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("open");
      navMobile.classList.toggle("open");
    });
    navMobile.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("open");
        navMobile.classList.remove("open");
      });
    });
  }

  /* ─── Active Nav Link ─── */
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a, .nav-mobile a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });

  /* ─── Smooth Scrolling ─── */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  /* ─── Scroll Reveal ─── */
  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length > 0) {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => obs.observe(el));
  }

  /* ─── Counter Animation ─── */
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const start = performance.now();
    const update = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(eased * target);
      if (t < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }

  const counters = document.querySelectorAll("[data-target]");
  if (counters.length > 0) {
    const cObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animateCounter(e.target);
            cObs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((c) => cObs.observe(c));
  }

  /* ─── Contact Form Validation ─── */
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      let valid = true;

      form.querySelectorAll(".form-error").forEach((el) => (el.style.display = "none"));

      const name    = document.getElementById("name");
      const email   = document.getElementById("email");
      const message = document.getElementById("message");

      if (name && name.value.trim().length < 2) {
        showErr(name, "Please enter your full name.");
        valid = false;
      }
      if (email && !isValidEmail(email.value.trim())) {
        showErr(email, "Please enter a valid email address.");
        valid = false;
      }
      if (message && message.value.trim().length < 10) {
        showErr(message, "Please write at least 10 characters.");
        valid = false;
      }

      if (valid) {
        const success = document.getElementById("formSuccess");
        if (success) {
          success.style.display = "block";
          form.reset();
          setTimeout(() => (success.style.display = "none"), 6000);
        }
      }
    });
  }

  function showErr(input, msg) {
    const group = input.closest(".form-group");
    if (!group) return;
    const err = group.querySelector(".form-error");
    if (err) { err.textContent = msg; err.style.display = "block"; }
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
})();
