/* =========================================================
   ASTREA™ PRESENTATION
   Animation Controller
   ========================================================= */


function prepareSlide(slide) {

    slide.classList.remove(
        "is-active",
        "is-entering",
        "is-leaving",
        "is-leaving-next",
        "is-entering-from-hero"
    );

}


function activateSlide(slide) {

    slide.classList.remove(
        "is-entering",
        "is-leaving",
        "is-leaving-next",
        "is-entering-from-hero"
    );

    slide.classList.add("is-active");

}


function deactivateSlide(slide) {

    slide.classList.remove(
        "is-active",
        "is-entering",
        "is-leaving",
        "is-leaving-next",
        "is-entering-from-hero"
    );

}


window.ASTREAAnimations = {
    prepareSlide,
    activateSlide,
    deactivateSlide
};