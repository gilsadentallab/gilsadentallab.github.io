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
Services.auth={

login(username,password){

return Auth.login(username,password);

},

logout(){

return Auth.logout();

},

register(user){

return Auth.register(user);

},

current(){

return Storage.get("gilsaCurrentUser");

}

};
Services.orders={

all(){

return Storage.get("gilsaOrders") || [];

},

save(list){

Storage.set(

"gilsaOrders",

list

);

},

mine(){

const user=

Storage.get(

"gilsaCurrentUser"

);

if(!user)

return [];

return this.all().filter(

x=>x.user===user.username

);

}

};
Services.dashboard={

stats(){

const orders=

Services.orders.all();

return{

orders:orders.length

};

}

};
