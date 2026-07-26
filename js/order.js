/*=====================================
        GILSA ORDER SYSTEM FINAL
=====================================*/


document.addEventListener("DOMContentLoaded",()=>{





/*=====================================
        PRICE LIST
=====================================*/


const basePrices={


zirconia:2500000,

implant:3500000,

pfm:1800000,

emax:3000000


};




const materialExtra={


"Zirconia HT":0,

"Zirconia Multilayer":700000,

"E.max Press":1000000,

"E.max CAD":800000,

"PFM":0


};




let finalPrice=0;









/*=====================================
        CALCULATE PRICE
=====================================*/


const calcBtn =
document.querySelector(".calc-price");



if(calcBtn){


calcBtn.addEventListener("click",()=>{



const work =
document.getElementById("workType")?.value;



const count =
Number(
document.getElementById("workCount")?.value
);



const material =
document.getElementById("material")?.value;





if(!work || !count){


alert(
"نوع کار و تعداد را وارد کنید"
);


return;


}






finalPrice =
(
basePrices[work]
+
(materialExtra[material] || 0)

)
*
count;





if(count>=5){

finalPrice*=0.9;

}





const priceBox =
document.getElementById("totalPrice");



if(priceBox){


priceBox.innerHTML =
finalPrice.toLocaleString("fa-IR")
+
" تومان";


}







const delivery =
document.getElementById("deliveryTime");



if(delivery){


delivery.innerText =
getDeliveryTime(
count,
work
);


}




});



}








/*=====================================
        DELIVERY
=====================================*/


function getDeliveryTime(count,work){


if(work==="implant"){

return "۷ تا ۱۰ روز کاری";

}


if(count>=5){

return "۵ تا ۷ روز کاری";

}


return "۳ تا ۵ روز کاری";


}









/*=====================================
        SEND ORDER PREVIEW
=====================================*/


const sendBtn =
document.querySelector(".send-order");



const confirmBox =
document.getElementById("confirmBox");



if(sendBtn){


sendBtn.addEventListener("click",()=>{



if(finalPrice===0){


alert(
"ابتدا قیمت را محاسبه کنید"
);


return;


}




const data =
getOrderData();





const preview =
document.getElementById("orderPreview");



if(preview){


preview.innerHTML=`

<strong>نام:</strong>
${data.name}

<br>

<strong>موبایل:</strong>
${data.phone}

<br>

<strong>نوع کار:</strong>
${data.workName}

<br>

<strong>تعداد:</strong>
${data.count}

<br>

<strong>Shade:</strong>
${data.shade}

<br>

<strong>متریال:</strong>
${data.material}

<br>

<strong>قیمت:</strong>
${finalPrice.toLocaleString("fa-IR")}
تومان

<br>

<strong>توضیحات:</strong>
${data.notes}


`;

}



if(confirmBox){

confirmBox.style.display="block";

}




});



}










/*=====================================
        CONFIRM WHATSAPP
=====================================*/


const confirmBtn =
document.querySelector(".confirm-send");



if(confirmBtn){


confirmBtn.addEventListener("click",()=>{



const data =
getOrderData();





saveOrder(data);






const message =

`
سلام لابراتوار گیلسا

نام:
${data.name}

نوع کار:
${data.workName}

تعداد:
${data.count}

Shade:
${data.shade}

متریال:
${data.material}

قیمت:
${finalPrice.toLocaleString("fa-IR")}
تومان

توضیحات:
${data.notes}

`;






const number=
"989140503522";



const url=

"https://wa.me/"
+
number
+
"?text="
+
encodeURIComponent(message);




window.open(url,"_blank");





});



}









/*=====================================
        GET ORDER DATA
=====================================*/


function getOrderData(){


const work =
document.getElementById("workType");



return {


name:
document.getElementById("customerName")?.value || "",



phone:
document.getElementById("customerPhone")?.value || "",



work:
work?.value || "",



workName:
work?.options[work.selectedIndex]?.text || "",



count:
document.getElementById("workCount")?.value || 0,



shade:
document.getElementById("shade")?.value || "",



material:
document.getElementById("material")?.value || "",



notes:
document.getElementById("notes")?.value || "",



price:
finalPrice



};


}









/*=====================================
        SAVE ORDER
=====================================*/


function saveOrder(data){



let orders =

JSON.parse(

localStorage.getItem(
"gilsaOrders"
)

)

|| [];





const order={


code:
generateCode(),


...data,


status:
"در انتظار",


date:
new Date()
.toLocaleDateString("fa-IR")


};





orders.push(order);



localStorage.setItem(

"gilsaOrders",

JSON.stringify(orders)

);



}









/*=====================================
        ORDER CODE
=====================================*/


function generateCode(){


let number=

Number(

localStorage.getItem(
"gilsaOrderNumber"
)

)

||0;



number++;



localStorage.setItem(

"gilsaOrderNumber",

number

);



return "GL-"
+
String(number).padStart(5,"0");



}









/*=====================================
        LOAD ORDERS
=====================================*/


window.loadOrders=function(){



const table =
document.getElementById("ordersTable");



if(!table)
return;





const orders =

JSON.parse(

localStorage.getItem(
"gilsaOrders"
)

)

|| [];





table.innerHTML="";




orders.forEach(order=>{


table.innerHTML+=`

<tr>

<td>${order.code}</td>

<td>${order.workName}</td>

<td>${order.status}</td>

</tr>

`;


});



};





loadOrders();









/*=====================================
        FILE PREVIEW
=====================================*/


const fileInput =
document.getElementById("workFile");



const preview =
document.getElementById("filePreview");



if(fileInput && preview){



fileInput.addEventListener("change",()=>{


const file=fileInput.files[0];



if(!file){

preview.innerHTML=
"فایلی انتخاب نشده";

return;

}



preview.innerHTML=
file.name;




if(file.type.startsWith("image/")){


const reader=new FileReader();



reader.onload=(e)=>{


preview.innerHTML+=`

<br>

<img src="${e.target.result}">

`;


};



reader.readAsDataURL(file);



}



});



}





});
