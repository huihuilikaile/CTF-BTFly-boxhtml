(() => {
  const header = document.querySelector("[data-header]");
  const menuButton = document.querySelector("[data-menu-button]");
  const mobileNav = document.querySelector("[data-mobile-nav]");
  const lightbox = document.querySelector("[data-lightbox]");
  const lightboxImage = lightbox?.querySelector("img");
  const closeButton = lightbox?.querySelector("[data-lightbox-close]");

  const updateHeader = () => {
    header?.classList.toggle("scrolled", window.scrollY > 18);
  };

  const closeMenu = () => {
    menuButton?.setAttribute("aria-expanded", "false");
    mobileNav?.classList.remove("open");
    header?.classList.remove("menu-open");
    document.body.classList.remove("menu-open");
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  menuButton?.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.setAttribute("aria-expanded", String(open));
    mobileNav?.classList.toggle("open", open);
    header?.classList.toggle("menu-open", open);
    document.body.classList.toggle("menu-open", open);
  });

  mobileNav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.querySelectorAll("[data-lightbox-src]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      if (!lightbox || !lightboxImage) return;
      lightboxImage.src = trigger.dataset.lightboxSrc;
      if (typeof lightbox.showModal === "function") {
        lightbox.showModal();
      } else {
        lightbox.setAttribute("open", "");
      }
    });
  });

  const closeLightbox = () => {
    if (!lightbox) return;
    if (typeof lightbox.close === "function") {
      lightbox.close();
    } else {
      lightbox.removeAttribute("open");
    }
    if (lightboxImage) lightboxImage.src = "";
  };

  closeButton?.addEventListener("click", closeLightbox);
  lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    closeMenu();
    if (lightbox?.open) closeLightbox();
  });
})();
