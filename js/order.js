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
