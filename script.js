/*====================================
        GILSA MAIN SCRIPT
====================================*/


document.addEventListener("DOMContentLoaded",()=>{


/*====================
PRELOADER
====================*/


const preloader =
document.getElementById("preloader");


window.addEventListener("load",()=>{


if(preloader){

setTimeout(()=>{

preloader.classList.add("hide");

},700);

}


});





/*====================
HEADER SCROLL
====================*/


const header =
document.getElementById("header");


window.addEventListener("scroll",()=>{


if(!header) return;


if(window.scrollY > 50){

header.classList.add("scrolled");

}else{

header.classList.remove("scrolled");

}


});





/*====================
MOBILE MENU
====================*/


const menuBtn =
document.querySelector(".menu-toggle");


const nav =
document.querySelector("nav");



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






/*====================
REVEAL ANIMATION
====================*/


const reveals =
document.querySelectorAll(".reveal");



const observer =
new IntersectionObserver((entries)=>{


entries.forEach(entry=>{


if(entry.isIntersecting){

entry.target.classList.add("show");

}


});


},{
threshold:.15

});



reveals.forEach(item=>{

observer.observe(item);

});







/*====================
COUNTER
====================*/


const counters =
document.querySelectorAll(".counter");



let counterStarted=false;



function startCounter(){


if(counterStarted) return;


counters.forEach(counter=>{


let target =
Number(counter.dataset.target);



let current=0;



let step =
Math.ceil(target/100);



let timer =
setInterval(()=>{


current += step;



if(current>=target){


current=target;

clearInterval(timer);


}



counter.innerText =
current.toLocaleString("fa-IR");



},20);



});



counterStarted=true;


}



const stats =
document.getElementById("stats");



if(stats){


const statsObserver =
new IntersectionObserver((entries)=>{


if(entries[0].isIntersecting){

startCounter();

}


});



statsObserver.observe(stats);


}







/*====================
BACK TO TOP
====================*/


const topBtn =
document.querySelector(".back-to-top");



if(topBtn){


window.addEventListener("scroll",()=>{


if(window.scrollY > 500){

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







/*====================
GALLERY LIGHTBOX
====================*/


const galleryImages =
document.querySelectorAll(".gallery-item img");



if(galleryImages.length){



const lightbox =
document.createElement("div");


lightbox.className="lightbox";



lightbox.innerHTML=`

<img src="">

<span class="close-lightbox">
×
</span>

`;



document.body.appendChild(lightbox);



const lightImage =
lightbox.querySelector("img");



galleryImages.forEach(img=>{


img.addEventListener("click",()=>{


lightImage.src =
img.src;


lightbox.classList.add("show");


});


});



lightbox.addEventListener("click",(e)=>{


if(e.target===lightbox ||
e.target.classList.contains("close-lightbox")){


lightbox.classList.remove("show");


}


});



}







/*====================
DASHBOARD TABS
====================*/


const dashboardItems =
document.querySelectorAll(".dashboard-sidebar li[data-page]");



const pages =
document.querySelectorAll(".dashboard-page");



dashboardItems.forEach(item=>{


item.addEventListener("click",()=>{


let page =
item.dataset.page;



dashboardItems.forEach(i=>{

i.classList.remove("active");

});



item.classList.add("active");



pages.forEach(p=>{


p.classList.remove("active");


if(p.id===page){

p.classList.add("active");

}


});


});


});





});
