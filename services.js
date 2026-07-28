/*==================================================
                SERVICE LAYER V4
==================================================*/

const Services = {

    mode:"local",

    init(){

        console.log(
            "Service Mode:",
            this.mode
        );

    },

    setMode(mode){

        this.mode=mode;

    },

};
