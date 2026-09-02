/* =========================================================
   ASTREA™ PRESENTATION
   Presentation Controller v0.2
   ========================================================= */


const slides = Array.from(
    document.querySelectorAll(".slide")
);


const navigatorButton = document.querySelector(
    ".presentation-navigator"
);


let currentIndex = 0;

let isTransitioning = false;


/*
 * Timing global.
 *
 * Después de probar la sensación real podremos
 * afinar estos valores.
 */

const STANDARD_EXIT_DURATION = 400;
const STANDARD_ENTER_DELAY = 120;
const STANDARD_TRANSITION_DURATION = 900;

const HERO_TRANSITION_DURATION = 760;


/* =========================================================
   INITIAL STATE
   ========================================================= */

slides.forEach((slide, index) => {

    if (index === currentIndex) {

        slide.classList.add("is-active");

        slide.removeAttribute("aria-hidden");

        return;

    }


    slide.classList.remove("is-active");

    slide.setAttribute(
        "aria-hidden",
        "true"
    );

});


updateNavigator();


/* =========================================================
   NAVIGATION
   ========================================================= */

function goToSlide(targetIndex) {

    if (isTransitioning) {
        return;
    }


    if (
        targetIndex < 0 ||
        targetIndex >= slides.length ||
        targetIndex === currentIndex
    ) {
        return;
    }


    const direction =
        targetIndex > currentIndex
            ? "next"
            : "previous";


    const currentSlide =
        slides[currentIndex];


    const targetSlide =
        slides[targetIndex];


    isTransitioning = true;


    /*
     * Special transition:
     * Hero 01 → Slide 02
     */

    if (
        currentIndex === 0 &&
        targetIndex === 1
    ) {

        transitionHeroToSlide02(
            currentSlide,
            targetSlide,
            targetIndex
        );

        return;
    }


    /*
     * Standard content transition.
     */

    transitionStandard(
        currentSlide,
        targetSlide,
        targetIndex,
        direction
    );

}


/* =========================================================
   HERO → SLIDE 02
   ========================================================= */

function transitionHeroToSlide02(
    currentSlide,
    targetSlide,
    targetIndex
) {

    targetSlide.classList.add(
        "is-entering-from-hero"
    );

    targetSlide.removeAttribute(
        "aria-hidden"
    );


    /*
     * Force browser to commit the initial state
     * before triggering the transition.
     */

    requestAnimationFrame(() => {

        requestAnimationFrame(() => {

            currentSlide.classList.add(
                "is-leaving-next"
            );

            targetSlide.classList.add(
                "is-entering"
            );

        });

    });


    window.setTimeout(() => {

        ASTREAAnimations.deactivateSlide(
            currentSlide
        );


        ASTREAAnimations.activateSlide(
            targetSlide
        );


        currentSlide.setAttribute(
            "aria-hidden",
            "true"
        );


        finishTransition(
            targetIndex
        );

    }, HERO_TRANSITION_DURATION);

}


/* =========================================================
   STANDARD TRANSITION
   ========================================================= */

function transitionStandard(
    currentSlide,
    targetSlide,
    targetIndex,
    direction
) {

    currentSlide.classList.add(
        "is-leaving"
    );


    window.setTimeout(() => {

        targetSlide.classList.add(
            "is-entering"
        );

        targetSlide.removeAttribute(
            "aria-hidden"
        );


        window.setTimeout(() => {

            ASTREAAnimations.deactivateSlide(
                currentSlide
            );


            ASTREAAnimations.activateSlide(
                targetSlide
            );


            currentSlide.setAttribute(
                "aria-hidden",
                "true"
            );


            finishTransition(
                targetIndex
            );

        }, STANDARD_TRANSITION_DURATION - STANDARD_EXIT_DURATION);

    }, STANDARD_EXIT_DURATION + STANDARD_ENTER_DELAY);

}


/* =========================================================
   FINISH
   ========================================================= */

function finishTransition(targetIndex) {

    currentIndex = targetIndex;

    isTransitioning = false;

    updateNavigator();

}


/* =========================================================
   GLOBAL NAVIGATOR
   ========================================================= */

function updateNavigator() {

    /*
     * Hidden only on Hero 01 for now.
     */

    navigatorButton.hidden =
        currentIndex === 0;

}


navigatorButton.addEventListener(
    "click",
    () => {

        goToSlide(0);

    }
);


/* =========================================================
   WHEEL
   ========================================================= */

let wheelAccumulator = 0;

let wheelResetTimer = null;

const WHEEL_THRESHOLD = 45;


window.addEventListener(
    "wheel",
    (event) => {

        event.preventDefault();


        if (isTransitioning) {
            return;
        }


        wheelAccumulator += event.deltaY;


        window.clearTimeout(
            wheelResetTimer
        );


        wheelResetTimer =
            window.setTimeout(() => {

                wheelAccumulator = 0;

            }, 160);


        if (
            Math.abs(wheelAccumulator)
            < WHEEL_THRESHOLD
        ) {
            return;
        }


        if (wheelAccumulator > 0) {

            goToSlide(
                currentIndex + 1
            );

        } else {

            goToSlide(
                currentIndex - 1
            );

        }


        wheelAccumulator = 0;

    },
    {
        passive: false
    }
);


/* =========================================================
   KEYBOARD
   ========================================================= */

window.addEventListener(
    "keydown",
    (event) => {

        if (isTransitioning) {
            return;
        }


        switch (event.key) {

            case "ArrowDown":
            case "PageDown":
            case " ":

                event.preventDefault();

                goToSlide(
                    currentIndex + 1
                );

                break;


            case "ArrowUp":
            case "PageUp":

                event.preventDefault();

                goToSlide(
                    currentIndex - 1
                );

                break;


            case "Home":

                event.preventDefault();

                goToSlide(0);

                break;


            case "End":

                event.preventDefault();

                goToSlide(
                    slides.length - 1
                );

                break;

        }

    }
);