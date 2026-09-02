/* =========================================================
   ASTREA™ PRESENTATION
   Build v0.1
   ========================================================= */


/* =========================================================
   SLIDE REVEALS
   ========================================================= */

const slides = document.querySelectorAll(".slide");


const observerOptions = {
    root: null,
    threshold: 0.32
};


const slideObserver = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (!entry.isIntersecting) {
            return;
        }


        entry.target.classList.add("is-visible");


        /*
         * Cada escena ejecuta su reveal una sola vez.
         *
         * Las futuras transiciones de scroll se resolverán
         * independientemente de este comportamiento.
         */

        slideObserver.unobserve(entry.target);

    });

}, observerOptions);


slides.forEach((slide) => {
    slideObserver.observe(slide);
});
