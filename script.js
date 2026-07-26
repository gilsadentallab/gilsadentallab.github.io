/*=====================================
        GILSA MAIN SCRIPT
=====================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*=====================
        PRELOADER
    =====================*/

    const preloader = document.getElementById("preloader");

    window.addEventListener("load", () => {
        if (preloader) {
            setTimeout(() => {
                preloader.classList.add("hide");
            }, 800);
        }
    });

    /*=====================
        HEADER SCROLL
    =====================*/

    const header = document.getElementById("header");

    window.addEventListener("scroll", () => {

        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    });

    /*=====================
        MOBILE MENU
    =====================*/

    const menuBtn = document.querySelector(".menu-toggle");
    const nav = document.querySelector("nav");

    if (menuBtn && nav) {

        menuBtn.addEventListener("click", () => {
            nav.classList.toggle("open");
        });

        nav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {
                nav.classList.remove("open");
            });

        });

    }

    /*=====================
        REVEAL
    =====================*/

    const reveals = document.querySelectorAll(".reveal");

    if (reveals.length) {

        const observer = new IntersectionObserver((entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                }

            });

        }, {
            threshold: 0.15
        });

        reveals.forEach(item => observer.observe(item));

    }

    /*=====================
        BACK TO TOP
    =====================*/

    const topBtn = document.querySelector(".back-to-top");

    if (topBtn) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 500) {
                topBtn.classList.add("show");
            } else {
                topBtn.classList.remove("show");
            }

        });

        topBtn.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }

    /*=====================
        COUNTER
    =====================*/

    const counters = document.querySelectorAll(".counter");

    counters.forEach(counter => {

        let target = Number(counter.dataset.target);
        let current = 0;

        const timer = setInterval(() => {

            current += Math.ceil(target / 100);

            if (current >= target) {
                current = target;
                clearInterval(timer);
            }

            counter.innerText = current.toLocaleString("fa-IR");

        }, 20);

    });

    /*=====================
        SMOOTH LINKS
    =====================*/

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (target) {

                e.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    });

    /*=====================
        IMAGE ERROR
    =====================*/

    document.querySelectorAll("img").forEach(img => {

        img.addEventListener("error", () => {
            img.style.display = "none";
        });

    });

});
