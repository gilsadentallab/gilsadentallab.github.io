/*==================================================
                API LAYER V4
==================================================*/

const API = {

    provider: "local",

    init(){

        console.log(
            "API Provider:",
            this.provider
        );

    },

    setProvider(provider){

        this.provider = provider;

    }

};
