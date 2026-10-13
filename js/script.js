/* =====================================================
   SCRIPT.JS
   1) تبديل الوضع الداكن / الفاتح (يتحفظ في localStorage)
   2) تبديل اللغة عربي / إنجليزي (يغيّر النصوص + اتجاه الصفحة)
   3) تأثير الكتابة (typewriter) لكارت الكود عند تحميل الصفحة
   ===================================================== */

(function () {
  "use strict";

  /* ---------------- 1) Translations dictionary ---------------- */
  const translations = {
    en: {
      nav_home: "Home",
      nav_about: "About",
      nav_skills: "Skills",
      nav_projects: "Projects",
      nav_experience: "Experience",
      nav_contact: "Contact",
      hire_me: "Hire Me",
      hero_hello: "Hello! I'm",
      hero_name: "Nourhan",
      hero_role: "Front-End Developer",
      hero_desc:
        "I craft modern, responsive and accessible web experiences that are fast, interactive and designed to convert.",
      btn_work: "View My Work",
      btn_talk: "Let's Talk",
      tech_label: "TECH I WORK WITH",
      handwritten: "Better\nWeb Experiences",
      stat_label: "Project Completed",
      stat_percent: "100%",
      stat_value: "20+",

      about_eyebrow: "ABOUT ME",
      about_heading: "Crafting Digital Experiences That Make an Impact",
      about_desc:
        "I'm a front-end developer who loves turning ideas into beautiful, functional and user-friendly websites. I focus on writing clean code, creating smooth animations and building interfaces that users love.",
      about_btn: "Know More About Me",
      skills_eyebrow: "MY SKILLS",
      skills_viewall: "View All Skills",
      skill_js: "JavaScript (ES6+)",
      scroll_down: "Scroll Down",

      projects_eyebrow: "FEATURED PROJECTS",
      projects_heading: "Things I've Built",
      projects_viewall: "View All Projects",
      featured_badge: "Featured",
      filter_all: "All",
      filter_ecommerce: "E-commerce",
      filter_landing: "Landing Pages",
      filter_apps: "Web Apps",
      filter_portfolio: "Portfolio",
      live_demo: "Live Demo",
      view_more_projects: "View More Projects",
      view_less_projects: "View Less",
      proj1_title: "FreshCart — E-Commerce Website",
      proj1_desc: "A complete e-commerce storefront for electronics, fashion and home goods, with real product data, a working cart, and a polished checkout experience.",
      proj2_title: "EcoSculpt — Landing Page",
      proj2_desc: "A full landing page for a landscaping business — services, pricing, gallery, testimonials and a contact form, built with pure HTML & CSS.",
      proj3_title: "Merto — Fashion Store",
      proj3_desc: "A multi-category fashion & tech store with a complete product page — color variants, an image gallery, and cart functionality.",
      proj4_title: "Personal Portfolio (V1)",
      proj4_desc: "My first personal portfolio — about, skills, education, projects and certifications, built from scratch.",
      proj5_title: "Recipe — Meal Explorer",
      proj5_desc: "Browse recipes by category, area or ingredient, powered by a public meals API.",
      proj6_title: "Calc Logic",
      proj6_desc: "A neon-themed scientific calculator with calculation history, custom themes and a preferences panel.",
      proj7_title: "Yummy — Recipe Finder",
      proj7_desc: "Search for meals and their cooking method through a public API — a Route Academy JavaScript exam project.",
      proj8_title: "Minimal Shopping — Cosmetics Store",
      proj8_desc: "A cosmetics e-commerce store with a promo banner, product grid, pricing and a wishlist.",
    },
    ar: {
      nav_home: "الرئيسية",
      nav_about: "من أنا",
      nav_skills: "المهارات",
      nav_projects: "المشاريع",
      nav_experience: "الخبرة",
      nav_contact: "تواصل",
      hire_me: "وظّفني",
      hero_hello: "أهلاً! أنا",
      hero_name: "نورهان",
      hero_role: "مطوّرة واجهات أمامية",
      hero_desc:
        "أصمم تجارب ويب حديثة، متجاوبة وسهلة الاستخدام، سريعة وتفاعلية ومصمَّمة لتحويل الزوار إلى عملاء.",
      btn_work: "شاهد أعمالي",
      btn_talk: "لنتحدث",
      tech_label: "التقنيات اللي بشتغل بيها",
      handwritten: "تجارب ويب\nأفضل",
      stat_label: "مشروع مكتمل",
      stat_percent: "100%",
      stat_value: "+20",

      about_eyebrow: "من أنا",
      about_heading: "أصنع تجارب رقمية تصنع فرقًا حقيقيًا",
      about_desc:
        "أنا مطوّرة واجهات أمامية بحب أحوّل الأفكار لمواقع جميلة وعملية وسهلة الاستخدام. بركّز على كتابة كود نضيف، عمل حركات سلسة، وبناء واجهات يحبها المستخدم فعلاً.",
      about_btn: "اعرف أكتر عني",
      skills_eyebrow: "مهاراتي",
      skills_viewall: "كل المهارات",
      skill_js: "JavaScript (ES6+)",
      scroll_down: "مرر لأسفل",

      projects_eyebrow: "أبرز المشاريع",
      projects_heading: "حاجات بنيتها",
      projects_viewall: "كل المشاريع",
      featured_badge: "مميز",
      filter_all: "الكل",
      filter_ecommerce: "تجارة إلكترونية",
      filter_landing: "صفحات هبوط",
      filter_apps: "تطبيقات ويب",
      filter_portfolio: "بورتفوليو",
      live_demo: "عرض حي",
      view_more_projects: "شاهد المزيد",
      view_less_projects: "عرض أقل",
      proj1_title: "FreshCart — متجر إلكتروني",
      proj1_desc: "متجر إلكتروني متكامل للإلكترونيات والأزياء ومستلزمات المنزل، ببيانات منتجات حقيقية وسلة شراء فعّالة وتجربة شراء كاملة.",
      proj2_title: "EcoSculpt — صفحة هبوط",
      proj2_desc: "صفحة هبوط كاملة لشركة تنسيق حدائق — خدمات، باقات أسعار، معرض صور، آراء عملاء، وفورم تواصل، بـ HTML وCSS خالص.",
      proj3_title: "Merto — متجر أزياء",
      proj3_desc: "متجر أزياء وإلكترونيات متعدد الفئات، بصفحة منتج كاملة فيها اختيار الألوان ومعرض صور وسلة شراء.",
      proj4_title: "بورتفوليو شخصي (النسخة الأولى)",
      proj4_desc: "أول بورتفوليو شخصي ليا — من أنا، المهارات، التعليم، المشاريع والشهادات، مبني من الصفر.",
      proj5_title: "Recipe — دليل الوصفات",
      proj5_desc: "تصفح وصفات بالتصنيف أو المنطقة أو المكونات، عن طريق API عام للوجبات.",
      proj6_title: "Calc Logic",
      proj6_desc: "حاسبة علمية بثيمات نيون، سجل عمليات حسابية، وإعدادات تفضيلات مخصصة.",
      proj7_title: "Yummy — البحث عن الوجبات",
      proj7_desc: "البحث عن الوجبات وطريقة تحضيرها عن طريق API عام — مشروع امتحان جافاسكريبت من Route Academy.",
      proj8_title: "Minimal Shopping — متجر تجميل",
      proj8_desc: "متجر إلكتروني لمنتجات التجميل ببانر عروض، شبكة منتجات، أسعار، وقائمة مفضلة.",
    },
  };

  const root = document.documentElement;
  const langBtn = document.getElementById("langToggle");
  const themeBtn = document.getElementById("themeToggle");

  /* ---------------- 2) Apply language ---------------- */
  function applyLanguage(lang) {
    const dict = translations[lang] || translations.en;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key] !== undefined) {
        el.innerText = dict[key];
      }
    });

    root.setAttribute("lang", lang);
    root.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    if (langBtn) langBtn.textContent = lang === "ar" ? "EN" : "AR";

    try {
      localStorage.setItem("portfolio-lang", lang);
    } catch (e) {
      /* ignore storage errors */
    }
  }

  /* ---------------- 3) Apply theme ---------------- */
  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (themeBtn) {
      themeBtn.innerHTML =
        theme === "dark" ? icons.sun : icons.moon;
    }
    try {
      localStorage.setItem("portfolio-theme", theme);
    } catch (e) {
      /* ignore storage errors */
    }
  }

  const icons = {
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>',
  };

  /* ---------------- Init from saved preference ---------------- */
  let savedLang = "en";
  let savedTheme = "dark";
  try {
    savedLang = localStorage.getItem("portfolio-lang") || "en";
    savedTheme = localStorage.getItem("portfolio-theme") || "dark";
  } catch (e) {
    /* ignore */
  }

  applyLanguage(savedLang);
  applyTheme(savedTheme);

  /* ---------------- Event listeners ---------------- */
  if (langBtn) {
    langBtn.addEventListener("click", () => {
      const current = root.getAttribute("lang") === "ar" ? "ar" : "en";
      applyLanguage(current === "ar" ? "en" : "ar");
    });
  }

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
      applyTheme(current === "dark" ? "light" : "dark");
    });
  }

  /* ---------------- 4) Typewriter effect for the code card ---------------- */
  function typewriter() {
    const el = document.getElementById("codeSnippet");
    if (!el) return;
    const original = el.innerHTML;
    const plain = el.innerText;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    el.innerHTML = "";
    let i = 0;
    const speed = 18;

    // Type out plain text first, then swap in the syntax-highlighted version
    const interval = setInterval(() => {
      el.innerText = plain.slice(0, i) ;
      i++;
      if (i > plain.length) {
        clearInterval(interval);
        el.innerHTML = original;
        const cursor = document.createElement("span");
        cursor.className = "code-cursor";
        el.appendChild(cursor);
      }
    }, speed);
  }

  /* ---------------- 5) Custom neon cursor (desktop only) ---------------- */
  function initCustomCursor() {
    const dot = document.getElementById("cursorDot");
    const ring = document.getElementById("cursorRing");
    if (!dot || !ring) return;

    // NOTE: we used to gate this entirely on `(pointer: fine)`, which checks
    // the *primary* pointer only. On many laptops (2-in-1s, touchscreen
    // models, some trackpad drivers) the primary pointer is reported as
    // "coarse" even though the trackpad/mouse works perfectly fine — so the
    // whole feature silently never turned on. An external mouse on a
    // desktop monitor doesn't have that ambiguity, which is why it worked
    // there but not on the laptop's own screen.
    // `(any-pointer: fine)` checks whether *any* connected input is fine,
    // which is a much more reliable signal, and we additionally wait for a
    // real mouse-type pointer event before activating anything.
    const mayHaveFinePointer = window.matchMedia("(any-pointer: fine)").matches;
    if (!mayHaveFinePointer) return;

    let ringX = window.innerWidth / 2;
    let ringY = window.innerHeight / 2;
    let mouseX = ringX;
    let mouseY = ringY;
    let active = false;

    function activate() {
      if (active) return;
      active = true;
      document.body.classList.add("has-custom-cursor");

      // smooth trailing ring — only starts once we know a real mouse is in use
      function loop() {
        ringX += (mouseX - ringX) * 0.18;
        ringY += (mouseY - ringY) * 0.18;
        ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
        requestAnimationFrame(loop);
      }
      loop();

      const interactiveSelector = "a, button, .tech-badge, .side-rail__icon, input, textarea";
      document.querySelectorAll(interactiveSelector).forEach((el) => {
        el.addEventListener("mouseenter", () => ring.classList.add("is-active"));
        el.addEventListener("mouseleave", () => ring.classList.remove("is-active"));
      });
    }

    window.addEventListener("pointermove", (e) => {
      // Ignore touch/pen input so a tap on a touchscreen laptop doesn't
      // leave a ghost cursor stuck in a corner.
      if (e.pointerType && e.pointerType !== "mouse") return;
      mouseX = e.clientX;
      mouseY = e.clientY;
      ringX = ringX || mouseX;
      ringY = ringY || mouseY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      activate();
    });

    document.addEventListener("mouseleave", () => {
      dot.classList.add("is-hidden");
      ring.classList.add("is-hidden");
    });
    document.addEventListener("mouseenter", () => {
      dot.classList.remove("is-hidden");
      ring.classList.remove("is-hidden");
    });
  }

  /* ---------------- 6) Subtle UI click sound ---------------- */
  let audioCtx = null;
  function playClickSound() {
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(560, audioCtx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.12);
      osc.connect(gain).connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.13);
    } catch (e) {
      /* Web Audio not available — fail silently */
    }
  }

  function initClickSound() {
    const soundTargets = document.querySelectorAll(
      ".nav-link, .btn, #themeToggle, #langToggle, #menuToggle, .side-rail__icon, .filter-chip, .project-card__demo, .project-card__code, #projectModalClose"
    );
    soundTargets.forEach((el) => {
      el.addEventListener("click", (e) => {
        playClickSound();
        // only same-tab links to other pages need a beat for the sound.
        // New-tab links (target="_blank"), downloads, mailto and in-page #anchors
        // keep their native behaviour — otherwise live demos replaced the portfolio tab.
        const rawHref = el.getAttribute("href") || "";
        const isNative =
          el.target === "_blank" ||
          el.hasAttribute("download") ||
          rawHref.startsWith("#") ||
          rawHref.startsWith("mailto:") ||
          rawHref.startsWith("tel:");
        if (el.tagName === "A" && rawHref && !isNative) {
          e.preventDefault();
          const dest = el.href;
          setTimeout(() => {
            window.location.href = dest;
          }, 140);
        }
      });
    });
  }

  /* ---------------- 7) Mobile drawer menu ---------------- */
  function initMobileDrawer() {
    const menuBtn = document.getElementById("menuToggle");
    const drawer = document.getElementById("mobileDrawer");
    const backdrop = document.getElementById("mobileDrawerBackdrop");
    if (!menuBtn || !drawer || !backdrop) return;

    function closeDrawer() {
      drawer.classList.remove("is-open");
      backdrop.classList.remove("is-open");
      menuBtn.classList.remove("is-open");
      document.body.classList.remove("drawer-open");
    }

    function openDrawer() {
      drawer.classList.add("is-open");
      backdrop.classList.add("is-open");
      menuBtn.classList.add("is-open");
      document.body.classList.add("drawer-open");
    }

    menuBtn.addEventListener("click", () => {
      const isOpen = drawer.classList.contains("is-open");
      isOpen ? closeDrawer() : openDrawer();
    });

    backdrop.addEventListener("click", closeDrawer);
    drawer.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeDrawer));

    window.addEventListener("resize", () => {
      if (window.innerWidth > 1024) closeDrawer();
    });
  }

  /* ---------------- 8) Animate skill bars when scrolled into view ---------------- */
  function initSkillBars() {
    const items = document.querySelectorAll(".skill-item");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      // Fallback: just fill them immediately
      items.forEach((item) => {
        const fill = item.querySelector(".skill-item__fill");
        if (fill) fill.style.width = (item.dataset.percent || 0) + "%";
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const item = entry.target;
          const fill = item.querySelector(".skill-item__fill");
          if (fill) fill.style.width = (item.dataset.percent || 0) + "%";
          observer.unobserve(item);
        });
      },
      { threshold: 0.4 }
    );

    items.forEach((item) => observer.observe(item));
  }

  /* ---------------- 9) Projects: filter tabs ---------------- */
  function initProjectFilters() {
    const chips = document.querySelectorAll(".filter-chip");
    const cards = document.querySelectorAll(".project-card");
    if (!chips.length) return;

    chips.forEach((chip) => {
      chip.addEventListener("click", () => {
        chips.forEach((c) => c.classList.remove("is-active"));
        chip.classList.add("is-active");
        const filter = chip.dataset.filter;
        cards.forEach((card) => {
          const match = filter === "all" || card.dataset.category === filter;
          card.classList.toggle("is-hidden", !match);
        });
      });
    });
  }

  /* ---------------- 10) Projects: subtle tilt-on-hover ---------------- */
  function initProjectTilt() {
    const isFine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isFine || reduced) return;

    document.querySelectorAll(".project-card").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform =
          "perspective(700px) rotateX(" + (-y * 6).toFixed(2) + "deg) " +
          "rotateY(" + (x * 8).toFixed(2) + "deg) translateY(-4px)";
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }

  /* ---------------- 11) Projects: staggered scroll reveal ---------------- */
  function initProjectReveal() {
    const cards = document.querySelectorAll(".project-card");
    if (!cards.length || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = Array.from(cards).indexOf(entry.target);
          entry.target.style.animationDelay = idx * 90 + "ms";
          entry.target.classList.add("fade-up");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15 }
    );

    cards.forEach((card) => observer.observe(card));
  }

  /* ---------------- 12) Projects: preview modal ---------------- */
  function initProjectModal() {
    const modal = document.getElementById("projectModal");
    const backdrop = document.getElementById("projectModalBackdrop");
    const closeBtn = document.getElementById("projectModalClose");
    const thumbHost = document.getElementById("projectModalThumb");
    const tagsHost = document.getElementById("projectModalTags");
    const titleHost = document.getElementById("projectModalTitle");
    const descHost = document.getElementById("projectModalDesc");
    if (!modal || !backdrop || !closeBtn) return;

    function openFromCard(card) {
      const media = card.querySelector(".thumb-svg, .thumb-img");
      const tags = card.querySelector(".project-card__tags");
      const title = card.querySelector(".project-card__title");
      const desc = card.querySelector(".project-card__desc");
      if (media) thumbHost.innerHTML = media.outerHTML;
      if (tags) tagsHost.innerHTML = tags.innerHTML;
      if (title) titleHost.textContent = title.textContent;
      if (desc) descHost.textContent = desc.textContent;

      // pass the card's real links to the modal buttons (they were "#" before)
      const demoSrc = card.querySelector(".project-card__demo");
      const codeSrc = card.querySelector(".project-card__code");
      const demoDst = modal.querySelector(".project-card__demo");
      const codeDst = modal.querySelector(".project-card__code");
      [[demoSrc, demoDst], [codeSrc, codeDst]].forEach(([from, to]) => {
        if (!from || !to) return;
        to.href = from.href;
        to.target = "_blank";
        to.rel = "noopener";
      });
      modal.classList.add("is-open");
      document.body.classList.add("drawer-open");
    }

    function closeModal() {
      modal.classList.remove("is-open");
      document.body.classList.remove("drawer-open");
    }

    document.querySelectorAll(".project-card__thumb").forEach((btn) => {
      btn.addEventListener("click", () => {
        const card = btn.closest(".project-card");
        if (card) openFromCard(card);
      });
    });

    backdrop.addEventListener("click", closeModal);
    closeBtn.addEventListener("click", closeModal);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
    });
  }

  /* ---------------- 13) Projects: View More toggle ---------------- */
  function initViewMoreProjects() {
    const btn = document.getElementById("viewMoreProjects");
    if (!btn) return;
    const extraCards = document.querySelectorAll(".project-card--extra");
    if (!extraCards.length) {
      btn.style.display = "none";
      return;
    }

    let expanded = false;
    const viewAll = document.querySelector(".projects__viewall");
    if (viewAll) {
      viewAll.addEventListener("click", () => {
        if (!btn.classList.contains("is-expanded")) btn.click();
      });
    }
    const labelSpan = btn.querySelector("span");
    const moreText = labelSpan ? labelSpan.textContent : "";

    btn.addEventListener("click", () => {
      expanded = !expanded;
      extraCards.forEach((card) => {
        card.classList.toggle("extra-hidden", !expanded);
      });
      btn.classList.toggle("is-expanded", expanded);
      if (labelSpan) {
        labelSpan.setAttribute(
          "data-i18n",
          expanded ? "view_less_projects" : "view_more_projects"
        );
        const lang = document.documentElement.getAttribute("lang") || "en";
        const dict = translations[lang] || translations.en;
        const key = expanded ? "view_less_projects" : "view_more_projects";
        labelSpan.textContent = dict[key] || moreText;
      }
      if (expanded) {
        btn.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    });
  }

  window.addEventListener("DOMContentLoaded", () => {
    setTimeout(typewriter, 400);
    initCustomCursor();
    initClickSound();
    initMobileDrawer();
    initSkillBars();
    initProjectFilters();
    initProjectTilt();
    initProjectReveal();
    initProjectModal();
    initViewMoreProjects();
  });
})();
