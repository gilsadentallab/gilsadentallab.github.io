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
