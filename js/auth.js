/*====================================
        GILSA AUTH SYSTEM
====================================*/


document.addEventListener("DOMContentLoaded",()=>{


const authModal =
document.getElementById("authModal");


const openButtons =
document.querySelectorAll(".open-auth");


const closeButton =
document.querySelector(".close-auth");





/*====================
OPEN MODAL
====================*/


openButtons.forEach(btn=>{


btn.addEventListener("click",(e)=>{


e.preventDefault();


if(authModal){

authModal.classList.add("show");

document.body.style.overflow="hidden";

}


});


});






/*====================
CLOSE MODAL
====================*/


function closeAuth(){


if(authModal){

authModal.classList.remove("show");

}


document.body.style.overflow="";


}



if(closeButton){

closeButton.addEventListener(
"click",
closeAuth
);

}



if(authModal){


authModal.addEventListener(
"click",
(e)=>{


if(e.target===authModal){

closeAuth();

}


});


}







/*====================
REGISTER
====================*/


const registerBtn =
document.getElementById("registerBtn");



if(registerBtn){



registerBtn.addEventListener("click",()=>{



const fullName =
document.getElementById("fullName")?.value.trim();



const mobile =
document.getElementById("mobile")?.value.trim();



const username =
document.getElementById("registerUsername")?.value.trim();



const password =
document.getElementById("registerPassword")?.value;



const type =
document.getElementById("registerType")?.value;



const workplace =
document.getElementById("workPlace")?.value.trim();



if(
!fullName ||
!mobile ||
!username ||
!password
){


alert(
"لطفاً اطلاعات ضروری را کامل کنید"
);


return;


}





const user={


type:type || "dentist",


fullName,

mobile,

username,

password,

workplace,


created:

new Date().toLocaleDateString("fa-IR")


};





localStorage.setItem(

"gilsaUser",

JSON.stringify(user)

);





alert(
"ثبت نام با موفقیت انجام شد"
);



closeAuth();



openDashboard(user);



});



}








/*====================
LOGIN
====================*/



const loginBtn =
document.getElementById("loginBtn");



if(loginBtn){



loginBtn.addEventListener("click",()=>{



const username =
document.querySelector(
".auth-box input[type='text']"
)?.value.trim();



const password =
document.querySelector(
".auth-box input[type='password']"
)?.value;



const saved =
JSON.parse(
localStorage.getItem("gilsaUser")
);



if(!saved){


alert(
"ابتدا ثبت نام کنید"
);


return;


}



if(
username !== saved.username ||
password !== saved.password

){


alert(
"نام کاربری یا رمز عبور اشتباه است"
);


return;


}



closeAuth();


openDashboard(saved);



});



}








/*====================
DASHBOARD
====================*/



window.openDashboard=function(user){



const dashboard =
document.getElementById("dashboard");



const header =
document.getElementById("header");



const main =
document.querySelector("main");



const footer =
document.querySelector("footer");




if(header)
header.style.display="none";


if(main)
main.style.display="none";


if(footer)
footer.style.display="none";




if(dashboard){


dashboard.classList.add("show");


}





const name =
document.getElementById("dashName");


if(name){

name.innerText =
user.fullName;

}




const type =
document.getElementById("dashType");


if(type){

type.innerText =
user.type==="lab"
?
"لابراتوار"
:
"دندانپزشک";

}



document.body.style.overflow="";



};









/*====================
LOGOUT
====================*/


const logout =
document.getElementById("logoutBtn");



if(logout){


logout.addEventListener("click",()=>{


localStorage.removeItem(
"gilsaUser"
);



const dashboard =
document.getElementById("dashboard");



if(dashboard){

dashboard.classList.remove("show");

}



document.getElementById("header")
.style.display="";



document.querySelector("main")
.style.display="";



document.querySelector("footer")
.style.display="";



});


}






});
