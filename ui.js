/*==================================================
                UI MODULE V3
==================================================*/

const UI = {

    init(){

        this.preloader();

        this.header();

        this.backToTop();

        this.reveal();

    },

    preloader(){

        const loader = document.querySelector("#preloader");

        if(!loader) return;

        window.addEventListener("load",()=>{

            setTimeout(()=>{

                loader.classList.add("hide");

            },800);

        });

    },

    header(){

        const header = document.querySelector("#header");

        if(!header) return;

        window.addEventListener("scroll",()=>{

            header.classList.toggle(
                "scrolled",
                window.scrollY > 50
            );

        });

    },

    backToTop(){

        const btn=document.querySelector(".back-to-top");

        if(!btn) return;

        window.addEventListener("scroll",()=>{

            btn.classList.toggle(
                "show",
                window.scrollY>500
            );

        });

        btn.addEventListener("click",()=>{

            window.scrollTo({

                top:0,

                behavior:"smooth"

            });

        });

    },

    reveal(){

        const items=document.querySelectorAll(

            ".reveal,.fade-left,.fade-right"

        );

        if(!items.length) return;

        const observer=new IntersectionObserver(entries=>{

            entries.forEach(entry=>{

                if(entry.isIntersecting){

                    entry.target.classList.add("active");

                }

            });

        },{

            threshold:.15

        });

        items.forEach(item=>observer.observe(item));

    }

};
