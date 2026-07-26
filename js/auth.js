/*=====================================
        GILSA AUTH SYSTEM FINAL
=====================================*/


document.addEventListener("DOMContentLoaded",()=>{


const authModal =
document.getElementById("authModal");


const loginBtn =
document.getElementById("loginBtn");


const registerBtn =
document.getElementById("registerBtn");





/*=====================================
        REGISTER
=====================================*/


if(registerBtn){


registerBtn.addEventListener("click",()=>{



const user={


type:
document.getElementById("registerType")?.value || "",



fullName:
document.getElementById("fullName")?.value.trim() || "",



workPlace:
document.getElementById("workPlace")?.value.trim() || "",



mobile:
document.getElementById("mobile")?.value.trim() || "",



city:
document.getElementById("city")?.value.trim() || "",



address:
document.getElementById("address")?.value.trim() || "",



username:
document.getElementById("registerUsername")?.value.trim() || "",



password:
document.getElementById("registerPassword")?.value || ""



};





if(
!user.fullName ||
!user.mobile ||
!user.username ||
!user.password
){


alert(
"لطفاً اطلاعات ضروری را کامل کنید"
);


return;


}





localStorage.setItem(
"gilsaUser",
JSON.stringify(user)
);




alert(
"ثبت نام با موفقیت انجام شد"
);




if(authModal){

authModal.classList.remove("show");

}




document.body.style.overflow="";





});



}









/*=====================================
        LOGIN
=====================================*/


if(loginBtn){


loginBtn.addEventListener("click",()=>{



const username =
document.getElementById("loginUsername")?.value.trim();



const password =
document.getElementById("loginPassword")?.value;



const savedUser =
JSON.parse(
localStorage.getItem("gilsaUser")
);






if(!savedUser){


alert(
"ابتدا ثبت نام کنید"
);


return;


}






if(
username !== savedUser.username ||
password !== savedUser.password
){


alert(
"نام کاربری یا رمز عبور اشتباه است"
);


return;


}






alert(
"ورود موفقیت آمیز بود"
);






if(authModal){

authModal.classList.remove("show");

}



document.body.style.overflow="";






if(typeof openDashboard==="function"){


openDashboard(savedUser);


}





});



}








/*=====================================
        ENTER LOGIN
=====================================*/


const passwordInput =
document.getElementById("loginPassword");



if(passwordInput){


passwordInput.addEventListener(
"keydown",
(e)=>{


if(e.key==="Enter"){


loginBtn?.click();


}


});


}






});
