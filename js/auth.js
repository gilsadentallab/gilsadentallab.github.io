/*====================================
        GILSA AUTH SYSTEM
====================================*/


document.addEventListener("DOMContentLoaded",()=>{


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


function closeAuth(){


if(authModal){

authModal.classList.remove("show");

}


document.body.style.overflow="";


}



if(closeAuthButton){

closeAuthButton.addEventListener("click",closeAuth);

}



if(authModal){

authModal.addEventListener("click",(e)=>{


if(e.target===authModal){

closeAuth();

}


});


}




/*==============================
        DASHBOARD
==============================*/


const dashboard=document.getElementById("dashboard");



function openDashboard(user){



const header=document.getElementById("header");

const main=document.querySelector("main");

const footer=document.querySelector("footer");



if(header)
header.style.display="none";


if(main)
main.style.display="none";


if(footer)
footer.style.display="none";



if(dashboard){

dashboard.style.display="flex";

dashboard.classList.add("show");

}



document.body.style.overflow="";



const name=document.getElementById("dashName");

if(name){

name.innerText=user.fullName;

}



}




function closeDashboard(){



const header=document.getElementById("header");

const main=document.querySelector("main");

const footer=document.querySelector("footer");



if(header)
header.style.display="";


if(main)
main.style.display="";


if(footer)
footer.style.display="";



if(dashboard){

dashboard.style.display="none";

dashboard.classList.remove("show");

}



document.body.style.overflow="";



}



window.openDashboard=openDashboard;

window.closeDashboard=closeDashboard;





/*==============================
        REGISTER
==============================*/


const registerBtn=document.getElementById("registerBtn");



if(registerBtn){



registerBtn.addEventListener("click",()=>{



const user={


type:document.getElementById("registerType")?.value || "",


fullName:document.getElementById("fullName")?.value.trim() || "",


workPlace:document.getElementById("workPlace")?.value.trim() || "",


mobile:document.getElementById("mobile")?.value.trim() || "",


city:document.getElementById("city")?.value.trim() || "",


address:document.getElementById("address")?.value.trim() || "",


username:document.getElementById("registerUsername")?.value.trim() || "",


password:document.getElementById("registerPassword")?.value || ""



};



if(
user.fullName==="" ||
user.mobile==="" ||
user.username==="" ||
user.password===""
){


alert("لطفاً اطلاعات ضروری را کامل کنید");

return;


}




localStorage.setItem(

"gilsaUser",

JSON.stringify(user)

);



alert("ثبت نام با موفقیت انجام شد");



closeAuth();


openDashboard(user);



});



}




/*==============================
        LOGIN
==============================*/


const loginBtn=document.getElementById("loginBtn");



if(loginBtn){


loginBtn.addEventListener("click",()=>{



const user=JSON.parse(

localStorage.getItem("gilsaUser")

);



if(!user){


alert("ابتدا ثبت نام کنید");

return;


}



closeAuth();

openDashboard(user);



});



}




/*==============================
        LOGOUT
==============================*/


const logoutBtn=document.getElementById("logoutBtn");



if(logoutBtn){


logoutBtn.addEventListener("click",()=>{


localStorage.removeItem("gilsaUser");


closeDashboard();


});


}




