(() => {
  const header = document.querySelector("[data-header]");
  const toggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");

  if (header && toggle && nav) {
    const closeMenu = () => {
      header.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    };

    toggle.addEventListener("click", () => {
      const isOpen = header.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 860) {
        closeMenu();
      }
    });
  }

  document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });

  document.querySelectorAll("[data-cover-slideshow]").forEach((slideshow) => {
    const slides = Array.from(slideshow.querySelectorAll(".project-cover__image"));
    if (slides.length <= 1) {
      return;
    }

    const prev = slideshow.querySelector("[data-slide-prev]");
    const next = slideshow.querySelector("[data-slide-next]");
    const dotsWrap = slideshow.querySelector("[data-slide-dots]");
    const captionOutput = slideshow.querySelector("[data-slide-caption-output]");
    const dots = [];
    let current = 0;

    const render = (index) => {
      current = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        const active = i === current;
        slide.classList.toggle("is-active", active);
        slide.setAttribute("aria-hidden", String(!active));
      });
      dots.forEach((dot, i) => {
        dot.classList.toggle("is-active", i === current);
        dot.setAttribute("aria-current", i === current ? "true" : "false");
      });
      if (captionOutput) {
        captionOutput.textContent = slides[current].dataset.slideCaption || "";
      }
    };

    if (dotsWrap) {
      slides.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "project-cover__dot";
        dot.setAttribute("aria-label", `Show image ${i + 1}`);
        dot.addEventListener("click", () => render(i));
        dotsWrap.appendChild(dot);
        dots.push(dot);
      });
    }

    prev?.addEventListener("click", () => render(current - 1));
    next?.addEventListener("click", () => render(current + 1));
    render(0);
  });
})();
