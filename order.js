/*==================================================
        GILSA ORDER.JS
        CLEAN VERSION
==================================================*/


document.addEventListener("DOMContentLoaded",()=>{
console.log("ORDER JS LOADED");

/*========================
        ELEMENTS
========================*/


const orderModal =
document.getElementById("orderModal");


const openOrderButtons =
document.querySelectorAll(".open-order");


const closeOrder =
document.querySelector(".close-order");


const orderForm =
document.getElementById("orderForm");






/*========================
        OPEN MODAL
========================*/


openOrderButtons.forEach(btn=>{


btn.addEventListener("click",(e)=>{


e.preventDefault();



if(localStorage.getItem("gilsaLogin")!=="true"){


alert(
"برای ثبت سفارش ابتدا وارد حساب کاربری شوید"
);


document
.getElementById("authModal")
?.classList.add("active");


return;


}




orderModal?.classList.add("active");



});


});







/*========================
        CLOSE MODAL
========================*/


closeOrder?.addEventListener("click",()=>{


orderModal?.classList.remove("active");


});





orderModal?.addEventListener("click",(e)=>{


if(e.target===orderModal){


orderModal.classList.remove("active");


}


});







/*========================
        SUBMIT
========================*/


orderForm?.addEventListener("submit",(e)=>{


e.preventDefault();


saveOrder();



});



});

/*========================
        SAVE ORDER
========================*/


function saveOrder(){



const user =

JSON.parse(

localStorage.getItem("gilsaCurrentUser")

);





if(!user){


alert(

"ابتدا وارد حساب کاربری شوید"

);


return;


}







const patientName =

document.getElementById("patientName")
?.value.trim();





const service =

document.getElementById("orderService")
?.value;





const material =

document.getElementById("materialType")
?.value || "";





const shade =

document.getElementById("shade")
?.value || "";





const description =

document.getElementById("orderDescription")
?.value.trim();





const file =

document.getElementById("orderFile")
?.files[0];








if(
!patientName ||
!service
){


alert(

"لطفا نام بیمار و نوع خدمات را وارد کنید"

);


return;


}









const order = {



id:Date.now(),




owner:user.username,




ownerName:user.name,




patientName:patientName,




service:service,




material:material,




shade:shade,




description:description,




file:file ? file.name : "بدون فایل",




status:"در انتظار بررسی",




created:

new Date()

.toLocaleDateString("fa-IR")



};









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

"سفارش با موفقیت ثبت شد"

);







orderForm.reset();






const fileName =

document.getElementById("fileName");



if(fileName)

fileName.innerHTML=

"فایلی انتخاب نشده";






document

.getElementById("orderModal")

?.classList.remove("active");





renderMyOrders();



}

/*========================
        FILE HANDLER
========================*/


document.addEventListener("DOMContentLoaded",()=>{


const fileInput =

document.getElementById("orderFile");



const fileName =

document.getElementById("fileName");





fileInput?.addEventListener("change",()=>{



if(fileInput.files.length){



const file =

fileInput.files[0];






if(file.size > 10 * 1024 * 1024){



alert(

"حجم فایل نباید بیشتر از 10 مگابایت باشد"

);



fileInput.value="";



return;



}





if(fileName){



fileName.innerHTML =

`

📎 ${file.name}

`;



}




}

else{


if(fileName){


fileName.innerHTML =

"فایلی انتخاب نشده";


}


}



});



});








/*========================
        GET ORDERS
========================*/


function getAllOrders(){


return JSON.parse(

localStorage.getItem("gilsaOrders")

)

|| [];


}







function getMyOrders(){



const user =

JSON.parse(

localStorage.getItem("gilsaCurrentUser")

);




if(!user)

return [];





return getAllOrders().filter(order=>


order.owner === user.username


);



}









/*========================
        SHOW ORDERS
========================*/


function renderMyOrders(){



const table =

document.getElementById("ordersTable");





if(!table)

return;







const orders =

getMyOrders();






table.innerHTML="";







if(orders.length===0){



table.innerHTML=

`

<tr>

<td colspan="3">

هنوز سفارشی ثبت نشده است

</td>

</tr>

`;



return;



}







orders.forEach(order=>{



table.innerHTML +=

`

<tr>


<td>

${order.id}

</td>



<td>

${order.service}

</td>



<td>

${order.status}

</td>



</tr>

`;



});




}







document.addEventListener("DOMContentLoaded",()=>{


renderMyOrders();


});

/*========================
        DELETE ORDER
========================*/


function deleteOrder(id){



let orders =

getAllOrders();





orders = orders.filter(order=>


order.id !== id


);





localStorage.setItem(

"gilsaOrders",

JSON.stringify(orders)

);





renderMyOrders();



}







/*========================
        CALCULATE PRICE
========================*/


document.addEventListener("DOMContentLoaded",()=>{



const calcBtn =

document.querySelector(".calc-price");



const priceBox =

document.getElementById("totalPrice");



const deliveryBox =

document.getElementById("deliveryTime");





calcBtn?.addEventListener("click",()=>{



const service =

document.getElementById("orderService")
?.value;





let price = 0;

let time = "";






switch(service){



case "zirconia":


price = 2500000;

time = "۳ تا ۵ روز کاری";


break;





case "implant":


price = 4000000;

time = "۵ تا ۷ روز کاری";


break;





case "emax":


price = 3500000;

time = "۳ تا ۵ روز کاری";


break;





case "pfm":


price = 2000000;

time = "۳ تا ۴ روز کاری";


break;





default:


alert(

"ابتدا نوع خدمات را انتخاب کنید"

);


return;



}







if(priceBox)


priceBox.innerHTML =

price.toLocaleString("fa-IR")

+

" تومان";







if(deliveryBox)


deliveryBox.innerHTML =

"زمان تحویل: "

+

time;






});



});







/*========================
        SEARCH
========================*/


function searchOrders(text){



return getMyOrders().filter(order=>


order.patientName.includes(text)

||

order.service.includes(text)


);



}







/*========================
        LAST ORDER
========================*/


function getLastOrder(){



const orders =

getMyOrders();




if(!orders.length)

return null;




return orders[orders.length-1];


}







/*========================
        ORDER COUNT
========================*/


function countMyOrders(){



return getMyOrders().length;


}







/*========================
        START
========================*/


document.addEventListener("DOMContentLoaded",()=>{


renderMyOrders();



});
