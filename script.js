/*====================================
        GILSA MAIN SCRIPT
====================================*/


document.addEventListener("DOMContentLoaded",()=>{


/*====================================
        PRELOADER
====================================*/


const preloader=document.getElementById("preloader");


window.addEventListener("load",()=>{

if(preloader){

setTimeout(()=>{

preloader.classList.add("hide");

},800);

}

});



/*====================================
        HEADER SCROLL
====================================*/


const header=document.getElementById("header");


window.addEventListener("scroll",()=>{


if(header){

if(window.scrollY>50){

header.classList.add("scrolled");

}else{

header.classList.remove("scrolled");

}

}


});



/*====================================
        MOBILE MENU
====================================*/


const menuBtn=document.querySelector(".menu-toggle");

const nav=document.querySelector("nav");


if(menuBtn && nav){


menuBtn.addEventListener("click",()=>{

nav.classList.toggle("open");

});


document.querySelectorAll("nav a").forEach(link=>{


link.addEventListener("click",()=>{

nav.classList.remove("open");

});


});


}




/*====================================
        REVEAL ANIMATION
====================================*/


const reveals=document.querySelectorAll(".reveal");


const observer=new IntersectionObserver((entries)=>{


entries.forEach(entry=>{


if(entry.isIntersecting){

entry.target.classList.add("show");

}


});


},{
threshold:.15
});


reveals.forEach(el=>{

observer.observe(el);

});





/*====================================
        BACK TO TOP
====================================*/


const backTop=document.querySelector(".back-to-top");


window.addEventListener("scroll",()=>{


if(backTop){


if(window.scrollY>500){

backTop.classList.add("show");

}else{

backTop.classList.remove("show");

}


}


});


if(backTop){


backTop.addEventListener("click",()=>{


window.scrollTo({

top:0,

behavior:"smooth"

});


});


}
/*====================================
        AUTH SYSTEM
====================================*/


const authModal =
document.getElementById("authModal");


const openAuthButtons =
document.querySelectorAll(".open-auth");


const closeAuthButton =
document.querySelector(".close-auth");



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


closeAuthButton.addEventListener(
"click",
closeAuth
);


}



if(authModal){


authModal.addEventListener("click",(e)=>{


if(e.target===authModal){

closeAuth();

}


});


}




/*==============================
        REGISTER
==============================*/


const registerBtn =
document.getElementById("registerBtn");



if(registerBtn){


registerBtn.addEventListener("click",()=>{


const user = {


fullName:

document.getElementById("fullName")?.value.trim() || "",


mobile:

document.getElementById("mobile")?.value.trim() || "",


clinic:

document.getElementById("clinic")?.value.trim() || "",


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

user.fullName===""

||

user.mobile===""

||

user.username===""

||

user.password===""

){


alert("لطفاً اطلاعات ضروری را کامل کنید");


return;


}




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





/*==============================
        LOGIN
==============================*/


const loginBtn =
document.getElementById("loginBtn");



if(loginBtn){


loginBtn.addEventListener("click",()=>{


const user = JSON.parse(

localStorage.getItem("gilsaUser")

);



if(!user){


alert(

"ابتدا ثبت نام کنید"

);


return;


}



closeAuth();


openDashboard(user);



});


}





/*==============================
        AUTO LOGIN
==============================*/


const savedUser = JSON.parse(

localStorage.getItem("gilsaUser")

);



if(savedUser){


setTimeout(()=>{


openDashboard(savedUser);


},500);


}


/*====================================
        DASHBOARD SYSTEM
====================================*/


const dashboard = 
document.getElementById("dashboard");



function openDashboard(user){



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


dashboard.style.display="flex";


}




document.body.style.overflow="auto";

document.body.classList.add(
"dashboard-active"
);



/* USER NAME */


const dashName =
document.getElementById("dashName");


if(dashName){

dashName.innerText =
user.fullName || "کاربر گیلسا";

}



/* USER TYPE */


const dashType =
document.getElementById("dashType");


if(dashType){

dashType.innerText =
"همکار گیلسا";

}



/* PROFILE */


const profile =
document.getElementById("profileInfo");



if(profile){


profile.innerHTML = `


<p>
<strong>نام:</strong>
${user.fullName}
</p>


<p>
<strong>موبایل:</strong>
${user.mobile}
</p>


<p>
<strong>محل فعالیت:</strong>
${user.clinic || "-"}
</p>


<p>
<strong>شهر:</strong>
${user.city || "-"}
</p>


<p>
<strong>آدرس:</strong>
${user.address || "-"}
</p>


`;


}



loadOrders();



}




function closeDashboard(){



const header =
document.getElementById("header");


const main =
document.querySelector("main");


const footer =
document.querySelector("footer");



if(header)
header.style.display="";


if(main)
main.style.display="";


if(footer)
footer.style.display="";



if(dashboard){


dashboard.classList.remove("show");


dashboard.style.display="none";


}



document.body.classList.remove(
"dashboard-active"
);



}




window.openDashboard =
openDashboard;


window.closeDashboard =
closeDashboard;





/*====================================
        DASHBOARD MENU
====================================*/


const dashboardLinks =
document.querySelectorAll(
".dashboard-sidebar li[data-page]"
);



dashboardLinks.forEach(link=>{


link.addEventListener("click",()=>{


const page =
link.dataset.page;



document
.querySelectorAll(".dashboard-page")
.forEach(p=>{

p.classList.remove("active");

});



const target =
document.getElementById(page);



if(target){

target.classList.add("active");

}




dashboardLinks.forEach(item=>{

item.classList.remove("active");

});


link.classList.add("active");



});



});






/*====================================
        LOGOUT
====================================*/


const logoutBtn =
document.getElementById("logoutBtn");



if(logoutBtn){


logoutBtn.addEventListener("click",()=>{


localStorage.removeItem(
"gilsaUser"
);



closeDashboard();



alert(
"با موفقیت خارج شدید"
);



});


}






/*====================================
        LOAD ORDERS
====================================*/


function loadOrders(){


const table =
document.getElementById(
"ordersTable"
);



if(!table)
return;



const orders = JSON.parse(

localStorage.getItem(
"gilsaOrders"
)

) || [];



table.innerHTML="";



orders.forEach(order=>{


table.innerHTML += `

<tr>

<td>
${order.code || "-"}
</td>


<td>
${order.work || "-"}
</td>


<td>
${order.status || "در انتظار"}
</td>


</tr>

`;


});


}





});
