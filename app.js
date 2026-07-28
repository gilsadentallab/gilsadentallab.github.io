/*==================================================
            GILSA CORE APP V3
==================================================*/

const App = {

    init(){

        console.log(
            "%cGILSA DENTAL LAB V3",
            "color:#d4af37;font-size:18px;font-weight:bold;"
        );

        UI.init();

        Auth.init();

        Order.init();

        Dashboard.init();

        PriceList.init();

    }

};

document.addEventListener(
    "DOMContentLoaded",
    ()=>App.init()
);
/*==================================================
                APP START
==================================================*/

document.addEventListener(

"DOMContentLoaded",

()=>{

UI.init();

Auth.init();

Order.init();

Dashboard.init();

PriceList.init();

console.log(

"%cGILSA V3 LOADED",

"color:#d4af37;font-size:18px;font-weight:bold;"

);

}

);
