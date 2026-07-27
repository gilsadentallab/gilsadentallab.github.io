/*==================================================
                GILSA AUTH.JS
                AUTH SYSTEM V2
==================================================*/
console.log("AUTH JS LOADED");

document.addEventListener(
"DOMContentLoaded",
()=>{



/*==========================
        ELEMENTS
==========================*/


const authModal =
document.querySelector("#authModal");



const authButtons =
document.querySelectorAll(".auth-btn");



const closeAuth =
document.querySelector(".close-auth");



const loginBox =
document.querySelector("#loginBox");



const registerBox =
document.querySelector("#registerBox");



const showRegister =
document.querySelector("#showRegister");



const showLogin =
document.querySelector("#showLogin");




/*==========================
        OPEN MODAL
==========================*/


authButtons.forEach(btn=>{


btn.addEventListener("click",()=>{


authModal?.classList.add("active");



});


});




/*==========================
        CLOSE MODAL
==========================*/


closeAuth?.addEventListener(
"click",
()=>{


authModal.classList.remove(
"active"
);



});




authModal?.addEventListener(
"click",
(e)=>{


if(e.target === authModal){


authModal.classList.remove(
"active"
);



}



});





/*==========================
        SWITCH BOX
==========================*/


showRegister?.addEventListener(
"click",
()=>{


loginBox.style.display="none";


registerBox.style.display="block";



});





showLogin?.addEventListener(
"click",
()=>{


registerBox.style.display="none";


loginBox.style.display="block";



});



});
/*==========================
        REGISTER SYSTEM
==========================*/


document.addEventListener(
"DOMContentLoaded",
()=>{


const registerForm =
document.querySelector("#registerForm");



if(!registerForm)
return;



registerForm.addEventListener(
"submit",
(e)=>{


e.preventDefault();




/* USER TYPE */


const type =
document.querySelector("#userType")?.value;




/* COMMON DATA */


const name =
document.querySelector("#registerName")?.value.trim();



const username =
document.querySelector("#registerUsername")?.value.trim();



const password =
document.querySelector("#registerPassword")?.value.trim();



const mobile =
document.querySelector("#registerMobile")?.value.trim();





/* CHECK REQUIRED */


if(
!name ||
!username ||
!password ||
!mobile
){


alert(
"لطفا تمام فیلدهای ضروری را پر کنید"
);


return;


}






/* EXTRA DATA */


let extra={};




if(type==="dentist"){



extra={


clinic:

document.querySelector("#clinicName")?.value || "",



address:

document.querySelector("#registerAddress")?.value || "",



location:

document.querySelector("#registerLocation")?.value || ""



};



}






if(type==="lab"){



extra={


labName:

document.querySelector("#labName")?.value || "",



manager:

document.querySelector("#managerName")?.value || "",



phone:

document.querySelector("#landline")?.value || "",



address:

document.querySelector("#registerAddress")?.value || "",



location:

document.querySelector("#registerLocation")?.value || ""



};



}





/* CREATE USER */


const user={



id:

Date.now(),



type:type,



name:name,



username:username,



password:password,



mobile:mobile,



...extra,



created:

new Date().toLocaleDateString("fa-IR")



};





/* SAVE USER */


localStorage.setItem(

"gilsaUser",

JSON.stringify(user)

);





alert(

"ثبت نام با موفقیت انجام شد"

);





registerForm.reset();




/* SWITCH TO LOGIN */


const loginBox =
document.querySelector("#loginBox");



const registerBox =
document.querySelector("#registerBox");



registerBox.style.display="none";


loginBox.style.display="block";




});


});
/*==========================
        LOGIN SYSTEM
==========================*/


document.addEventListener(
"DOMContentLoaded",
()=>{


const loginForm =
document.querySelector("#loginForm");



if(!loginForm)
return;




loginForm.addEventListener(
"submit",
(e)=>{


e.preventDefault();




const username =

document.querySelector("#loginUsername")
?.value.trim();




const password =

document.querySelector("#loginPassword")
?.value.trim();





if(!username || !password){


alert(
"لطفا نام کاربری و رمز عبور را وارد کنید"
);


return;


}






/* GET SAVED USER */


const savedUser =

JSON.parse(

localStorage.getItem("gilsaUser")

);





if(!savedUser){


alert(
"کاربری پیدا نشد، ابتدا ثبت نام کنید"
);


return;


}





/* CHECK LOGIN */


if(

savedUser.username === username &&

savedUser.password === password

){



/* CREATE SESSION */


localStorage.setItem(

"gilsaLogin",

"true"

);




localStorage.setItem(

"gilsaCurrentUser",

JSON.stringify(savedUser)

);





alert(

"ورود موفقیت آمیز بود"

);





/* CLOSE MODAL */


const authModal =

document.querySelector("#authModal");



authModal?.classList.remove(
"active"
);






/* UPDATE BUTTON */


updateAuthState();





}

else{



alert(

"نام کاربری یا رمز عبور اشتباه است"

);



}



});


});






/*==========================
        LOGOUT
==========================*/


document.addEventListener(
"DOMContentLoaded",
()=>{


const logoutButtons =

document.querySelectorAll(
".logout-btn"
);




logoutButtons.forEach(btn=>{


btn.addEventListener(
"click",
()=>{



localStorage.removeItem(
"gilsaLogin"
);



localStorage.removeItem(
"gilsaCurrentUser"
);




alert(
"از حساب کاربری خارج شدید"
);




location.reload();




});



});



});
/*==========================
        UPDATE AUTH STATE
==========================*/


function updateAuthState(){



const authBtn =

document.querySelector(".auth-btn");



const login =

localStorage.getItem(
"gilsaLogin"
);





const user =

JSON.parse(

localStorage.getItem(
"gilsaCurrentUser"
)

);





if(

authBtn &&

login === "true" &&

user

){



authBtn.innerHTML =

`

👤 ${user.name}

`;



authBtn.classList.add(
"logged"
);



}



}





/*==========================
        CURRENT USER
==========================*/


function getCurrentUser(){



return JSON.parse(

localStorage.getItem(
"gilsaCurrentUser"
)

)

|| null;



}






/*==========================
        USER TYPE
==========================*/


function getUserType(){



const user =

getCurrentUser();




if(!user)

return null;




return user.type;



}






/*==========================
        CHECK AUTH ON LOAD
==========================*/


document.addEventListener(
"DOMContentLoaded",
()=>{


updateAuthState();




const user =

getCurrentUser();




if(user){



document.body.dataset.user =

user.type;



}



});






/*==========================
        PROTECTED ELEMENTS
==========================*/


document.addEventListener(
"DOMContentLoaded",
()=>{


const protectedItems =

document.querySelectorAll(
".need-login"
);




protectedItems.forEach(item=>{



if(!isUserLoggedIn()){


item.style.display="none";


}



});



});






/*==========================
        OPEN USER PANEL
==========================*/


const accountBtn =

document.querySelector(
".auth-btn"
);



accountBtn?.addEventListener(
"click",
()=>{



if(isUserLoggedIn()){



window.location.href =
"#dashboard";



}



});






/*==========================
        AUTH HELPERS
==========================*/


function logoutUser(){



localStorage.removeItem(
"gilsaLogin"
);



localStorage.removeItem(
"gilsaCurrentUser"
);



location.reload();



}






function requireLogin(){



if(!isUserLoggedIn()){



alert(

"برای انجام این کار ابتدا وارد حساب کاربری شوید"

);



document
.querySelector("#authModal")
?.classList.add("active");



return false;



}



return true;



}
