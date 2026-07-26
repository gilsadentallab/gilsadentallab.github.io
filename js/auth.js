/*====================================
        GILSA AUTH SYSTEM
====================================*/

const authModal = document.getElementById("authModal");

const loginTab = document.querySelector('[data-tab="login"]');

const registerTab = document.querySelector('[data-tab="register"]');

const loginContent = document.getElementById("login");

const registerContent = document.getElementById("register");

const closeAuth = document.querySelector(".close-auth");

const authButtons = document.querySelectorAll(".open-auth");
/*==============================
        OPEN MODAL
==============================*/

authButtons.forEach(button=>{

    button.addEventListener("click",function(e){

        e.preventDefault();

        authModal.classList.add("show");

        document.body.style.overflow="hidden";

    });

});
/*==============================
        CLOSE MODAL
==============================*/

function closeAuthModal(){

    authModal.classList.remove("show");

    document.body.style.overflow="auto";

}

closeAuth.addEventListener("click",closeAuthModal);

authModal.addEventListener("click",function(e){

    if(e.target===authModal){

        closeAuthModal();

    }

});

document.addEventListener("keydown",function(e){

    if(e.key==="Escape"){

        closeAuthModal();

    }

});
//==============================
// Dashboard
//==============================

const dashboard = document.getElementById("dashboard");

function openDashboard(user){

    // مخفی شدن صفحه اصلی
    document.querySelector("main").style.display = "none";

    // مخفی شدن هدر
    document.querySelector("header").style.display = "none";

    // مخفی شدن فوتر
    document.querySelector("footer").style.display = "none";

    // نمایش داشبورد
    dashboard.classList.add("show");

    // اطلاعات کاربر
    document.getElementById("dashName").innerHTML =
        user.fullName;

    document.getElementById("dashType").innerHTML =
        user.type === "doctor"
        ? "دندانپزشک"
        : "لابراتوار";
}
