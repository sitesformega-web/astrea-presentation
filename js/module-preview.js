/* =========================================================
   ASTREA™ PRESENTATION
   Module Preview v1.0
   ========================================================= */


/* =========================================================
   CONFIGURATION
   ========================================================= */

const modulePreviewData = {

    vitrina: {
        src:
            "./assets/images/slide-05-vitrina.png",

        alt:
            "Vista del módulo Vitrina ASTREA"
    },


    pedidos: {
        src:
            "./assets/images/slide-05-pedidos.png",

        alt:
            "Vista del módulo Pedidos"
    },


    productos: {
        src:
            "./assets/images/slide-05-productos.png",

        alt:
            "Vista del módulo Productos"
    },


    clientes: {
        src:
            "./assets/images/slide-05-clientes.png",

        alt:
            "Vista del módulo Clientes"
    },


    negocio: {
        src:
            "./assets/images/slide-05-negocio.png",

        alt:
            "Vista del módulo Negocio"
    }

};


/* =========================================================
   INIT
   ========================================================= */

function initModulePreview() {

    const slide =
        document.querySelector(
            ".slide--05"
        );


    if (!slide) {
        return;
    }


    const buttons =
        Array.from(
            slide.querySelectorAll(
                "[data-preview]"
            )
        );


    const preview =
        slide.querySelector(
            ".slide-05__preview"
        );


    const previewImage =
        slide.querySelector(
            ".slide-05__preview-image"
        );


    if (
        buttons.length === 0 ||
        !preview ||
        !previewImage
    ) {
        return;
    }


    /* =====================================================
       STATE
       ===================================================== */

    let activePreview = "vitrina";

    let switchTimer = null;


    /* =====================================================
       BUTTON STATE
       ===================================================== */

    function updateButtons(nextPreview) {

        buttons.forEach((button) => {

            const isActive =
                button.dataset.preview ===
                nextPreview;


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
       PREVIEW SWITCH
       ===================================================== */

    function switchPreview(nextPreview) {

        const nextData =
            modulePreviewData[nextPreview];


        if (
            !nextData ||
            nextPreview === activePreview
        ) {
            return;
        }


        /*
         * Actualizamos el botón inmediatamente.
         *
         * El usuario recibe feedback instantáneo
         * aunque la imagen todavía esté transitando.
         */

        updateButtons(nextPreview);


        /*
         * Inicia salida del preview actual.
         */

        preview.classList.add(
            "is-switching"
        );


        if (switchTimer) {
            window.clearTimeout(
                switchTimer
            );
        }


        switchTimer =
            window.setTimeout(() => {

                /*
                 * Cambiamos el asset cuando la imagen
                 * anterior ya perdió opacidad.
                 */

                previewImage.src =
                    nextData.src;


                previewImage.alt =
                    nextData.alt;


                /*
                 * Actualizamos semántica del panel.
                 */

                const activeButton =
                    buttons.find(
                        (button) =>
                            button.dataset.preview ===
                            nextPreview
                    );


                if (activeButton) {

                    preview.setAttribute(
                        "aria-labelledby",
                        activeButton.id
                    );

                }


                /*
                 * Esperamos a que el nuevo asset
                 * esté listo antes de mostrarlo.
                 */

                const revealNewPreview = () => {

                    requestAnimationFrame(() => {

                        preview.classList.remove(
                            "is-switching"
                        );

                    });

                };


                if (previewImage.complete) {

                    revealNewPreview();

                } else {

                    previewImage.addEventListener(
                        "load",
                        revealNewPreview,
                        {
                            once: true
                        }
                    );

                }


                activePreview =
                    nextPreview;


                switchTimer = null;

            }, 180);

    }


    /* =====================================================
       EVENTS
       ===================================================== */

    buttons.forEach((button) => {

        button.addEventListener(
            "click",
            (event) => {

                /*
                 * La interacción pertenece exclusivamente
                 * al selector interno del Slide 05.
                 */

                event.stopPropagation();


                const nextPreview =
                    button.dataset.preview;


                switchPreview(
                    nextPreview
                );

            }
        );

    });

}


/* =========================================================
   START
   ========================================================= */

initModulePreview();