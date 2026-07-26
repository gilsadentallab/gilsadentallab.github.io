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
/*==============================
        REGISTER
==============================*/

const registerBtn = document.getElementById("registerBtn");

registerBtn.addEventListener("click", function () {

    const user = {

        type: document.getElementById("registerType").value,

        fullName: document.getElementById("fullName").value,

        workPlace: document.getElementById("workPlace").value,

        mobile: document.getElementById("mobile").value,

        city: document.getElementById("city").value,

        address: document.getElementById("address").value,

        username: document.getElementById("registerUsername").value,

        password: document.getElementById("registerPassword").value

    };

    localStorage.setItem("gilsaUser", JSON.stringify(user));

    closeAuthModal();

    openDashboard(user);

});
/*==============================
            LOGIN
==============================*/

const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", function () {

    const username = document.getElementById("loginUsername").value;

    const password = document.getElementById("loginPassword").value;

    const user = JSON.parse(localStorage.getItem("gilsaUser"));

    if (!user) {

        alert("ابتدا ثبت نام کنید");

        return;

    }

    if (username !== user.username || password !== user.password) {

        alert("نام کاربری یا رمز عبور اشتباه است");

        return;

    }

    closeAuthModal();

    openDashboard(user);

});
