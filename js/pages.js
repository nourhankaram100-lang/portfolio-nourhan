/* =====================================================
   PAGES.JS  (additive — load AFTER script.js, edits nothing in it)
   - Arabic/English swap for the new pages (data-ar / data-ar-ph attributes)
   - animated counters, scroll reveal, card spotlight
   - experience timeline filter, contact form (opens the mail app)
   ===================================================== */
(function () {
  "use strict";
  var root = document.documentElement;
  root.classList.add("js");

  /* single source of truth for the contact email (used by the contact card, form and footer) */
  var CONTACT_EMAIL = "nourhankaram230@gmail.com";

  /* ---- Language swap (English stays in the HTML, Arabic lives in data-ar) ---- */
  function swap() {
    var ar = root.getAttribute("lang") === "ar";
    document.querySelectorAll("[data-ar]").forEach(function (el) {
      if (el.dataset.en === undefined) el.dataset.en = el.innerHTML;
      el.innerHTML = ar ? el.dataset.ar : el.dataset.en;
    });
    document.querySelectorAll("[data-ar-ph]").forEach(function (el) {
      if (el.dataset.enPh === undefined) el.dataset.enPh = el.placeholder;
      el.placeholder = ar ? el.dataset.arPh : el.dataset.enPh;
    });
  }
  swap();
  new MutationObserver(swap).observe(root, { attributes: true, attributeFilter: ["lang"] });

  /* ---- Scroll reveal + counters ---- */
  var hasIO = "IntersectionObserver" in window;
  function watch(selector, threshold, onEnter) {
    var els = document.querySelectorAll(selector);
    if (!hasIO) { els.forEach(onEnter); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { onEnter(e.target); io.unobserve(e.target); }
      });
    }, { threshold: threshold });
    els.forEach(function (el) { io.observe(el); });
  }

  watch(".reveal", 0.12, function (el) { el.classList.add("in"); });

  watch(".count", 0.5, function (el) {
    var to = +el.dataset.to, suffix = el.dataset.suffix || "", t0 = null;
    function frame(t) {
      t0 = t0 || t;
      var p = Math.min((t - t0) / 1200, 1);
      el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))) + suffix;
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  });

  /* ---- Card spotlight follows the cursor ---- */
  document.querySelectorAll(".card").forEach(function (card) {
    card.addEventListener("mousemove", function (e) {
      var r = card.getBoundingClientRect();
      card.style.setProperty("--mx", e.clientX - r.left + "px");
      card.style.setProperty("--my", e.clientY - r.top + "px");
    });
  });

  /* ---- Experience timeline tabs ---- */
  var tlItems = document.querySelectorAll(".tl__item");
  var tabs = document.querySelectorAll(".tab-chip");
  tabs.forEach(function (chip) {
    chip.addEventListener("click", function () {
      tabs.forEach(function (c) { c.classList.remove("is-active"); });
      chip.classList.add("is-active");
      var f = chip.dataset.filter;
      tlItems.forEach(function (it) {
        it.classList.toggle("is-hidden", f !== "all" && it.dataset.type !== f);
      });
    });
  });

  /* ---- Scroll-spy: highlight the nav link / rail icon of the section in view ---- */
  var ids = ["home", "about", "skills", "projects", "experience", "contact"];
  var secs = ids.map(function (id) { return document.getElementById(id); }).filter(Boolean);
  if (secs.length) {
    var ticking = false;
    var spy = function () {
      ticking = false;
      var cur = secs[0].id;
      secs.forEach(function (s) { if (s.getBoundingClientRect().top <= 140) cur = s.id; });
      document.querySelectorAll(".nav-link, .side-rail__icon").forEach(function (a) {
        a.classList.toggle("is-active", a.getAttribute("href") === "#" + cur);
      });
    };
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(spy); }
    }, { passive: true });
    spy();
  }

  /* ---- Contact form -> opens the visitor's mail app with the message filled in ---- */
  var form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var body = d.get("message") + "\n\n— " + d.get("name") + " (" + d.get("email") + ")";
      var note = document.getElementById("formNote");
      if (note) note.textContent = root.getAttribute("lang") === "ar" ? form.dataset.okAr : form.dataset.okEn;
      window.location.href = "mailto:" + CONTACT_EMAIL +
        "?subject=" + encodeURIComponent(d.get("subject")) +
        "&body=" + encodeURIComponent(body);
    });
  }

  /* ---- Single source of truth for the email (edit CONTACT_EMAIL above) ---- */
  document.querySelectorAll("[data-email]").forEach(function (el) { el.textContent = CONTACT_EMAIL; });
  document.querySelectorAll("[data-mailto]").forEach(function (el) { el.href = "mailto:" + CONTACT_EMAIL; });
  var copyBtn = document.getElementById("copyEmail");
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      var label = copyBtn.querySelector("[data-email]");
      var done = function () {
        label.textContent = root.getAttribute("lang") === "ar" ? "تم النسخ ✓" : "Copied ✓";
        setTimeout(function () { label.textContent = CONTACT_EMAIL; }, 1600);
      };
      if (navigator.clipboard) navigator.clipboard.writeText(CONTACT_EMAIL).then(done, done); else done();
    });
  }


  /* ---- FAQ accordion: one answer open at a time, keyboard friendly ---- */
  var faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(function (item) {
    var btn = item.querySelector(".faq-q");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var willOpen = !item.classList.contains("is-open");
      faqItems.forEach(function (it) {
        it.classList.remove("is-open");
        var b = it.querySelector(".faq-q");
        if (b) b.setAttribute("aria-expanded", "false");
      });
      if (willOpen) {
        item.classList.add("is-open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* ---- Timeline fills up as you scroll ---- */
  var tl = document.querySelector(".tl");
  if (tl) {
    var upd = function () {
      var r = tl.getBoundingClientRect(), h = window.innerHeight * 0.6;
      tl.style.setProperty("--p", Math.min(Math.max((h - r.top) / r.height, 0), 1));
      tl.querySelectorAll(".tl__item").forEach(function (it) {
        it.classList.toggle("passed", it.getBoundingClientRect().top < h);
      });
    };
    window.addEventListener("scroll", upd, { passive: true });
    upd();
  }
})();
