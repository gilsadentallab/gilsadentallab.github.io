// ===== Order System =====


// قیمت پایه هر کار

const prices = {

    zirconia: 2500000,

    pfm: 1800000,

    implant: 3500000,

    emax: 3000000,

    laminate: 4000000,

    repair: 500000

};



const calcButton = document.querySelector(".calc-price");

const sendButton = document.querySelector(".send-order");



let finalPrice = 0;



// محاسبه قیمت

calcButton.addEventListener("click", function(){


    const workType = document.getElementById("workType").value;

    const count = document.getElementById("workCount").value;



    if(workType === ""){

        alert("لطفاً نوع کار را انتخاب کنید");

        return;

    }



    finalPrice = prices[workType] * count;



    document.getElementById("totalPrice").innerHTML =

    finalPrice.toLocaleString() + " تومان";



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


    const notes =
    document.getElementById("notes").value;

const toothNumber =
document.getElementById("toothNumber").value;


const shade =
document.getElementById("shade").value;


const material =
document.getElementById("material").value;

    if(name === "" || phone === ""){

        alert("لطفاً نام و شماره تماس را وارد کنید");

        return;

    }



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
