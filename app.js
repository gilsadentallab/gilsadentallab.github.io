document.addEventListener(

"DOMContentLoaded",

()=>{

Core.register(UI);

Core.register(Auth);

Core.register(Order);

Core.register(Dashboard);

Core.register(PriceList);

Core.init();

});
