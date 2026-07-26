// ===== Gilsa Order System =====


// قیمت پایه هر کار

const basePrices = {

    zirconia: 2500000,

    pfm: 1800000,

    implant: 3500000,

    emax: 3000000,

    laminate: 4000000,

    repair: 500000

};



// قیمت اضافه متریال

const materialExtra = {

    "Zirconia HT": 0,

    "Zirconia Multilayer": 700000,

    "E.max Press": 1000000,

    "E.max CAD": 800000,

    "PFM": 0

};



let finalPrice = 0;



const calcButton =
document.querySelector(".calc-price");


const sendButton =
document.querySelector(".send-order");


const confirmButton =
document.querySelector(".confirm-send");


const confirmBox =
document.getElementById("confirmBox");
// ===== Calculate Price =====


calcButton.addEventListener("click", function(){


    const workType =
    document.getElementById("workType").value;


    const count =
    Number(document.getElementById("workCount").value);



    const material =
    document.getElementById("material").value;



    if(workType === ""){

        alert("لطفاً نوع کار را انتخاب کنید");

        return;

    }



    let basePrice =
    basePrices[workType];



    let extra =
    materialExtra[material] || 0;



    finalPrice =
    (basePrice + extra) * count;



    // تخفیف سفارش تعداد بالا

    if(count >= 5){

        finalPrice =
        finalPrice * 0.9;

    }



    document.getElementById("totalPrice").innerHTML =

    finalPrice.toLocaleString()
    +
    " تومان"
    +
    "<br><small>تخفیف تعداد بالا اعمال می‌شود</small>";



    // زمان تحویل

    document.getElementById("deliveryTime").innerHTML =

    calculateDelivery(count, workType);



});




// ===== Delivery Time =====


function calculateDelivery(count, workType){


    if(workType === "implant"){

        return "7 تا 10 روز کاری";

    }



    if(count >= 5){

        return "5 تا 7 روز کاری";

    }



    return "3 تا 5 روز کاری";


}
// ===== Order Preview =====


sendButton.addEventListener("click", function(){


    if(finalPrice === 0){

        alert("لطفاً ابتدا قیمت را محاسبه کنید");

        return;

    }



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



    const toothNumber =
    document.getElementById("toothNumber").value;



    const shade =
    document.getElementById("shade").value;



    const material =
    document.getElementById("material").value;



    const notes =
    document.getElementById("notes").value;



    const file =
    document.getElementById("workFile").files[0];



    const fileName =
    file ? file.name : "ندارد";





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


    <strong>تعداد واحد:</strong>
    ${count}

    <br>


    <strong>شماره دندان:</strong>
    ${toothNumber}

    <br>


    <strong>Shade:</strong>
    ${shade}

    <br>


    <strong>متریال:</strong>
    ${material}

    <br>


    <strong>تاریخ تحویل:</strong>
    ${date}

    <br>


    <strong>زمان آماده سازی:</strong>
    ${calculateDelivery(count, work.value)}

    <br>


    <strong>مبلغ تقریبی:</strong>
    ${finalPrice.toLocaleString()} تومان

    <br>


    <strong>فایل پیوست:</strong>
    ${fileName}

    <br>


    <strong>توضیحات:</strong>
    ${notes}


    `;



    confirmBox.style.display = "block";


});
// ===== Confirm & Send WhatsApp =====


confirmButton.addEventListener("click", function(){


    const text =
    document.getElementById("orderPreview").innerText;



    const whatsappNumber = "989140503522";



    const url =

    "https://wa.me/"
    +
    whatsappNumber
    +
    "?text="
    +
    encodeURIComponent(

        "سلام لابراتوار گیلسا\n\n"
        +
        text

    );



    window.open(url, "_blank");


});




// ===== File Preview =====


const fileInput =
document.getElementById("workFile");


const filePreview =
document.getElementById("filePreview");



if(fileInput && filePreview){


fileInput.addEventListener("change", function(){


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



    // نمایش عکس

    if(file.type.startsWith("image/")){


        const reader = new FileReader();



        reader.onload = function(e){


            filePreview.innerHTML +=

            `
            <br>
            <img src="${e.target.result}">
            `;


        }



        reader.readAsDataURL(file);


    }



});


}
