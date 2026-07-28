/*==================================================
                GILSA ORDER.JS
                ORDER SYSTEM V3
==================================================*/


document.addEventListener("DOMContentLoaded",()=>{


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
        OPEN ORDER
==========================*/


openOrderButtons.forEach(btn=>{


btn.addEventListener("click",(e)=>{


e.preventDefault();


if(typeof requireLogin === "function"){


if(!requireLogin()){

return;

}


}


orderModal?.classList.add("active");


});


});





/*==========================
        CLOSE ORDER
==========================*/


closeOrder?.addEventListener("click",()=>{


orderModal?.classList.remove("active");


});





orderModal?.addEventListener("click",(e)=>{


if(e.target === orderModal){


orderModal.classList.remove("active");


}


});







/*==========================
        SUBMIT ORDER
==========================*/


if(orderForm){



orderForm.addEventListener("submit",(e)=>{


e.preventDefault();



console.log("ORDER SUBMIT CLICKED");



if(typeof requireLogin === "function"){


if(!requireLogin()){

return;

}


}



saveOrder();



});



}



});







/*==================================================
        SAVE ORDER
==================================================*/


function saveOrder(){



const user = getCurrentUser ? getCurrentUser() : null;



if(!user){


alert("ابتدا وارد حساب کاربری شوید");

return;


}






const patientName =
document.querySelector("#patientName")
?.value.trim();




const service =
document.querySelector("#orderService")
?.value;




const material =
document.querySelector("#materialType")
?.value || "";




const shade =
document.querySelector("#shade")
?.value || "";




const description =
document.querySelector("#orderDescription")
?.value.trim();





const file =
document.querySelector("#orderFile")
?.files[0]?.name || "بدون فایل";








if(!patientName || !service){


alert(
"لطفا نام بیمار و نوع خدمات را وارد کنید"
);


return;


}







const order = {


id:Date.now(),


owner:user.username,


ownerName:user.name,


patientName,


service,


material,


shade,


description,


file,


status:"در انتظار بررسی",


created:new Date().toLocaleDateString("fa-IR")


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






document
.querySelector("#orderModal")
?.classList.remove("active");





renderMyOrders();



}
/*==================================================
        GET ORDERS
==================================================*/


function getAllOrders(){


return JSON.parse(

localStorage.getItem("gilsaOrders")

)

|| [];


}





function getMyOrders(){


const user =

getCurrentUser ? getCurrentUser() : null;



if(!user)

return [];





return getAllOrders().filter(order=>


order.owner === user.username


);



}






/*==================================================
        RENDER ORDERS
==================================================*/


function renderMyOrders(){



const orderList =

document.querySelector("#orderList");



const table =

document.querySelector("#ordersTable");





const orders = getMyOrders();






/* CARD VIEW */



if(orderList){



if(orders.length === 0){



orderList.innerHTML=`

<div class="empty-orders">

هنوز سفارشی ثبت نکرده‌اید

</div>

`;



}

else{



orderList.innerHTML="";




orders.forEach(order=>{


orderList.innerHTML += `


<div class="order-card">


<div class="order-head">


<h3>

سفارش #${order.id}

</h3>



<span>

${order.status}

</span>



</div>




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

<b>تاریخ:</b>

${order.created}

</p>




<button

class="delete-order"

data-id="${order.id}"

>

حذف سفارش

</button>



</div>


`;



});



}




}







/* TABLE VIEW DASHBOARD */



if(table){



table.innerHTML="";




orders.forEach(order=>{


table.innerHTML += `


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






/* DELETE BUTTON */


document

.querySelectorAll(".delete-order")

.forEach(btn=>{


btn.addEventListener("click",()=>{


deleteOrder(

Number(btn.dataset.id)

);



});


});




}







/*==================================================
        DELETE ORDER
==================================================*/


function deleteOrder(id){



let orders = getAllOrders();




orders = orders.filter(order=>


order.id !== id


);




localStorage.setItem(

"gilsaOrders",

JSON.stringify(orders)

);




renderMyOrders();



}







/*==================================================
        FILE NAME
==================================================*/


document.addEventListener("DOMContentLoaded",()=>{


const fileInput =

document.querySelector("#orderFile");



const fileName =

document.querySelector("#fileName");





fileInput?.addEventListener("change",()=>{



if(fileInput.files.length){



const file = fileInput.files[0];



if(file.size > 10 * 1024 * 1024){



alert(
"حجم فایل بیشتر از 10 مگابایت است"
);



fileInput.value="";


return;


}





if(fileName){


fileName.innerHTML =

"📎 " + file.name;


}



}



});



});







/*==================================================
        AUTO LOAD
==================================================*/


document.addEventListener("DOMContentLoaded",()=>{


renderMyOrders();


});






/*==================================================
        EXTRA FUNCTIONS
==================================================*/


function countMyOrders(){


return getMyOrders().length;


}





function getLastOrder(){



const orders=getMyOrders();



if(!orders.length)

return null;



return orders[orders.length-1];


}






function searchOrders(text){


return getMyOrders().filter(order=>


order.patientName.includes(text)

||

order.service.includes(text)


);



}






function updateOrderStatus(id,status){



let orders=getAllOrders();



let order=

orders.find(o=>o.id===id);




if(!order)

return;



order.status=status;




localStorage.setItem(

"gilsaOrders",

JSON.stringify(orders)

);



renderMyOrders();



}





console.log(
"GILSA ORDER SYSTEM READY"
);

);
alert("ORDER JS LOADED");
