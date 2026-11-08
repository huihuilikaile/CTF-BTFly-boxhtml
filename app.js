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

  // 多页站：按 body[data-page] 标记当前页，供样式与读屏软件识别。
  const currentPage = document.body.dataset.page;
  if (currentPage) {
    document.querySelectorAll("[data-nav]").forEach((link) => {
      if (link.dataset.nav === currentPage) {
        link.setAttribute("aria-current", "page");
      }
    });
  }

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

  // FAQ：支持「全部展开 / 全部收起」，并在直接访问带锚点的条目时自动展开。
  const faqItems = () => Array.from(document.querySelectorAll("details.faq-item"));
  const faqToggle = document.querySelector("[data-faq-all]");

  const openHashTarget = () => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    let node = target;
    while (node) {
      if (node.tagName === "DETAILS") node.open = true;
      node = node.parentElement;
    }
  };

  if (faqToggle) {
    const allOpen = () => {
      const items = faqItems();
      return items.length > 0 && items.every((item) => item.open);
    };
    const syncLabel = () => {
      const open = allOpen();
      faqToggle.textContent = open ? "全部收起" : "全部展开";
      faqToggle.setAttribute("aria-expanded", String(open));
    };

    faqToggle.addEventListener("click", () => {
      const open = allOpen();
      faqItems().forEach((item) => {
        item.open = !open;
      });
      syncLabel();
    });

    faqItems().forEach((item) => item.addEventListener("toggle", syncLabel));
    syncLabel();
  }

  openHashTarget();
  window.addEventListener("hashchange", openHashTarget);
})();
