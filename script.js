/*=========================================
            DOM LOADED
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*==============================
            REVEAL
    ==============================*/

    const reveals = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if(entry.isIntersecting){

                entry.target.classList.add("show");

                observer.unobserve(entry.target);

            }

        });

    },{

        threshold:.2

    });

    reveals.forEach(el=>observer.observe(el));



    /*==============================
            HEADER
    ==============================*/

    const header = document.querySelector("header");

    let lastScroll = 0;

    window.addEventListener("scroll",()=>{

        const current = window.pageYOffset;

        // Header Style

        if(current > 60){

            header.classList.add("scrolled");

        }else{

            header.classList.remove("scrolled");

        }

        // Hide On Scroll Down

        if(current > lastScroll && current > 120){

            header.style.transform="translateY(-120px)";

        }else{

            header.style.transform="translateY(0)";

        }

        lastScroll=current;

    });



    /*==============================
            PRELOADER
    ==============================*/

    const preloader=document.getElementById("preloader");

    if(preloader){

        window.addEventListener("load",()=>{

            setTimeout(()=>{

                preloader.classList.add("hide");

            },600);

        });

    }

});
/*=========================================
        BACK TO TOP
=========================================*/

const backToTop = document.querySelector(".back-to-top");

if(backToTop){

    window.addEventListener("scroll",()=>{

        if(window.scrollY > 500){

            backToTop.classList.add("show");

        }else{

            backToTop.classList.remove("show");

        }

    });

    backToTop.addEventListener("click",()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}


/*=========================================
        SCROLL PROGRESS BAR
=========================================*/

const progressBar = document.querySelector(".progress-bar");

if(progressBar){

    window.addEventListener("scroll",()=>{

        const scroll =
        document.documentElement.scrollTop;

        const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

        const progress = (scroll / height) * 100;

        progressBar.style.width = progress + "%";

    });

}


/*=========================================
            ACTIVE MENU
=========================================*/

const sections = document.querySelectorAll("section[id]");

const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll",()=>{

    let current = "";

    sections.forEach(section=>{

        const top = section.offsetTop - 150;

        const height = section.offsetHeight;

        if(window.scrollY >= top){

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")==="#" + current){

            link.classList.add("active");

        }

    });

});


/*=========================================
            SMOOTH SCROLL
=========================================*/

navLinks.forEach(link=>{

    link.addEventListener("click",function(e){

        const target =
        document.querySelector(this.getAttribute("href"));

        if(target){

            e.preventDefault();

            target.scrollIntoView({

                behavior:"smooth",

                block:"start"

            });

        }

    });

});
/*=========================================
            LIGHTBOX
=========================================*/

const galleryItems =
document.querySelectorAll(".gallery-item img");

const lightbox =
document.querySelector(".lightbox");

const lightboxImg =
document.getElementById("lightbox-img");

const closeLightbox =
document.querySelector(".close-lightbox");

galleryItems.forEach(img=>{

    img.addEventListener("click",()=>{

        lightbox.classList.add("show");

        lightboxImg.src=img.src;

    });

});

closeLightbox.addEventListener("click",()=>{

    lightbox.classList.remove("show");

});

lightbox.addEventListener("click",(e)=>{

    if(e.target===lightbox){

        lightbox.classList.remove("show");

    }

});
/*=========================
        MOBILE MENU
==========================*/

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");

menuToggle.addEventListener("click",()=>{

    nav.classList.toggle("open");

});

document.querySelectorAll("nav a").forEach(link=>{

    link.addEventListener("click",()=>{

        nav.classList.remove("open");

    });

});
