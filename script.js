/*==================================================
                GILSA DENTAL LAB
                PREMIUM SCRIPT V2
==================================================*/


/*==========================
        PRELOADER
==========================*/


window.addEventListener("load",()=>{


    const preloader =
    document.querySelector("#preloader");


    if(preloader){

        setTimeout(()=>{

            preloader.classList.add("hide");

        },800);

    }


});



/*==========================
        HEADER SCROLL
==========================*/


const header =
document.querySelector("#header");



window.addEventListener("scroll",()=>{


    if(window.scrollY > 50){

        header?.classList.add("scrolled");

    }

    else{

        header?.classList.remove("scrolled");

    }


});



/*==========================
        MOBILE MENU
==========================*/


const menuBtn =
document.querySelector(".menu-toggle");


const nav =
document.querySelector("nav");



if(menuBtn){


menuBtn.addEventListener("click",()=>{


    menuBtn.classList.toggle("active");


    nav.classList.toggle("active");


});


}



document.querySelectorAll("nav a")
.forEach(link=>{


    link.addEventListener("click",()=>{


        menuBtn?.classList.remove("active");


        nav?.classList.remove("active");


    });


});



/*==========================
        BACK TO TOP
==========================*/


const backTop =
document.querySelector(".back-to-top");



window.addEventListener("scroll",()=>{


    if(window.scrollY > 500){


        backTop?.classList.add("show");


    }

    else{


        backTop?.classList.remove("show");


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



/*==========================
        REVEAL ANIMATION
==========================*/


const revealElements =
document.querySelectorAll(
".reveal,.fade-left,.fade-right"
);



const revealObserver =
new IntersectionObserver((entries)=>{


entries.forEach(entry=>{


if(entry.isIntersecting){


entry.target.classList.add("active");


}


});


},{

threshold:.15

});



revealElements.forEach(el=>{


revealObserver.observe(el);


});



/*==========================
        ACTIVE NAV LINK
==========================*/


const sections =
document.querySelectorAll("section");


const navLinks =
document.querySelectorAll("nav a");



window.addEventListener("scroll",()=>{


let current="";


sections.forEach(section=>{


const top =
section.offsetTop - 150;


const height =
section.offsetHeight;


if(
scrollY >= top &&
scrollY < top + height
){

current =
section.getAttribute("id");

}


});



navLinks.forEach(link=>{


link.classList.remove("active");



if(
link.getAttribute("href")
===
"#"+current
){

link.classList.add("active");

}


});


});
/*==========================
        GALLERY LIGHTBOX
==========================*/


const galleryItems =
document.querySelectorAll(".gallery-item img");


const lightbox =
document.querySelector("#lightbox");

const lightboxImg =
document.querySelector("#lightbox img");

const lightboxClose =
document.querySelector(".lightbox-close");



galleryItems.forEach(img=>{


img.addEventListener("click",()=>{


if(lightbox){


lightbox.classList.add("active");


lightboxImg.src =
img.src;


}


});


});



if(lightboxClose){


lightboxClose.addEventListener("click",()=>{


lightbox.classList.remove("active");


});


}



if(lightbox){


lightbox.addEventListener("click",(e)=>{


if(e.target===lightbox){


lightbox.classList.remove("active");


}


});


}



/*==========================
        STATS COUNTER
==========================*/


const counters =
document.querySelectorAll(".counter");



let counterStarted=false;



function startCounter(){


if(counterStarted)
return;



counterStarted=true;



counters.forEach(counter=>{


let target =
+counter.dataset.target;


let count=0;


let speed =
target / 100;



let update=()=>{


if(count < target){


count += speed;


counter.innerText =
Math.ceil(count);


requestAnimationFrame(update);


}

else{


counter.innerText =
target;


}


};



update();



});


}



const statsSection =
document.querySelector(".stats");



if(statsSection){


window.addEventListener("scroll",()=>{


let position =
statsSection.getBoundingClientRect().top;



if(
position <
window.innerHeight - 150
){


startCounter();


}


});


}



/*==========================
        CONTACT FORM
==========================*/


const contactForm =
document.querySelector("#contactForm");



if(contactForm){


contactForm.addEventListener("submit",(e)=>{


e.preventDefault();



let contactData={


name:
document.querySelector("#contactName")?.value,


phone:
document.querySelector("#contactPhone")?.value,


message:
document.querySelector("#contactMessage")?.value,


date:
new Date().toLocaleDateString("fa-IR")


};



let messages =
JSON.parse(
localStorage.getItem("gilsaMessages")
)
||[];



messages.push(contactData);



localStorage.setItem(
"gilsaMessages",
JSON.stringify(messages)
);



alert(
"پیام شما با موفقیت ارسال شد"
);



contactForm.reset();



});


}



/*==========================
        PARALLAX EFFECT
==========================*/


const heroCircle =
document.querySelector(".hero-circle");



window.addEventListener("mousemove",(e)=>{


if(heroCircle){


let x =
(e.clientX / window.innerWidth - .5) * 20;


let y =
(e.clientY / window.innerHeight - .5) * 20;



heroCircle.style.transform =
`translate(${x}px,${y}px)`;


}


});



/*==========================
        IMAGE ERROR FIX
==========================*/


document.querySelectorAll("img")
.forEach(img=>{


img.addEventListener("error",()=>{


img.style.display="none";


});


});
/*==================================================
                AUTH SYSTEM
==================================================*/


const authModal =
document.querySelector("#authModal");


const authButtons =
document.querySelectorAll(".auth-btn");


const closeAuth =
document.querySelector(".close-auth");



/*==========================
        OPEN AUTH
==========================*/


authButtons.forEach(btn=>{


btn.addEventListener("click",()=>{


authModal?.classList.add("active");


});


});



/*==========================
        CLOSE AUTH
==========================*/


if(closeAuth){


closeAuth.addEventListener("click",()=>{


authModal.classList.remove("active");


});


}



window.addEventListener("click",(e)=>{


if(e.target === authModal){


authModal.classList.remove("active");


}


});



/*==========================
        LOGIN REGISTER SWITCH
==========================*/


const loginBox =
document.querySelector("#loginBox");


const registerBox =
document.querySelector("#registerBox");



const showRegister =
document.querySelector("#showRegister");


const showLogin =
document.querySelector("#showLogin");



if(showRegister){


showRegister.addEventListener("click",()=>{


loginBox.style.display="none";

registerBox.style.display="block";


});


}



if(showLogin){


showLogin.addEventListener("click",()=>{


registerBox.style.display="none";

loginBox.style.display="block";


});


}



/*==========================
        REGISTER USER
==========================*/


const registerForm =
document.querySelector("#registerForm");



if(registerForm){


registerForm.addEventListener("submit",(e)=>{


e.preventDefault();



let userType =
document.querySelector("#userType")?.value;



let user={


type:userType,


name:
document.querySelector("#registerName")?.value,


username:
document.querySelector("#registerUsername")?.value,


password:
document.querySelector("#registerPassword")?.value,


mobile:
document.querySelector("#registerMobile")?.value,


clinic:
document.querySelector("#clinicName")?.value || "",


address:
document.querySelector("#registerAddress")?.value || "",


location:
document.querySelector("#registerLocation")?.value || ""



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


}



/*==========================
        LOGIN USER
==========================*/


const loginForm =
document.querySelector("#loginForm");



if(loginForm){


loginForm.addEventListener("submit",(e)=>{


e.preventDefault();



let username =
document.querySelector("#loginUsername")?.value;



let password =
document.querySelector("#loginPassword")?.value;



let savedUser =
JSON.parse(
localStorage.getItem("gilsaUser")
);



if(

savedUser &&

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



authModal?.classList.remove("active");



updateAuthButton();



}

else{


alert(
"نام کاربری یا رمز عبور اشتباه است"
);


}



});


}



/*==========================
        UPDATE USER BUTTON
==========================*/


function updateAuthButton(){



let login =
localStorage.getItem("gilsaLogin");



let current =
JSON.parse(
localStorage.getItem("gilsaCurrentUser")
);



let btn =
document.querySelector(".auth-btn");



if(btn && login==="true"){


btn.innerHTML =

`
<i>👤</i>
${current?.name || "حساب کاربری"}
`;


}


}



updateAuthButton();



/*==========================
        LOGOUT
==========================*/


const logoutBtn =
document.querySelector("#logoutBtn");



if(logoutBtn){


logoutBtn.addEventListener("click",()=>{


localStorage.removeItem("gilsaLogin");

localStorage.removeItem("gilsaCurrentUser");


alert(
"از حساب خارج شدید"
);



location.reload();



});


}
/*==================================================
                ORDER SYSTEM
==================================================*/


const orderForm =
document.querySelector("#orderForm");



/*==========================
        SUBMIT ORDER
==========================*/


if(orderForm){


orderForm.addEventListener("submit",(e)=>{


e.preventDefault();



/* CHECK LOGIN */


let isLogin =
localStorage.getItem("gilsaLogin");



if(isLogin !== "true"){


alert(
"برای ثبت سفارش ابتدا وارد حساب کاربری شوید"
);



authModal?.classList.add("active");


return;


}




let currentUser =

JSON.parse(

localStorage.getItem("gilsaCurrentUser")

);





/* CREATE ORDER */


let order={


id:
Date.now(),



user:

currentUser.username,



userName:

currentUser.name,



patient:

document.querySelector("#patientName")?.value,



service:

document.querySelector("#orderService")?.value,



material:

document.querySelector("#materialType")?.value,



shade:

document.querySelector("#shade")?.value,



description:

document.querySelector("#orderDescription")?.value,



file:

document.querySelector("#orderFile")?.files[0]?.name || "بدون فایل",



status:

"در انتظار بررسی",



date:

new Date().toLocaleDateString("fa-IR")



};





/* SAVE ORDER */


let orders =

JSON.parse(

localStorage.getItem("gilsaOrders")

)

|| [];




orders.push(order);



localStorage.setItem(

"gilsaOrders",

JSON.stringify(orders)

);





alert(

"سفارش شما با موفقیت ثبت شد"

);



orderForm.reset();



});


}




/*==========================
        LOAD USER ORDERS
==========================*/


function getUserOrders(){



let user =

JSON.parse(

localStorage.getItem("gilsaCurrentUser")

);



if(!user)

return [];





let orders =

JSON.parse(

localStorage.getItem("gilsaOrders")

)

|| [];




return orders.filter(order=>


order.user === user.username


);



}




/*==========================
        SHOW ORDERS
==========================*/


const orderList =
document.querySelector("#orderList");



function renderOrders(){



if(!orderList)
return;



let orders =
getUserOrders();




if(orders.length===0){


orderList.innerHTML =

`
<p class="empty-orders">
هنوز سفارشی ثبت نکرده‌اید
</p>
`;


return;


}





orderList.innerHTML="";



orders.forEach(order=>{



orderList.innerHTML +=


`

<div class="order-card">


<h3>

سفارش #${order.id}

</h3>


<p>
خدمت:
${order.service}
</p>


<p>
بیمار:
${order.patient}
</p>


<p>
وضعیت:
<span>
${order.status}
</span>
</p>


<p>
تاریخ:
${order.date}
</p>


</div>


`;



});


}



renderOrders();




/*==========================
        FILE NAME DISPLAY
==========================*/


const fileInput =
document.querySelector("#orderFile");


const fileName =
document.querySelector("#fileName");



if(fileInput && fileName){


fileInput.addEventListener("change",()=>{


if(fileInput.files.length){


fileName.innerHTML =

fileInput.files[0].name;


}

else{


fileName.innerHTML =

"فایلی انتخاب نشده";


}


});


}



/*==========================
        ORDER DELETE
==========================*/


function deleteOrder(id){



let orders =

JSON.parse(

localStorage.getItem("gilsaOrders")

)

|| [];




orders = orders.filter(order=>


order.id !== id


);



localStorage.setItem(

"gilsaOrders",

JSON.stringify(orders)

);



renderOrders();



}
/*==================================================
                USER DASHBOARD
==================================================*/


const dashboard =
document.querySelector("#dashboard");



function loadDashboard(){


if(!dashboard)
return;



let login =

localStorage.getItem("gilsaLogin");



if(login !== "true"){


dashboard.innerHTML =

`

<div class="login-required">

<h3>
برای مشاهده پنل ابتدا وارد شوید
</h3>


<button class="btn gold auth-btn">

ورود

</button>


</div>

`;


return;

}





let user =

JSON.parse(

localStorage.getItem("gilsaCurrentUser")

);




dashboard.innerHTML =


`

<div class="profile-card">


<div class="profile-header">


<div class="profile-avatar">

👤

</div>


<div>

<h2>

${user.name}

</h2>


<p>

${

user.type === "dentist"

?

"دندانپزشک"

:

"لابراتوار"

}

</p>


</div>


</div>




<div class="profile-info">


<p>

<b>
نام کاربری:
</b>

${user.username}

</p>



<p>

<b>
موبایل:
</b>

${user.mobile}

</p>



<p>

<b>
آدرس:
</b>

${user.address || "-"}

</p>



</div>


<button id="logoutBtn2"
class="btn">

خروج از حساب

</button>


</div>


`;



const logout =
document.querySelector("#logoutBtn2");



logout?.addEventListener("click",()=>{


localStorage.removeItem(
"gilsaLogin"
);


localStorage.removeItem(
"gilsaCurrentUser"
);



location.reload();



});



}




loadDashboard();




/*==================================================
                USER TYPE CHECK
==================================================*/


function checkUserType(){



let user =

JSON.parse(

localStorage.getItem("gilsaCurrentUser")

);



if(!user)
return;




document.body.dataset.user =
user.type;



}



checkUserType();




/*==================================================
                AUTH BUTTON TEXT
==================================================*/


function refreshUserButton(){


const btn =
document.querySelector(".auth-btn");



let login =
localStorage.getItem("gilsaLogin");



let user =
JSON.parse(

localStorage.getItem("gilsaCurrentUser")

);



if(btn && login==="true"){



btn.innerHTML =

`

👤 ${user.name}

`;



}


}



refreshUserButton();




/*==================================================
                PROTECT PAGES
==================================================*/


const protectedPages =

document.querySelectorAll(
".protected"
);



protectedPages.forEach(page=>{


let login =

localStorage.getItem(
"gilsaLogin"
);



if(login !== "true"){


page.innerHTML =

`

<div class="access-denied">


<h2>
دسترسی محدود
</h2>


<p>
لطفا ابتدا وارد حساب کاربری شوید
</p>


</div>


`;



}



});




/*==================================================
                AUTO SAVE SETTINGS
==================================================*/


window.addEventListener(
"beforeunload",
()=>{


let currentUser =

localStorage.getItem(
"gilsaCurrentUser"
);



if(currentUser){


localStorage.setItem(

"gilsaLastActive",

Date.now()

);


}



});
