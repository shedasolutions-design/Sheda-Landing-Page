/* ============================================================
   main.js — Sheda Solutions
   Handles: mobile nav, FAQ toggles, Coming Soon tooltips,
            tab switching, backdrop, Escape key
============================================================ */

// ── Selectors ──────────────────────────────────────────────
const menuToggle = document.getElementById("menu-toggle");
const menu       = document.querySelector("nav .menu");
const navBtnEl   = document.querySelector(".nav-btn"); // desktop CTA wrapper

// ── Mobile: inject CTA inside the dropdown ─────────────────
// We clone the desktop CTA button into a list item at the
// bottom of the dropdown so it's accessible on mobile.
function injectMobileCTA() {
  if (!navBtnEl || !menu) return;
  if (menu.querySelector(".mobile-cta-item")) return; // already injected

  const li = document.createElement("li");
  li.className = "mobile-cta-item";

  // Clone the inner content (btn + tooltip)
  li.innerHTML = navBtnEl.innerHTML;
  menu.appendChild(li);

  // Re-bind coming-soon on the cloned button
  const clonedTrigger = li.querySelector(".coming-soon-trigger");
  if (clonedTrigger) {
    clonedTrigger.addEventListener("click", (e) => {
      e.preventDefault();
      const tooltip =
        clonedTrigger.parentElement.querySelector(".coming-soon-tooltip") ||
        clonedTrigger.querySelector(".coming-soon-tooltip");
      if (tooltip) {
        tooltip.classList.add("visible");
        setTimeout(() => tooltip.classList.remove("visible"), 2000);
      }
    });
  }
}

// ── Backdrop ───────────────────────────────────────────────
let backdrop = null;

function createBackdrop() {
  if (backdrop) return;
  backdrop = document.createElement("div");
  backdrop.className = "nav-backdrop";
  document.body.appendChild(backdrop);
  backdrop.addEventListener("click", closeNav);
}

// ── Open / Close ───────────────────────────────────────────
function openNav() {
  if (!menu || !menuToggle) return;
  injectMobileCTA();
  createBackdrop();

  menu.classList.add("active");
  backdrop.classList.add("active");
  menuToggle.src = "/images/toggle-close-x-svgrepo-com.svg";
  menuToggle.classList.add("expanded");
  menuToggle.setAttribute("aria-expanded", "true");
}

function closeNav() {
  if (!menu || !menuToggle) return;

  menu.classList.remove("active");
  if (backdrop) backdrop.classList.remove("active");
  menuToggle.src = "/images/toggle-button.svg";
  menuToggle.classList.remove("expanded");
  menuToggle.setAttribute("aria-expanded", "false");
}

function toggleNav() {
  menu && menu.classList.contains("active") ? closeNav() : openNav();
}

// ── Event: hamburger click ─────────────────────────────────
if (menuToggle) {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Toggle navigation");
  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleNav();
  });
}

// ── Event: close on nav link click ────────────────────────
if (menu) {
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNav);
  });
}

// ── Event: Escape key ─────────────────────────────────────
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeNav();
});

// ── Event: close on resize to desktop ─────────────────────
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) closeNav();
});

// ── FAQ toggle ────────────────────────────────────────────
document.querySelectorAll(".toggle-answer").forEach((button) => {
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

// ── Coming Soon tooltips ──────────────────────────────────
document.querySelectorAll(".coming-soon-trigger").forEach((trigger) => {
  trigger.addEventListener("click", (e) => {
    e.preventDefault();
    const parent  = trigger.parentElement;
    const tooltip =
      parent.querySelector(".coming-soon-tooltip") ||
      trigger.querySelector(".coming-soon-tooltip");
    if (tooltip) {
      tooltip.classList.add("visible");
      setTimeout(() => tooltip.classList.remove("visible"), 2000);
    }
  });
});

// ── iOS Coming Soon fallback ──────────────────────────────
const iosBtn   = document.querySelector(".ios-download-btn");
const iosPopup = document.getElementById("iosComingSoon");
if (iosBtn && iosPopup && !iosBtn.classList.contains("coming-soon-trigger")) {
  iosBtn.addEventListener("click", (e) => {
    e.preventDefault();
    iosPopup.classList.add("show");
    setTimeout(() => iosPopup.classList.remove("show"), 2000);
  });
}

// ── Tab switching (Buyer / Seller) ────────────────────────
const tabs        = document.querySelectorAll(".tab-button");
const tabContents = document.querySelectorAll(".tab-content");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t)        => t.classList.remove("active"));
    tabContents.forEach((c) => c.classList.remove("active"));
    tab.classList.add("active");
    const target = document.getElementById(tab.dataset.tab);
    if (target) target.classList.add("active");
  });
});