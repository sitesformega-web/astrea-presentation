const navigationButtons = document.querySelectorAll(
    ".presentation-nav .presentation-button"
);

navigationButtons.forEach((button) => {
    button.addEventListener("click", () => {
        navigationButtons.forEach((item) => {
            item.classList.remove("is-active");
            item.removeAttribute("aria-current");
        });

        button.classList.add("is-active");
        button.setAttribute("aria-current", "page");
    });
});