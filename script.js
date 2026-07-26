/*=====================================
        GILSA MAIN SCRIPT
=====================================*/


document.addEventListener("DOMContentLoaded",()=>{


/*=====================
 PRELOADER
=====================*/

const preloader = document.getElementById("preloader");

window.addEventListener("load",()=>{

    if(preloader){

        setTimeout(()=>{

            preloader.classList.add("hide");

        },800);

    }

});



/*=====================
 HEADER SCROLL
=====================*/

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



/*=====================
 MOBILE MENU
=====================*/

const menuBtn=document.querySelector(".menu-toggle");

const nav=document.querySelector("nav");


if(menuBtn && nav){


menuBtn.addEventListener("click",()=>{


    nav.classList.toggle("open");


});



nav.querySelectorAll("a").forEach(link=>{


link.addEventListener("click",()=>{

    nav.classList.remove("open");

});


});


}




/*=====================
 REVEAL ANIMATION
=====================*/


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





/*=====================
 BACK TO TOP
=====================*/


const topBtn=document.querySelector(".back-to-top");


if(topBtn){


window.addEventListener("scroll",()=>{


if(window.scrollY>500){

topBtn.classList.add("show");


}else{


topBtn.classList.remove("show");


}


});



topBtn.addEventListener("click",()=>{


window.scrollTo({

top:0,

behavior:"smooth"

});


});


}





/*=====================
 COUNTER
=====================*/


const counters=document.querySelectorAll(".counter");


counters.forEach(counter=>{


let target=Number(counter.dataset.target);

let current=0;


let timer=setInterval(()=>{


current += Math.ceil(target/100);


if(current>=target){

current=target;

clearInterval(timer);

}


counter.innerText=current.toLocaleString("fa-IR");


},20);



});





/*=====================
 AUTH OPEN
=====================*/


const authModal=document.getElementById("authModal");

const authButtons=document.querySelectorAll(".open-auth");

const closeAuth=document.querySelector(".close-auth");



authButtons.forEach(btn=>{


btn.addEventListener("click",(e)=>{


e.preventDefault();


if(authModal){

authModal.classList.add("show");

document.body.style.overflow="hidden";

}


});


});



if(closeAuth){


closeAuth.addEventListener("click",()=>{


authModal.classList.remove("show");

document.body.style.overflow="";


});


}



if(authModal){


authModal.addEventListener("click",(e)=>{


if(e.target===authModal){


authModal.classList.remove("show");

document.body.style.overflow="";


}


});


}



});
/*=====================================
        DASHBOARD SYSTEM
=====================================*/


const dashboard = document.getElementById("dashboard");



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

        dashboard.classList.add("active");

        dashboard.style.display="flex";

    }



    document.body.style.overflow="auto";



    const dashName=document.getElementById("dashName");


    if(dashName){

        dashName.innerText =
        user.fullName || "کاربر گیلسا";

    }



    const dashType=document.getElementById("dashType");


    if(dashType){

        dashType.innerText =
        user.type==="dentist"
        ?
        "دندانپزشک"
        :
        "لابراتوار";

    }



    loadProfile(user);

    loadOrders();


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

        dashboard.classList.remove("active");

    }


}





window.openDashboard=openDashboard;

window.closeDashboard=closeDashboard;






/*=====================================
        DASHBOARD MENU
=====================================*/


const dashboardMenu=document.querySelectorAll(
".dashboard-sidebar li[data-page]"
);



const dashboardPages=document.querySelectorAll(
".dashboard-page"
);



dashboardMenu.forEach(item=>{


item.addEventListener("click",()=>{


let page=item.dataset.page;



dashboardMenu.forEach(i=>{

i.classList.remove("active");

});



item.classList.add("active");



dashboardPages.forEach(p=>{


p.classList.remove("active");



if(p.id===page){

p.classList.add("active");

}


});



});


});







/*=====================================
        PROFILE
=====================================*/


function loadProfile(user){


const box=document.getElementById("profileInfo");


if(!box)
return;



box.innerHTML=`

<p>
<strong>نام:</strong>
${user.fullName}
</p>


<p>
<strong>نوع حساب:</strong>
${user.type==="dentist"
?"دندانپزشک"
:"لابراتوار"}
</p>


<p>
<strong>محل کار:</strong>
${user.workPlace || "-"}
</p>


<p>
<strong>موبایل:</strong>
${user.mobile}
</p>


<p>
<strong>شهر:</strong>
${user.city || "-"}
</p>


`;

}




/*=====================================
        LOGOUT
=====================================*/


const logoutBtn=document.getElementById(
"logoutBtn"
);



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







/*=====================================
        AUTO LOGIN
=====================================*/


const savedUser=
JSON.parse(
localStorage.getItem("gilsaUser")
);



if(savedUser){


/*
فعلا خودکار وارد نمی‌کنیم
تا کاربر خودش دکمه ورود بزند
*/


}
/*=====================================
        GILSA FINAL CONNECTOR
=====================================*/


document.addEventListener("DOMContentLoaded",()=>{


/*=====================================
        OPEN DASHBOARD AFTER LOGIN
=====================================*/


window.showUserDashboard=function(){


const user = JSON.parse(
localStorage.getItem("gilsaUser")
);



if(user && typeof openDashboard==="function"){


openDashboard(user);


}


};






/*=====================================
        CHECK USER BUTTON
=====================================*/


const loginBtnHeader=
document.querySelector(".open-auth");



if(loginBtnHeader){


loginBtnHeader.addEventListener("click",()=>{


const user =
JSON.parse(
localStorage.getItem("gilsaUser")
);



if(user){


const result =
confirm(
"شما قبلاً حساب دارید.\nورود به پنل کاربری؟"
);



if(result && typeof openDashboard==="function"){


openDashboard(user);


}


}



});


}







/*=====================================
        ESC CLOSE MODALS
=====================================*/


document.addEventListener("keydown",(e)=>{


if(e.key==="Escape"){


const auth=
document.getElementById("authModal");



if(auth){

auth.classList.remove("show");

}



document.body.style.overflow="";


}


});







/*=====================================
        SMOOTH LINKS
=====================================*/


document.querySelectorAll(
'a[href^="#"]'
)
.forEach(link=>{


link.addEventListener("click",(e)=>{


const target =
document.querySelector(
link.getAttribute("href")
);



if(target){


e.preventDefault();


target.scrollIntoView({

behavior:"smooth"

});


}



});


});







/*=====================================
        IMAGE ERROR FIX
=====================================*/


document.querySelectorAll("img")
.forEach(img=>{


img.addEventListener("error",()=>{


img.style.display="none";


});


});






});
