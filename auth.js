/*==================================================
        GILSA AUTH.JS
        CLEAN VERSION
==================================================*/


document.addEventListener("DOMContentLoaded",()=>{


/*========================
 ELEMENTS
========================*/


const authModal =
document.getElementById("authModal");


const openAuthButtons =
document.querySelectorAll(".open-auth");


const closeAuth =
document.querySelector(".close-auth");


const loginForm =
document.getElementById("loginForm");


const registerForm =
document.getElementById("registerForm");


const loginBox =
document.getElementById("loginBox");


const registerBox =
document.getElementById("registerBox");


const showRegister =
document.getElementById("showRegister");


const showLogin =
document.getElementById("showLogin");





/*========================
 OPEN AUTH
========================*/


openAuthButtons.forEach(btn=>{


btn.addEventListener("click",(e)=>{


e.preventDefault();


authModal?.classList.add("active");


});


});





/*========================
 CLOSE AUTH
========================*/


closeAuth?.addEventListener("click",()=>{


authModal.classList.remove("active");


});




authModal?.addEventListener("click",(e)=>{


if(e.target === authModal){


authModal.classList.remove("active");


}


});






/*========================
 SWITCH LOGIN REGISTER
========================*/


showRegister?.addEventListener("click",()=>{


loginBox.style.display="none";


registerBox.style.display="block";


});




showLogin?.addEventListener("click",()=>{


registerBox.style.display="none";


loginBox.style.display="block";


});

/*========================
        REGISTER SYSTEM
========================*/


registerForm?.addEventListener("submit",(e)=>{


e.preventDefault();



const type =
document.getElementById("userType")?.value;



const name =
document.getElementById("registerName")?.value.trim();



const username =
document.getElementById("registerUsername")?.value.trim();



const password =
document.getElementById("registerPassword")?.value.trim();



const mobile =
document.getElementById("registerMobile")?.value.trim();





if(
!name ||
!username ||
!password ||
!mobile
){


alert(
"لطفا اطلاعات ضروری را کامل کنید"
);


return;


}






let extraData={};





if(type==="dentist"){



extraData={


clinicName:

document.getElementById("clinicName")?.value || "",



address:

document.getElementById("registerAddress")?.value || "",



location:

document.getElementById("registerLocation")?.value || ""



};



}








if(type==="lab"){



extraData={


labName:

document.getElementById("labName")?.value || "",



managerName:

document.getElementById("managerName")?.value || "",



landline:

document.getElementById("landline")?.value || "",



address:

document.getElementById("registerAddress")?.value || "",



location:

document.getElementById("registerLocation")?.value || ""



};



}







const user={


id:Date.now(),


type:type,


name:name,


username:username,


password:password,


mobile:mobile,


...extraData,


date:new Date().toLocaleDateString("fa-IR")



};







localStorage.setItem(

"gilsaUser",

JSON.stringify(user)

);





alert(

"ثبت نام با موفقیت انجام شد"

);






registerForm.reset();






registerBox.style.display="none";


loginBox.style.display="block";



});
  
/*========================
        LOGIN SYSTEM
========================*/


loginForm?.addEventListener("submit",(e)=>{


e.preventDefault();





const username =

document.getElementById("loginUsername")
?.value.trim();





const password =

document.getElementById("loginPassword")
?.value.trim();






if(
!username ||
!password
){


alert(
"نام کاربری و رمز عبور را وارد کنید"
);


return;


}






const savedUser =

JSON.parse(

localStorage.getItem("gilsaUser")

);






if(!savedUser){


alert(

"کاربری وجود ندارد، ابتدا ثبت نام کنید"

);


return;


}







if(

savedUser.username === username &&

savedUser.password === password

){





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







authModal?.classList.remove(

"active"

);







updateAuthButton();






const dashName =

document.getElementById("dashName");



const dashType =

document.getElementById("dashType");






if(dashName)

dashName.innerHTML =
savedUser.name;





if(dashType)

dashType.innerHTML =

savedUser.type==="dentist"

?

"دندانپزشک"

:

"لابراتوار";








}


else{


alert(

"نام کاربری یا رمز عبور اشتباه است"

);


}





});







/*========================
        UPDATE HEADER
========================*/


function updateAuthButton(){



const btn =

document.querySelector(".open-auth");





const login =

localStorage.getItem("gilsaLogin");





const user =

JSON.parse(

localStorage.getItem("gilsaCurrentUser")

);






if(

btn &&

login==="true" &&

user

){



btn.innerHTML =

`

👤 ${user.name}

`;



btn.classList.add("logged");


}





}

/*========================
        LOGOUT SYSTEM
========================*/


const logoutBtn =

document.getElementById("logoutBtn");





logoutBtn?.addEventListener("click",()=>{



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








/*========================
        CHECK LOGIN
========================*/


function checkLogin(){



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

login==="true" && user

){



updateAuthButton();




const dashName =

document.getElementById(
"dashName"
);




const dashType =

document.getElementById(
"dashType"
);





if(dashName)

dashName.innerHTML =
user.name;





if(dashType)


dashType.innerHTML =

user.type==="dentist"

?

"دندانپزشک"

:

"لابراتوار";



}




}








/*========================
        ACCOUNT BUTTON
========================*/


document.querySelector(".open-auth")
?.addEventListener("click",()=>{



if(

localStorage.getItem("gilsaLogin")==="true"

){



window.location.href="#dashboard";



}



});








/*========================
        RUN
========================*/


checkLogin();




});
                      
