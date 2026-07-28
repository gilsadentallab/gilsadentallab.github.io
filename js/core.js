/*==================================================
                GILSA CORE V4
==================================================*/

const Core = {

version:"4.0.0",

started:false,

modules:[],

register(module){

this.modules.push(module);

},

init(){

if(this.started) return;

this.started=true;

this.modules.forEach(module=>{

if(typeof module.init==="function"){

module.init();

}

});

console.log(

`Gilsa V${this.version} Started`

);

}

};
