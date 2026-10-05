const navContainer = document.querySelector(".nav-container");
const menuToggle = document.querySelector("#mobile-menu");
const navMenu = document.querySelector("#nav-menu");

if (navContainer && menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
        menuToggle.setAttribute("aria-expanded", String(!isExpanded));
        menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation menu" : "Close navigation menu");
        navContainer.classList.toggle("nav-open", !isExpanded);
    });

    navMenu.addEventListener("click", (event) => {
        if (event.target instanceof HTMLAnchorElement) {
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
            navContainer.classList.remove("nav-open");
        }
    });
}

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.classList.contains("active")));

    button.addEventListener("click", () => {
        const filter = button.dataset.filter;

        filterButtons.forEach((filterButton) => {
            const isActive = filterButton === button;
            filterButton.classList.toggle("active", isActive);
            filterButton.setAttribute("aria-pressed", String(isActive));
        });

        projectCards.forEach((card) => {
            const categories = card.dataset.category.split(/\s+/);
            card.hidden = filter !== "all" && !categories.includes(filter);
        });
    });
});

const year = document.querySelector("#year");
if (year) {
    year.textContent = String(new Date().getFullYear());
}

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const motionTargets = document.querySelectorAll(
    ".section.reveal > .container > *, .stat-card, .timeline-item, .project-card, .arch-node, .skill-category"
);

if (!prefersReducedMotion && "IntersectionObserver" in window) {
    motionTargets.forEach((target) => {
        const siblings = Array.from(target.parentElement.children);
        const siblingIndex = siblings.indexOf(target);
        target.classList.add("motion-item");
        target.style.setProperty("--motion-delay", `${(siblingIndex % 4) * 85}ms`);
    });

    document.documentElement.classList.add("motion-ready");

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: "0px 0px -36px 0px"
    });

    motionTargets.forEach((target) => revealObserver.observe(target));
}
