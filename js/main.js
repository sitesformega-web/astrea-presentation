/* =========================================================
   ASTREA™ PRESENTATION
   Slide visibility
   ========================================================= */

const animatedSlides = document.querySelectorAll(".slide:not(.slide--hero)");

const observerOptions = {
    root: null,
    threshold: 0.35
};

const slideObserver = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (!entry.isIntersecting) {
            return;
        }

        entry.target.classList.add("is-visible");

        /*
         * La animación ocurre una sola vez.
         * Una vez presentada la escena, dejamos de observarla.
         */
        slideObserver.unobserve(entry.target);

    });

}, observerOptions);


animatedSlides.forEach((slide) => {
    slideObserver.observe(slide);
});
