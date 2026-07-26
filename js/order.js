// ===== Order System =====


// قیمت پایه هر کار

const basePrices = {


    zirconia: 2500000,

    pfm: 1800000,

    implant: 3500000,

    emax: 3000000,

    laminate: 4000000,

    repair: 500000


};



// افزایش قیمت متریال

const materialExtra = {


    "Zirconia HT": 0,

    "Zirconia Multilayer": 700000,

    "E.max Press": 1000000,

    "E.max CAD": 800000,

    "PFM": 0


};



const calcButton = document.querySelector(".calc-price");

const sendButton = document.querySelector(".send-order");

const confirmBox =
document.getElementById("confirmBox");


const confirmButton =
document.querySelector(".confirm-send");

let finalPrice = 0;



// محاسبه قیمت

calcButton.addEventListener("click", function(){


    const workType = document.getElementById("workType").value;

    const count = document.getElementById("workCount").value;



    if(workType === ""){

        alert("لطفاً نوع کار را انتخاب کنید");

        return;

    }



 let price = basePrices[workType];



let material =
document.getElementById("material").value;



let extra =
materialExtra[material] || 0;



finalPrice = (price + extra) * count;



// تخفیف تعداد بالا

if(count >= 5){

    finalPrice = finalPrice * 0.9;

}



  document.getElementById("totalPrice").innerHTML =


finalPrice.toLocaleString() 
+ 
" تومان"
+
"<br><small>تخفیف تعداد در صورت سفارش بالا اعمال شد</small>";


});





// ارسال واتساپ
sendButton.addEventListener("click", function(){


const name =
document.getElementById("customerName").value;


const phone =
document.getElementById("customerPhone").value;


const work =
document.getElementById("workType");


const workName =
work.options[work.selectedIndex].text;


const count =
document.getElementById("workCount").value;


const date =
document.getElementById("deliveryDate").value;


const shade =
document.getElementById("shade").value;


const material =
document.getElementById("material").value;


const notes =
document.getElementById("notes").value;



document.getElementById("orderPreview").innerHTML = `


<strong>نام پزشک:</strong>
${name}

<br>

<strong>شماره تماس:</strong>
${phone}

<br>

<strong>نوع کار:</strong>
${workName}

<br>

<strong>تعداد:</strong>
${count}

<br>

<strong>تاریخ تحویل:</strong>
${date}

<br>

<strong>Shade:</strong>
${shade}

<br>

<strong>متریال:</strong>
${material}

<br>

<strong>مبلغ تقریبی:</strong>
${finalPrice.toLocaleString()} تومان

<br>

<strong>توضیحات:</strong>
${notes}


`;



confirmBox.style.display="block";


});
confirmButton.addEventListener("click",function(){


const text =
document.getElementById("orderPreview").innerText;


const whatsappNumber="989xxxxxxxxx";


const url =
"https://wa.me/"
+ whatsappNumber
+"?text="
+encodeURIComponent(text);



window.open(url,"_blank");


});
    const message =

`سلام لابراتوار گیلسا

نام پزشک:
${name}

شماره تماس:
${phone}

نوع کار:
${workName}

تعداد:
${count}
شماره دندان:
${toothNumber}

Shade:
${shade}

متریال:
${material}
تاریخ تحویل:
${date}

مبلغ تقریبی:
${finalPrice.toLocaleString()} تومان

توضیحات:
${notes}
`;



    const whatsappNumber = "989140503522";


    const url =

    "https://wa.me/" 
    + whatsappNumber 
    + "?text=" 
    + encodeURIComponent(message);



    window.open(url, "_blank");


});
// ===== File Preview =====


const fileInput =
document.getElementById("workFile");


const filePreview =
document.getElementById("filePreview");



fileInput.addEventListener("change",function(){


    const file = this.files[0];


    if(!file){

        filePreview.innerHTML =
        "فایلی انتخاب نشده";

        return;

    }



    filePreview.innerHTML =

    `
    <strong>
    ${file.name}
    </strong>
    `;



    // اگر عکس بود نمایش بده

    if(file.type.startsWith("image/")){


        const reader = new FileReader();



        reader.onload=function(e){


            filePreview.innerHTML +=

            `
            <br>
            <img src="${e.target.result}">
            `;


        }



        reader.readAsDataURL(file);

    }
const file =
document.getElementById("workFile").files[0];


const fileName =
file ? file.name : "ندارد";

});
function calculateDelivery(count, workType){


if(workType === "implant"){

    return "7 تا 10 روز کاری";

}


if(count >= 5){

    return "5 تا 7 روز کاری";

}


return "3 تا 5 روز کاری";


}
