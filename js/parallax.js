/* =========================================================
   ASTREA™ PRESENTATION
   Micro Parallax v1.0
   ========================================================= */


/* =========================================================
   CONFIG
   ========================================================= */

const parallaxPointerQuery =
    window.matchMedia(
        "(hover: hover) and (pointer: fine)"
    );


const parallaxMotionQuery =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );


/* =========================================================
   STATE
   ========================================================= */

let parallaxFrame = null;

let pointerX = 0;
let pointerY = 0;


/* =========================================================
   UPDATE
   ========================================================= */

function updateParallax() {

    /*
     * Sólo trabajamos sobre el slide actualmente activo.
     *
     * Los slides ocultos no reciben cálculos ni transforms.
     */

    const activeSlide =
        document.querySelector(
            ".slide.is-active"
        );


    if (!activeSlide) {

        parallaxFrame = null;

        return;

    }


    const layers =
        activeSlide.querySelectorAll(
            "[data-parallax]"
        );


    layers.forEach((layer) => {

        const depth =
            Number(
                layer.dataset.parallax
            ) || 1;


        /*
         * Movimiento máximo base:
         *
         * Horizontal: 10px
         * Vertical:    7px
         *
         * data-parallax actúa como multiplicador.
         */

        const movementX =
            pointerX * 10 * depth;


        const movementY =
            pointerY * 7 * depth;


        layer.style.setProperty(
            "--parallax-x",
            `${movementX}px`
        );


        layer.style.setProperty(
            "--parallax-y",
            `${movementY}px`
        );

    });


    parallaxFrame = null;

}


/* =========================================================
   POINTER
   ========================================================= */

function handlePointerMove(event) {

    /*
     * Normalización respecto al centro del viewport:
     *
     * X: -1 ← 0 → +1
     * Y: -1 ↑ 0 ↓ +1
     */

    pointerX =
        (
            event.clientX /
            window.innerWidth
        ) * 2 - 1;


    pointerY =
        (
            event.clientY /
            window.innerHeight
        ) * 2 - 1;


    /*
     * Un único cálculo por frame.
     */

    if (parallaxFrame !== null) {
        return;
    }


    parallaxFrame =
        requestAnimationFrame(
            updateParallax
        );

}


/* =========================================================
   INIT
   ========================================================= */

function initParallax() {

    if (
        !parallaxPointerQuery.matches ||
        parallaxMotionQuery.matches
    ) {
        return;
    }


    window.addEventListener(
        "pointermove",
        handlePointerMove,
        {
            passive: true
        }
    );

}


initParallax();