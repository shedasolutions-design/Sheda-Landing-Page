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
    const open = answer.classList.toggle("show");
    button.classList.toggle("expanded", open);
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
// ==============================================
// Reveal on scroll
// ==============================================
// Anything marked .reveal fades up once, the first time it comes into
// view. Guarded on IntersectionObserver so an older browser simply shows
// the content, and the stylesheet already turns the motion off for anyone
// who has asked for less of it.
(function () {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  if (!("IntersectionObserver" in window)) return;

  // Only now does the hidden state apply. Setting it in CSS alone would
  // leave the content invisible on any page where this script failed.
  document.documentElement.classList.add("js-reveal");

  const seen = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("shown");
        obs.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.1 }
  );

  items.forEach((el) => seen.observe(el));

  // A jump link can land past a section without that section ever having
  // crossed the viewport, and the observer would then never fire for it.
  // Anything at or above the fold is caught here instead of staying
  // invisible until the reader scrolls back up to it.
  function sweep() {
    let left = 0;
    items.forEach((el) => {
      if (el.classList.contains("shown")) return;
      if (el.getBoundingClientRect().top < window.innerHeight) {
        el.classList.add("shown");
        seen.unobserve(el);
      } else {
        left += 1;
      }
    });
    if (!left) window.removeEventListener("scroll", sweep);
  }

  window.addEventListener("scroll", sweep, { passive: true });
})();

// ==============================================
// Reading position, and which section you are in
// ==============================================
// Two small things that only apply to a page long enough to get lost on,
// so both bail out quietly when their markup is absent. The nav's in-page
// links are marked .jump; the page links are left alone.
(function () {
  const bar = document.querySelector(".scroll-progress span");
  const jumps = Array.from(document.querySelectorAll('nav .menu a.jump'));
  // Whichever link the markup already marks as the current page. Matching
  // on the href instead would depend on how the site happens to be served,
  // and would quietly stop finding it anywhere the page is not at /.
  const pageLink = document.querySelector("nav .menu a.active:not(.jump)");

  // Each link's target, in document order, skipping any anchor whose
  // section is not on this page.
  const marks = jumps
    .map((link) => ({ link, el: document.getElementById(link.hash.slice(1)) }))
    .filter((m) => m.el);

  if (!bar && !marks.length) return;

  let queued = false;

  function paint() {
    queued = false;

    if (bar) {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
      bar.style.width = Math.min(100, Math.max(0, ratio * 100)) + "%";
    }

    if (!marks.length) return;

    // The section whose top is highest while still above the fold, which
    // is the one being read rather than the one about to be.
    const line = window.scrollY + 140;
    let current = null;
    for (const m of marks) {
      if (m.el.offsetTop <= line) current = m;
    }

    // Above the first section there is no section being read, so the
    // page's own link in the nav is the honest answer.
    for (const m of marks) {
      m.link.classList.toggle("active", m === current);
    }
    if (pageLink) pageLink.classList.toggle("active", current === null);
  }

  function onScroll() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(paint);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  paint();
})();
