/* =========================================================
   ASTREA™ PRESENTATION
   Micro Parallax v1.0
   ========================================================= */


/* =========================================================
   CAPABILITY
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
     * El parallax sólo trabaja sobre el slide activo.
     *
     * Esto evita realizar cálculos sobre escenas
     * que actualmente no están visibles.
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
         * Movimiento máximo base.
         *
         * Horizontal: 10px
         * Vertical:    7px
         *
         * data-parallax funciona como multiplicador.
         *
         * Ejemplo:
         *
         * data-parallax="0.7"
         *
         * X máximo ≈ 7px
         * Y máximo ≈ 4.9px
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
     * Convertimos la posición del puntero
     * a un rango relativo al centro:
     *
     * X
     * -1 = extremo izquierdo
     *  0 = centro
     * +1 = extremo derecho
     *
     * Y
     * -1 = extremo superior
     *  0 = centro
     * +1 = extremo inferior
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
     * Máximo una actualización por frame.
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

    /*
     * No activamos parallax:
     *
     * - en dispositivos sin puntero preciso;
     * - cuando el usuario solicita movimiento reducido.
     */

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
