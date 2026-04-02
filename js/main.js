const toggleButtons = document.querySelectorAll(".toggle-answer");
const menuToggle = document.getElementById("menu-toggle");
const menu = document.querySelector(".menu");

// ── Resolve the nav CTA element (handles both .nav-btn wrapper and bare .btn) ──
const navBtn = document.querySelector(".nav-btn") || document.querySelector("nav .btn");

// ── FAQ answer togglers ──
toggleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const answer = button.closest(".question").querySelector(".answer");
    answer.classList.toggle("show");
    if (button.classList.contains("expanded")) {
      button.src = "/images/arrow-down.svg";
      button.classList.remove("expanded");
    } else {
      button.src = "/images/arrow-up.svg";
      button.classList.add("expanded");
    }
  });
});

// ── Mobile nav toggle ──
if (menuToggle && menu) {
  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");

    // Toggle CTA button visibility
    if (navBtn) navBtn.classList.toggle("active");

    // Swap hamburger icon
    if (menuToggle.classList.contains("expanded")) {
      menuToggle.src = "/images/toggle-button.svg";
      menuToggle.classList.remove("expanded");
    } else {
      menuToggle.src = "/images/toggle-close-x-svgrepo-com.svg";
      menuToggle.classList.add("expanded");
    }
  });

  // Close mobile nav when a link is clicked
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("active");
      if (navBtn) navBtn.classList.remove("active");
      menuToggle.src = "/images/toggle-button.svg";
      menuToggle.classList.remove("expanded");
    });
  });

  // Close nav when clicking outside
  document.addEventListener("click", (e) => {
    if (
      !menu.contains(e.target) &&
      !menuToggle.contains(e.target) &&
      (!navBtn || !navBtn.contains(e.target))
    ) {
      menu.classList.remove("active");
      if (navBtn) navBtn.classList.remove("active");
      menuToggle.src = "/images/toggle-button.svg";
      menuToggle.classList.remove("expanded");
    }
  });
}

// ── Coming Soon tooltip (unified handler for all pages) ──
document.querySelectorAll(".coming-soon-trigger").forEach((trigger) => {
  trigger.addEventListener("click", (e) => {
    e.preventDefault();
    // Look for tooltip as sibling or child
    const parent = trigger.parentElement;
    const tooltip =
      parent.querySelector(".coming-soon-tooltip") ||
      trigger.querySelector(".coming-soon-tooltip");
    if (tooltip) {
      tooltip.classList.add("visible");
      setTimeout(() => tooltip.classList.remove("visible"), 2000);
    }
  });
});

// ── iOS Coming Soon popup (legacy fallback) ──
const iosBtn = document.querySelector(".ios-download-btn");
const iosPopup = document.getElementById("iosComingSoon");
if (iosBtn && iosPopup && !iosBtn.classList.contains("coming-soon-trigger")) {
  iosBtn.addEventListener("click", (e) => {
    e.preventDefault();
    iosPopup.classList.add("show");
    setTimeout(() => iosPopup.classList.remove("show"), 2000);
  });
}

// ── Tab switching (How It Works — Buyer vs Seller) ──
const tabs = document.querySelectorAll(".tab-button");
const tabContents = document.querySelectorAll(".tab-content");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    tabContents.forEach((c) => c.classList.remove("active"));
    tab.classList.add("active");
    const targetContent = document.getElementById(tab.dataset.tab);
    if (targetContent) targetContent.classList.add("active");
  });
});