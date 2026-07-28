/*==================================================
        GILSA AUTH SYSTEM V3
        USER LOGIN / REGISTER SYSTEM
==================================================*/


document.addEventListener("DOMContentLoaded",()=>{



/*========================
        ELEMENTS
========================*/


const authModal =
document.getElementById("authModal");


const openButtons =
document.querySelectorAll(".auth-btn,.open-auth");


const closeBtn =
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
        OPEN MODAL
========================*/


openButtons.forEach(btn=>{


btn.addEventListener("click",(e)=>{


e.preventDefault();



if(isLoggedIn()){


openDashboard();


return;


}



authModal?.classList.add("active");



});



});





/*========================
        CLOSE MODAL
========================*/


closeBtn?.addEventListener("click",()=>{


authModal?.classList.remove("active");


});





authModal?.addEventListener("click",(e)=>{


if(e.target===authModal){


authModal.classList.remove("active");


}



});





/*========================
        SWITCH BOX
========================*/


showRegister?.addEventListener("click",()=>{


loginBox.style.display="none";


registerBox.style.display="block";


});





showLogin?.addEventListener("click",()=>{


registerBox.style.display="none";


loginBox.style.display="block";


});






/*==================================================
        REGISTER
==================================================*/


registerForm?.addEventListener("submit",(e)=>{


e.preventDefault();




const user={


id:Date.now(),


type:
document.getElementById("userType").value,


name:
document.getElementById("registerName").value.trim(),


username:
document.getElementById("registerUsername").value.trim(),


password:
document.getElementById("registerPassword").value.trim(),


mobile:
document.getElementById("registerMobile").value.trim(),



clinicName:
document.getElementById("clinicName")?.value || "",


labName:
document.getElementById("labName")?.value || "",


managerName:
document.getElementById("managerName")?.value || "",


landline:
document.getElementById("landline")?.value || "",


address:
document.getElementById("registerAddress")?.value || "",


location:
document.getElementById("registerLocation")?.value || "",


created:
new Date().toLocaleDateString("fa-IR")



};






if(
!user.name ||
!user.username ||
!user.password ||
!user.mobile

){


alert(
"لطفا اطلاعات ضروری را کامل کنید"
);


return;


}






let users =

JSON.parse(

localStorage.getItem("gilsaUsers")

)

|| [];






const exists =

users.find(u=>

u.username===user.username

);






if(exists){


alert(
"این نام کاربری قبلا ثبت شده است"
);


return;


}






users.push(user);





localStorage.setItem(

"gilsaUsers",

JSON.stringify(users)

);






alert(
"ثبت نام با موفقیت انجام شد"
);





registerForm.reset();


registerBox.style.display="none";


loginBox.style.display="block";



});
        /*==================================================
        LOGIN SYSTEM
==================================================*/


loginForm?.addEventListener("submit",(e)=>{


e.preventDefault();




const username =

document.getElementById("loginUsername")
.value.trim();




const password =

document.getElementById("loginPassword")
.value.trim();






let users =

JSON.parse(

localStorage.getItem("gilsaUsers")

)

|| [];







const user =

users.find(u=>

u.username===username &&

u.password===password

);







if(!user){


alert(
"نام کاربری یا رمز عبور اشتباه است"
);


return;


}






localStorage.setItem(

"gilsaLogin",

"true"

);





localStorage.setItem(

"gilsaCurrentUser",

JSON.stringify(user)

);






alert(

"ورود موفقیت آمیز بود"

);






authModal?.classList.remove(
"active"
);






updateUserUI();



});









/*==================================================
        CHECK LOGIN
==================================================*/


function isLoggedIn(){


return (

localStorage.getItem("gilsaLogin")==="true"

&&

localStorage.getItem("gilsaCurrentUser")

);



}









/*==================================================
        UPDATE USER UI
==================================================*/


function updateUserUI(){



const user =

JSON.parse(

localStorage.getItem("gilsaCurrentUser")

);




if(!user)

return;







const authBtn =

document.querySelector(".auth-btn");





if(authBtn){



authBtn.innerHTML =

`

👤 ${user.name}

`;



authBtn.classList.add(
"logged"
);



}








const dashName =

document.getElementById("dashName");



const dashType =

document.getElementById("dashType");






if(dashName)

dashName.innerHTML=user.name;






if(dashType)


dashType.innerHTML =

user.type==="lab"

?

"لابراتوار"

:

"دندانپزشک";



}









/*==================================================
        OPEN DASHBOARD
==================================================*/


function openDashboard(){



const dashboard =

document.getElementById("dashboard");




if(!dashboard){


alert(
"داشبورد پیدا نشد"
);


return;


}





window.scrollTo({

top:dashboard.offsetTop,

behavior:"smooth"

});




dashboard.classList.add(
"active"
);




updateUserUI();



}









/*==================================================
        LOGOUT
==================================================*/


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
"از حساب خارج شدید"
);





location.reload();




});









/*==================================================
        PAGE LOAD
==================================================*/


if(isLoggedIn()){


updateUserUI();


}






});
/*==================================================
        DASHBOARD CONNECTOR V3
==================================================*/


function loadDashboard(){



const user =

JSON.parse(

localStorage.getItem("gilsaCurrentUser")

);





if(!user)

return;







const nameBox =

document.getElementById("dashName");



const typeBox =

document.getElementById("dashType");







if(nameBox)

nameBox.innerHTML = user.name;






if(typeBox){


typeBox.innerHTML =

user.type==="lab"

?

"لابراتوار"

:

"دندانپزشک";



}







/* USER INFO */

const userInfo =

document.querySelector(".dashboard-user");



if(userInfo){



userInfo.dataset.username =

user.username;



}





}





/*==================================================
        DASHBOARD MENU
==================================================*/



const dashboardMenu =

document.querySelectorAll(
".dashboard-sidebar li"
);






dashboardMenu.forEach(item=>{



item.addEventListener(
"click",
()=>{





dashboardMenu.forEach(i=>{

i.classList.remove("active");

});





item.classList.add("active");






const text =

item.innerText;







if(text.includes("سفارش جدید")){


document.querySelector(".order-btn")
?.click();



}






if(text.includes("سفارش‌های من")){


if(typeof renderMyOrders==="function"){


renderMyOrders();


}



}






});



});









/*==================================================
        LAB ACCESS CONTROL
==================================================*/


function checkLabPanel(){



const user =

JSON.parse(

localStorage.getItem("gilsaCurrentUser")

);





if(!user)

return;








if(user.type==="lab"){



document.body.classList.add(
"lab-user"
);



}

else{



document.body.classList.add(
"dentist-user"
);



}



}









/*==================================================
        RUN DASHBOARD
==================================================*/


loadDashboard();


checkLabPanel();


