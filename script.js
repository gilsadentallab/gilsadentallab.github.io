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

// Header background on scroll

window.addEventListener("scroll", () => {

    const header = document.querySelector("header");

    if (window.scrollY > 50) {

        header.style.background = "rgba(255,255,255,.98)";
        header.style.borderBottom = "1px solid #e8e8e8";
        header.style.boxShadow = "0 5px 20px rgba(0,0,0,.08)";

    } else {

        header.style.background = "rgba(255,255,255,.96)";
        header.style.borderBottom = "1px solid #e8e8e8";
        header.style.boxShadow = "none";

    }

});
