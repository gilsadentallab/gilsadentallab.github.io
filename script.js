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

