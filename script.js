// Smooth appearance animation

document.addEventListener("DOMContentLoaded", () => {

    const elements = document.querySelectorAll(".hero,.about,.services,.contact");

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if(entry.isIntersecting){

                entry.target.classList.add("show");

            }

        });

    },{

        threshold:0.2

    });

    elements.forEach(el=>observer.observe(el));

});

// Hide Header On Scroll

let lastScroll = 0;
const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    let currentScroll = window.pageYOffset;

    if(currentScroll <= 0){
        header.style.transform = "translateY(0)";
        return;
    }

    if(currentScroll > lastScroll){
        // Scroll Down
        header.style.transform = "translateY(-120px)";
    }else{
        // Scroll Up
        header.style.transform = "translateY(0)";
    }

    lastScroll = currentScroll;
});
