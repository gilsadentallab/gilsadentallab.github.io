/*==================================================
                GILSA CORE V4
==================================================*/


const Core = {


    version:"4.0.0",


    started:false,


    modules:[],



    register(module){


        if(!module) return;


        this.modules.push(module);


    },





    init(){


        if(this.started) return;


        this.started=true;



        this.modules.forEach(module=>{


            if(
                typeof module.init === "function"
            ){

                try{


                    module.init();


                    console.log(
                        "Module Loaded:",
                        module.name || "Unknown"
                    );


                }
                catch(error){


                    console.error(
                        "Module Error:",
                        error
                    );


                }


            }


        });



        console.log(

            `Gilsa V${this.version} Started`

        );


    }



};



export { Core };
