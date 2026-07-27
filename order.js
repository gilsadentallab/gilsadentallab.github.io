/*==================================================
                GILSA ORDER.JS
                ORDER SYSTEM V2
==================================================*/


document.addEventListener(
"DOMContentLoaded",
()=>{



/*==========================
        ELEMENTS
==========================*/


const orderForm =

document.querySelector("#orderForm");



const orderModal =

document.querySelector("#orderModal");



const openOrderButtons =

document.querySelectorAll(".order-btn");



const closeOrder =

document.querySelector(".close-order");





/*==========================
        OPEN ORDER FORM
==========================*/


openOrderButtons.forEach(btn=>{


btn.addEventListener(
"click",
()=>{



if(!requireLogin()){

return;

}




orderModal?.classList.add(
"active"
);



});



});





/*==========================
        CLOSE ORDER FORM
==========================*/


closeOrder?.addEventListener(
"click",
()=>{


orderModal?.classList.remove(
"active"
);



});





orderModal?.addEventListener(
"click",
(e)=>{


if(e.target === orderModal){


orderModal.classList.remove(
"active"
);



}



});






/*==========================
        CHECK FORM
==========================*/


if(!orderForm)

return;




orderForm.addEventListener(
"submit",
(e)=>{


e.preventDefault();




if(!requireLogin()){


return;


}





saveOrder();



});




});
/*==========================
        CREATE ORDER
==========================*/


function saveOrder(){



const user =

getCurrentUser();




if(!user){


alert(
"کاربر یافت نشد"
);


return;


}





/*==========================
        ORDER DATA
==========================*/


const order = {



id:

Date.now(),




owner:

user.username,



ownerName:

user.name,




patientName:

document.querySelector("#patientName")
?.value.trim(),




service:

document.querySelector("#orderService")
?.value,




material:

document.querySelector("#materialType")
?.value || "",




shade:

document.querySelector("#shade")
?.value || "",




description:

document.querySelector("#orderDescription")
?.value.trim(),




file:

document.querySelector("#orderFile")
?.files[0]
?.name || "بدون فایل",




status:

"در انتظار بررسی",




created:

new Date().toLocaleDateString("fa-IR")



};






/*==========================
        VALIDATION
==========================*/


if(

!order.patientName ||

!order.service

){


alert(

"لطفا اطلاعات ضروری سفارش را تکمیل کنید"

);



return;


}







/*==========================
        SAVE
==========================*/


let orders =

JSON.parse(

localStorage.getItem(
"gilsaOrders"
)

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





document
.querySelector("#orderForm")
?.reset();






const orderModal =

document.querySelector("#orderModal");



orderModal?.classList.remove(
"active"
);





}




/*==========================
        GET ALL ORDERS
==========================*/


function getAllOrders(){



return JSON.parse(

localStorage.getItem(
"gilsaOrders"
)

)

|| [];



}





/*==========================
        GET CURRENT USER ORDERS
==========================*/


function getMyOrders(){



const user =

getCurrentUser();




if(!user)

return [];





const orders =

getAllOrders();





return orders.filter(order=>


order.owner === user.username


);



}
/*==========================
        RENDER ORDERS
==========================*/


function renderMyOrders(){



const orderList =

document.querySelector("#orderList");




if(!orderList)

return;





const orders =

getMyOrders();





if(orders.length === 0){



orderList.innerHTML =

`

<div class="empty-orders">

<p>

هنوز سفارشی ثبت نکرده‌اید

</p>

</div>

`;



return;


}





orderList.innerHTML = "";






orders.forEach(order=>{





orderList.innerHTML +=



`

<div class="order-card">



<div class="order-head">


<h3>

سفارش #${order.id}

</h3>


<span class="order-status">

${order.status}

</span>


</div>





<div class="order-body">


<p>

<b>بیمار:</b>

${order.patientName}

</p>




<p>

<b>خدمات:</b>

${order.service}

</p>




<p>

<b>متریال:</b>

${order.material || "-"}

</p>




<p>

<b>رنگ:</b>

${order.shade || "-"}

</p>




<p>

<b>تاریخ ثبت:</b>

${order.created}

</p>




<p>

<b>فایل:</b>

${order.file}

</p>



</div>






<button

class="delete-order"

data-id="${order.id}"

>


حذف سفارش

</button>




</div>

`;





});





/* DELETE BUTTONS */


document

.querySelectorAll(".delete-order")

.forEach(btn=>{



btn.addEventListener(
"click",
()=>{



deleteOrder(

Number(btn.dataset.id)

);



});


});



}







/*==========================
        DELETE ORDER
==========================*/


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





/*==========================
        AUTO LOAD
==========================*/


document.addEventListener(
"DOMContentLoaded",
()=>{


renderMyOrders();



});
/*==========================
        FILE HANDLER
==========================*/


document.addEventListener(
"DOMContentLoaded",
()=>{


const fileInput =

document.querySelector("#orderFile");



const fileLabel =

document.querySelector("#fileName");




fileInput?.addEventListener(
"change",
()=>{



if(fileInput.files.length){



let file =

fileInput.files[0];




/* CHECK FILE SIZE */


if(file.size > 10 * 1024 * 1024){


alert(
"حجم فایل نباید بیشتر از 10 مگابایت باشد"
);



fileInput.value="";

return;


}





if(fileLabel){



fileLabel.innerHTML =

`

📎 ${file.name}

`;



}



}

else{


if(fileLabel)

fileLabel.innerHTML =

"فایلی انتخاب نشده";



}



});



});





/*==========================
        SEARCH ORDERS
==========================*/


function searchOrders(text){



const orders =

getMyOrders();





return orders.filter(order=>


order.patientName

.includes(text)

||

order.service

.includes(text)


);



}






/*==========================
        CHANGE ORDER STATUS
        (LAB PANEL READY)
==========================*/


function updateOrderStatus(id,status){



let orders =

getAllOrders();





let order =

orders.find(o=>

o.id === id

);





if(!order)

return;





order.status = status;





localStorage.setItem(

"gilsaOrders",

JSON.stringify(orders)

);






renderMyOrders();



}






/*==========================
        ORDER COUNTER
==========================*/


function countMyOrders(){



return getMyOrders().length;



}






/*==========================
        LAST ORDER
==========================*/


function getLastOrder(){



const orders =

getMyOrders();





if(!orders.length)

return null;





return orders[orders.length-1];



}






/*==========================
        EXPORT USER ORDERS
==========================*/


function exportOrders(){



const data =

JSON.stringify(

getMyOrders(),

null,

2

);





const blob =

new Blob(

[data],

{

type:"application/json"

}

);





const url =

URL.createObjectURL(blob);





const a =

document.createElement("a");



a.href=url;



a.download=

"gilsa-orders.json";



a.click();





URL.revokeObjectURL(url);



}
