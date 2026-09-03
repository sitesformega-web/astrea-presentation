/* =========================================================
   ASTREA™ PRESENTATION
   Dual Hero v1.0
   ========================================================= */


/* =========================================================
   CONFIGURATION
   ========================================================= */

const dualHeroData = {

    offer: {

        description:
            "Tu negocio con una vitrina amigable y adaptable, enfocada a impulsar tus oportunidades comerciales.",

        backgroundClass:
            "slide-06__background--offer"

    },


    admin: {

        description:
            "Sumá herramientas administrativas para gestionar la información y las operaciones de tu negocio.",

        backgroundClass:
            "slide-06__background--admin"

    }

};


/* =========================================================
   INIT
   ========================================================= */

function initDualHero() {

    const slide =
        document.querySelector(
            ".slide--06"
        );


    if (!slide) {
        return;
    }


    const buttons =
        Array.from(
            slide.querySelectorAll(
                "[data-hero-mode]"
            )
        );


    const backgrounds =
        Array.from(
            slide.querySelectorAll(
                ".slide-06__background"
            )
        );


    const description =
        slide.querySelector(
            ".slide-06__description"
        );


    const semanticPanel =
        slide.querySelector(
            ".slide-06__semantic-panel"
        );


    if (
        buttons.length === 0 ||
        backgrounds.length === 0 ||
        !description
    ) {
        return;
    }


    /* =====================================================
       STATE
       ===================================================== */

    let activeMode = "offer";

    let switchTimer = null;

    let revealFrame = null;


    /* =====================================================
       BUTTONS
       ===================================================== */

    function updateButtons(nextMode) {

        buttons.forEach((button) => {

            const isActive =
                button.dataset.heroMode ===
                nextMode;


            button.classList.toggle(
                "is-active",
                isActive
            );


            button.setAttribute(
                "aria-selected",
                String(isActive)
            );

        });

    }


    /* =====================================================
       BACKGROUND
       ===================================================== */

    function updateBackground(nextMode) {

        const nextData =
            dualHeroData[nextMode];


        backgrounds.forEach((background) => {

            const isTarget =
                background.classList.contains(
                    nextData.backgroundClass
                );


            background.classList.toggle(
                "is-active",
                isTarget
            );

        });

    }


    /* =====================================================
       SEMANTICS
       ===================================================== */

    function updateSemantics(nextMode) {

        if (!semanticPanel) {
            return;
        }


        const activeButton =
            buttons.find(
                (button) =>
                    button.dataset.heroMode ===
                    nextMode
            );


        if (activeButton) {

            semanticPanel.setAttribute(
                "aria-labelledby",
                activeButton.id
            );

        }


        semanticPanel.textContent =
            dualHeroData[nextMode].description;

    }


    /* =====================================================
       DESCRIPTION
       ===================================================== */

    function updateDescription(nextMode) {

        const nextData =
            dualHeroData[nextMode];


        /*
         * Comienza la salida del texto actual.
         */

        description.classList.remove(
            "is-preparing"
        );


        description.classList.add(
            "is-switching"
        );


        if (switchTimer) {

            window.clearTimeout(
                switchTimer
            );

        }


        if (revealFrame) {

            window.cancelAnimationFrame(
                revealFrame
            );

            revealFrame = null;

        }


        switchTimer =
            window.setTimeout(() => {

                /*
                 * Cambiamos el contenido mientras
                 * permanece invisible.
                 */

                description.textContent =
                    nextData.description;


                description.classList.remove(
                    "is-switching"
                );


                description.classList.add(
                    "is-preparing"
                );


                /*
                 * Forzamos un frame independiente
                 * antes de iniciar la entrada.
                 */

                revealFrame =
                    window.requestAnimationFrame(
                        () => {

                            revealFrame =
                                window.requestAnimationFrame(
                                    () => {

                                        description.classList.remove(
                                            "is-preparing"
                                        );


                                        revealFrame = null;

                                    }
                                );

                        }
                    );


                switchTimer = null;

            }, 180);

    }


    /* =====================================================
       SWITCH
       ===================================================== */

    function switchHero(nextMode) {

        if (
            !dualHeroData[nextMode] ||
            nextMode === activeMode
        ) {
            return;
        }


        /*
         * Feedback inmediato del control.
         */

        updateButtons(
            nextMode
        );


        /*
         * El fondo inicia su crossfade inmediatamente.
         */

        updateBackground(
            nextMode
        );


        /*
         * El texto cambia con su propia microtransición.
         */

        updateDescription(
            nextMode
        );


        updateSemantics(
            nextMode
        );


        slide.dataset.dualHeroState =
            nextMode;


        activeMode =
            nextMode;

    }


    /* =====================================================
       EVENTS
       ===================================================== */

    buttons.forEach((button) => {

        button.addEventListener(
            "click",
            (event) => {

                /*
                 * La interacción pertenece al Hero.
                 */

                event.stopPropagation();


                const nextMode =
                    button.dataset.heroMode;


                switchHero(
                    nextMode
                );

            }
        );

    });


    /* =====================================================
       INITIAL SEMANTICS
       ===================================================== */

    updateSemantics(
        activeMode
    );

}


/* =========================================================
   START
   ========================================================= */

initDualHero();