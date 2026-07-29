/*==================================================
                GILSA APP V4
==================================================*/


import { Core } 
from "./core.js";


import { UI } 
from "./ui.js";


import { API } 
from "./api.js";


import { Auth } 
from "./auth.js";


import { Order } 
from "./order.js";


import { Dashboard } 
from "./dashboard.js";


import { PriceList } 
from "./pricelist.js";

import { Utils } from "./utils.js";

import { Storage } from "./storage.js";



document.addEventListener(

"DOMContentLoaded",

()=>{



    Core.register(UI);



    Core.register(API);



    Core.register(Auth);



    Core.register(Order);



    Core.register(Dashboard);



    Core.register(PriceList);



    Core.init();



    console.log(
        "Gilsa App V4 Loaded"
    );



}

);
