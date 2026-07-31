(() => {
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const navigation = document.querySelector("[data-navigation]");
  const navigationLinks = navigation
    ? navigation.querySelectorAll("a")
    : [];
  const currentYear = document.querySelector("[data-current-year]");
  const revealItems = document.querySelectorAll(".reveal");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  const closeMenu = () => {
    if (!menuToggle || !navigation) return;

    menuToggle.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
    document.body.classList.remove("menu-open");

    const label = menuToggle.querySelector(".sr-only");
    if (label) label.textContent = "Open navigation";
  };

  const openMenu = () => {
    if (!menuToggle || !navigation) return;

    menuToggle.setAttribute("aria-expanded", "true");
    navigation.classList.add("is-open");
    document.body.classList.add("menu-open");

    const label = menuToggle.querySelector(".sr-only");
    if (label) label.textContent = "Close navigation";
  };

  if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      isOpen ? closeMenu() : openMenu();
    });

    navigationLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 860) closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, activeObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        activeObserver.unobserve(entry.target);
      });
    },
    {
      root: null,
      rootMargin: "0px 0px -10% 0px",
      threshold: 0.12,
    }
  );

  revealItems.forEach((item) => observer.observe(item));
})();
