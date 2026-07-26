/*====================================
        GILSA AUTH SYSTEM
====================================*/


document.addEventListener("DOMContentLoaded",()=>{


const authModal=document.getElementById("authModal");

const openAuth=document.querySelectorAll(".open-auth");

const closeAuth=document.querySelector(".close-auth");


/* OPEN MODAL */

openAuth.forEach(btn=>{

btn.addEventListener("click",(e)=>{

e.preventDefault();

authModal.classList.add("show");

document.body.style.overflow="hidden";


});

});



/* CLOSE */

function closeAuthModal(){

if(authModal){

authModal.classList.remove("show");

}

document.body.style.overflow="";

}



if(closeAuth){

closeAuth.addEventListener("click",closeAuthModal);

}



if(authModal){

authModal.addEventListener("click",(e)=>{

if(e.target===authModal){

closeAuthModal();

}

});

}




/*========================
REGISTER
========================*/


const registerBtn=document.getElementById("registerBtn");


if(registerBtn){


registerBtn.addEventListener("click",()=>{


const user={


type:document.getElementById("registerType")?.value,


fullName:document.getElementById("fullName")?.value,


workPlace:document.getElementById("workPlace")?.value,


mobile:document.getElementById("mobile")?.value,


city:document.getElementById("city")?.value,


address:document.getElementById("address")?.value,


username:document.getElementById("registerUsername")?.value,


password:document.getElementById("registerPassword")?.value



};



localStorage.setItem(
"gilsaUser",
JSON.stringify(user)
);



alert("ثبت نام با موفقیت انجام شد");



closeAuthModal();


openDashboard(user);



});


}




/*========================
LOGIN
========================*/


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



closeAuthModal();

openDashboard(user);



});


}





/*========================
DASHBOARD
========================*/


const dashboard=document.getElementById("dashboard");



window.openDashboard=function(user){


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



document.body.style.overflow="auto";



if(document.getElementById("dashName")){

document.getElementById("dashName").innerText =
user.fullName || "کاربر";


}



};





window.closeDashboard=function(){



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


};





/* LOGOUT */


const logout=document.getElementById("logoutBtn");


if(logout){


logout.addEventListener("click",()=>{


localStorage.removeItem("gilsaUser");


closeDashboard();



});


}




});
