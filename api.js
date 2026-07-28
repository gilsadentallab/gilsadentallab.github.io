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
API.auth = {

    async login(username,password){

        return Services.auth.login(
            username,
            password
        );

    },

    async register(user){

        return Services.auth.register(
            user
        );

    },

    async logout(){

        return Services.auth.logout();

    }

};
API.orders = {

    async getMine(){

        return Services.orders.mine();

    },

    async getAll(){

        return Services.orders.all();

    },

    async save(list){

        return Services.orders.save(
            list
        );

    }

};
