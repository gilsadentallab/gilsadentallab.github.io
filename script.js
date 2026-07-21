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

window.addEventListener("scroll",()=>{

    const header=document.querySelector("header");

    if(window.scrollY>50){

        header.style.background="rgba(10,10,10,.97)";

    }else{

        header.style.background="rgba(15,17,21,.92)";

    }

});
