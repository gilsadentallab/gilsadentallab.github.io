document.addEventListener("DOMContentLoaded", () => {


/*=========================================
        REVEAL ANIMATION
=========================================*/

const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");
            observer.unobserve(entry.target);

        }

    });

},{threshold:.2});


reveals.forEach(el=>{
    observer.observe(el);
});




/*=========================================
        HEADER
=========================================*/

const header = document.querySelector("header");

let lastScroll = 0;


window.addEventListener("scroll",()=>{


    if(!header) return;


    let current = window.scrollY;


    if(current > 60){

        header.classList.add("scrolled");

    }else{

        header.classList.remove("scrolled");

    }



    if(current > lastScroll && current > 120){

        header.style.transform="translateY(-120px)";

    }else{

        header.style.transform="translateY(0)";

    }


    lastScroll=current;


});




/*=========================================
        PRELOADER
=========================================*/

const preloader=document.getElementById("preloader");


if(preloader){

window.addEventListener("load",()=>{

    setTimeout(()=>{

        preloader.classList.add("hide");

    },600);


});

}




/*=========================================
        BACK TO TOP
=========================================*/

const backToTop=document.querySelector(".back-to-top");


if(backToTop){


window.addEventListener("scroll",()=>{


    if(window.scrollY>500){

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
        PROGRESS BAR
=========================================*/

const progressBar=document.querySelector(".progress-bar");


if(progressBar){


window.addEventListener("scroll",()=>{


let scroll=document.documentElement.scrollTop;

let height=document.documentElement.scrollHeight -
document.documentElement.clientHeight;


progressBar.style.width =
(scroll / height *100)+"%";


});


}
            /*=========================================
        ACTIVE MENU + SMOOTH SCROLL
=========================================*/


const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav a");


window.addEventListener("scroll",()=>{


    let current="";


    sections.forEach(section=>{


        let top = section.offsetTop - 150;


        if(window.scrollY >= top){

            current = section.getAttribute("id");

        }


    });



    navLinks.forEach(link=>{


        link.classList.remove("active");


        if(link.getAttribute("href") === "#"+current){

            link.classList.add("active");

        }


    });



});





navLinks.forEach(link=>{


    link.addEventListener("click",(e)=>{


        let target = document.querySelector(
            link.getAttribute("href")
        );


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
        MOBILE MENU
=========================================*/


const menuToggle=document.querySelector(".menu-toggle");
const nav=document.querySelector("nav");


if(menuToggle && nav){


    menuToggle.addEventListener("click",()=>{


        nav.classList.toggle("open");


    });



    nav.querySelectorAll("a").forEach(link=>{


        link.addEventListener("click",()=>{


            nav.classList.remove("open");


        });


    });


}






/*=========================================
        LIGHTBOX
=========================================*/


const galleryItems=document.querySelectorAll(".gallery-item img");
const lightbox=document.querySelector(".lightbox");
const lightboxImg=document.getElementById("lightbox-img");
const closeLightbox=document.querySelector(".close-lightbox");



if(lightbox && lightboxImg){


    galleryItems.forEach(img=>{


        img.addEventListener("click",()=>{


            lightbox.classList.add("show");

            lightboxImg.src=img.src;


        });


    });



    if(closeLightbox){


        closeLightbox.addEventListener("click",()=>{


            lightbox.classList.remove("show");


        });


    }




    lightbox.addEventListener("click",(e)=>{


        if(e.target===lightbox){


            lightbox.classList.remove("show");


        }


    });



}
            /*=========================================
        ORDER MODAL SYSTEM
=========================================*/


const orderModal = document.getElementById("orderModal");

const openOrderButtons = document.querySelectorAll(".open-order");

const closeOrderButton = document.querySelector(".close-order");




/* OPEN ORDER */

openOrderButtons.forEach(btn=>{


    btn.addEventListener("click",(e)=>{


        e.preventDefault();



        if(orderModal){


            orderModal.classList.add("show");

            document.body.style.overflow="hidden";


        }


    });



});





/* CLOSE ORDER */


if(closeOrderButton){


    closeOrderButton.addEventListener("click",()=>{


        if(orderModal){


            orderModal.classList.remove("show");

            document.body.style.overflow="";


        }


    });


}





/* CLICK OUTSIDE */


if(orderModal){


    orderModal.addEventListener("click",(e)=>{


        if(e.target === orderModal){


            orderModal.classList.remove("show");

            document.body.style.overflow="";


        }


    });



}





/* ESC CLOSE */


document.addEventListener("keydown",(e)=>{


    if(e.key==="Escape"){


        if(orderModal){

            orderModal.classList.remove("show");

        }


        document.body.style.overflow="";


    }


});
            /*=========================================
        AUTH + DASHBOARD SYSTEM
=========================================*/


const authModal = document.getElementById("authModal");
const openAuthButtons = document.querySelectorAll(".open-auth");
const closeAuthButton = document.querySelector(".close-auth");


/*==============================
        OPEN AUTH
==============================*/


openAuthButtons.forEach(btn=>{


    btn.addEventListener("click",(e)=>{


        e.preventDefault();


        if(authModal){


            authModal.classList.add("show");

            document.body.style.overflow="hidden";


        }


    });


});




/*==============================
        CLOSE AUTH
==============================*/


if(closeAuthButton){


    closeAuthButton.addEventListener("click",()=>{


        authModal.classList.remove("show");

        document.body.style.overflow="";


    });


}




if(authModal){


    authModal.addEventListener("click",(e)=>{


        if(e.target === authModal){


            authModal.classList.remove("show");

            document.body.style.overflow="";


        }


    });


}






/*=========================================
        DASHBOARD
=========================================*/


const dashboard = document.getElementById("dashboard");



/* اول مخفی باشد */

if(dashboard){


    dashboard.style.display="none";


}






window.openDashboard = function(){



    const header=document.getElementById("header");
    const main=document.getElementById("mainContent");
    const footer=document.getElementById("footer");



    /* بستن مودال */

    if(authModal){

        authModal.classList.remove("show");

    }



    document.body.style.overflow="hidden";




    if(header){

        header.style.display="none";

    }



    if(main){

        main.style.display="none";

    }



    if(footer){

        footer.style.display="none";

    }





    if(dashboard){


        dashboard.style.display="flex";

        dashboard.classList.add("active");


    }



    window.scrollTo(0,0);



};








window.closeDashboard=function(){



    const header=document.getElementById("header");
    const main=document.getElementById("mainContent");
    const footer=document.getElementById("footer");




    if(header){

        header.style.display="";

    }



    if(main){

        main.style.display="";

    }



    if(footer){

        footer.style.display="";

    }




    if(dashboard){


        dashboard.style.display="none";

        dashboard.classList.remove("active");


    }



    document.body.style.overflow="";



};






/*=========================================
        LOGIN BUTTON
=========================================*/


const loginBtn=document.getElementById("loginBtn");



if(loginBtn){


    loginBtn.addEventListener("click",()=>{


        /*
        فعلا تستی
        بعداً وصل می‌کنیم به دیتابیس
        */


        openDashboard();



    });



}






/*=========================================
        REGISTER BUTTON
=========================================*/


const registerBtn=document.getElementById("registerBtn");



if(registerBtn){


    registerBtn.addEventListener("click",()=>{


        alert("ثبت نام انجام شد");


        openDashboard();



    });



}






/*=========================================
        LOGOUT
=========================================*/


const logoutBtn=document.getElementById("logoutBtn");



if(logoutBtn){


    logoutBtn.addEventListener("click",()=>{


        closeDashboard();



    });


}
            /*=========================================
        ORDER SYSTEM
=========================================*/


const calcPriceBtn = document.querySelector(".calc-price");
const sendOrderBtn = document.querySelector(".send-order");

const workType = document.getElementById("workType");
const workCount = document.getElementById("workCount");
const totalPrice = document.getElementById("totalPrice");
const deliveryTime = document.getElementById("deliveryTime");



/*==============================
        PRICE CALCULATOR
==============================*/


if(calcPriceBtn){


    calcPriceBtn.addEventListener("click",()=>{


        let count = Number(workCount.value) || 1;

        let price = 0;

        let time = "";



        switch(workType.value){


            case "zirconia":

                price = 3500000;
                time = "۳ تا ۵ روز کاری";

            break;



            case "pfm":

                price = 2500000;
                time = "۳ روز کاری";

            break;



            case "implant":

                price = 6000000;
                time = "۵ تا ۷ روز کاری";

            break;



            case "emax":

                price = 5000000;
                time = "۴ تا ۶ روز کاری";

            break;



            case "laminate":

                price = 4500000;
                time = "۵ روز کاری";

            break;



            default:

                price = 0;

        }




        let finalPrice = price * count;



        if(totalPrice){

            totalPrice.innerText =
            finalPrice.toLocaleString("fa-IR") + " تومان";


        }



        if(deliveryTime){

            deliveryTime.innerText =
            "زمان تحویل تقریبی: " + time;


        }



    });


}






/*==============================
        SEND ORDER
==============================*/


if(sendOrderBtn){


    sendOrderBtn.addEventListener("click",()=>{


        const name =
        document.getElementById("customerName").value;


        const phone =
        document.getElementById("customerPhone").value;


        const type =
        workType.options[workType.selectedIndex].text;


        const count =
        workCount.value;


        const tooth =
        document.getElementById("toothNumber").value;


        const shade =
        document.getElementById("shade").value;



        let message = `

سلام لابراتوار گیلسا

نام پزشک:
${name}

شماره تماس:
${phone}

نوع کار:
${type}

تعداد:
${count}

شماره دندان:
${tooth}

Shade:
${shade}

        `;




        const whatsapp =
        "https://wa.me/989140503522?text=" 
        + encodeURIComponent(message);




        window.open(
            whatsapp,
            "_blank"
        );



    });


}






/*=========================================
        FILE PREVIEW
=========================================*/


const fileInput =
document.getElementById("workFile");


const filePreview =
document.getElementById("filePreview");



if(fileInput){


    fileInput.addEventListener("change",()=>{


        if(fileInput.files.length){


            filePreview.innerHTML =
            "📎 " + fileInput.files[0].name;


        }else{


            filePreview.innerHTML =
            "فایلی انتخاب نشده";


        }



    });



}
