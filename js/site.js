/* Sheda Solutions: one script for every page.
   Menu, header shadow, reading progress, section highlighting,
   buyer/seller tabs, reveal on scroll, store badges, contact form. */
(function () {
  "use strict";
  // ?static turns off the fade-in, for screenshots and previews.
  if (!/[?&]static\b/.test(location.search)) document.documentElement.classList.add("js");

  // ---- Mobile menu ----
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  function setMenu(open) {
    if (!toggle || !nav) return;
    nav.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.classList.toggle("nav-open", open);
  }
  if (toggle && nav) {
    toggle.addEventListener("click", function () { setMenu(!nav.classList.contains("open")); });
    nav.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });
    window.addEventListener("resize", function () { if (window.innerWidth > 1080) setMenu(false); });
  }

  // ---- Header shadow, progress bar, current section ----
  var header = document.querySelector(".site-header");
  var bar = document.querySelector(".scroll-progress span");
  var marks = Array.prototype.slice.call(document.querySelectorAll(".nav-links a[data-section]"))
    .map(function (link) { return { link: link, el: document.getElementById(link.dataset.section) }; })
    .filter(function (m) { return m.el; });
  var homeLink = document.querySelector('.nav-links a[data-home]');
  var queued = false;
  function paint() {
    queued = false;
    var y = window.scrollY;
    if (header) header.classList.toggle("scrolled", y > 8);
    if (bar) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (max > 0 ? Math.min(100, (y / max) * 100) : 0) + "%";
    }
    if (!marks.length) return;
    var line = y + 160, current = null;
    marks.forEach(function (m) { if (m.el.getBoundingClientRect().top + y <= line) current = m; });
    marks.forEach(function (m) { m.link.classList.toggle("active", m === current); });
    if (homeLink) homeLink.classList.toggle("active", current === null);
  }
  function onScroll() { if (!queued) { queued = true; requestAnimationFrame(paint); } }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  paint();

  // ---- Buyer / seller tabs ----
  var tabs = document.querySelectorAll('[role="tab"]');
  var howImg = document.querySelector(".how-visual img");
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        var panel = document.getElementById(t.getAttribute("aria-controls"));
        if (panel) panel.hidden = !on;
      });
      if (howImg && tab.dataset.img) {
        howImg.style.opacity = "0";
        setTimeout(function () {
          howImg.src = tab.dataset.img;
          howImg.alt = tab.dataset.alt || "";
          howImg.style.opacity = "1";
        }, 180);
      }
    });
    tab.addEventListener("keydown", function (e) {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      var list = Array.prototype.slice.call(tabs);
      var next = list[(list.indexOf(tab) + (e.key === "ArrowRight" ? 1 : list.length - 1)) % list.length];
      next.focus(); next.click();
    });
  });

  // ---- Reveal on scroll ----
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && items.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("shown"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("shown"); });
  }

  // ---- App store badges: not out yet ----
  document.querySelectorAll(".store").forEach(function (s) {
    s.addEventListener("click", function (e) {
      e.preventDefault();
      s.classList.add("show");
      setTimeout(function () { s.classList.remove("show"); }, 1800);
    });
  });

  // ---- Contact form ----
  var form = document.getElementById("contact-form");
  if (form) {
    var status = form.querySelector(".form-status");
    var btn = form.querySelector('button[type="submit"]');
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      btn.disabled = true;
      status.className = "form-status";
      status.textContent = "Sending...";
      fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })
        .then(function (r) {
          if (!r.ok) throw new Error("bad status");
          window.location.href = "/thankYou.html";
        })
        .catch(function () {
          status.className = "form-status error";
          status.textContent = "Sorry, your message didn't send. Please try again, or reach us on Telegram.";
          btn.disabled = false;
        });
    });
  }
})();
