(() => {
  const root = document.documentElement;
  const header = document.querySelector("[data-header]");
  const menuButton = document.querySelector("[data-menu-button]");
  const mobileNav = document.querySelector("[data-mobile-nav]");
  const themeToggle = document.querySelector("[data-theme-toggle]");
  const lightbox = document.querySelector("[data-lightbox]");
  const lightboxImage = lightbox?.querySelector("img");

  const storedTheme = (() => {
    try { return localStorage.getItem("ctf-btfly-site-theme"); } catch { return null; }
  })();
  if (storedTheme === "light") root.dataset.siteTheme = "light";

  themeToggle?.addEventListener("click", () => {
    const nextTheme = root.dataset.siteTheme === "light" ? "dark" : "light";
    if (nextTheme === "light") root.dataset.siteTheme = "light";
    else delete root.dataset.siteTheme;
    try { localStorage.setItem("ctf-btfly-site-theme", nextTheme); } catch { /* Storage may be unavailable on local files. */ }
  });

  const syncHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 18);
  syncHeader();
  window.addEventListener("scroll", syncHeader, { passive: true });

  menuButton?.addEventListener("click", () => {
    const open = !mobileNav?.classList.contains("is-open");
    mobileNav?.classList.toggle("is-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
  });
  mobileNav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("is-open");
      menuButton?.setAttribute("aria-expanded", "false");
    });
  });

  const observer = "IntersectionObserver" in window
    ? new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -30px" })
    : null;

  document.querySelectorAll(".reveal").forEach((element) => {
    if (observer) observer.observe(element);
    else element.classList.add("is-visible");
  });

  const openLightbox = (source) => {
    if (!lightbox || !lightboxImage || !source) return;
    lightboxImage.src = source;
    if (typeof lightbox.showModal === "function") lightbox.showModal();
  };
  document.querySelectorAll("[data-lightbox-src]").forEach((trigger) => {
    trigger.addEventListener("click", () => openLightbox(trigger.dataset.lightboxSrc));
  });
  lightbox?.querySelector("[data-lightbox-close]")?.addEventListener("click", () => lightbox.close());
  lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) lightbox.close();
  });

  // Re-apply deep links after images establish their layout dimensions.
  window.addEventListener("load", () => {
    if (!location.hash) return;
    const target = document.querySelector(location.hash);
    if (target) requestAnimationFrame(() => target.scrollIntoView({ block: "start" }));
  });
})();
