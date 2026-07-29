/*==================================================
                GILSA STORAGE V4
==================================================*/


const Storage = {


    get(key){


        try{


            const data =
            localStorage.getItem(key);


            if(!data) return null;


            return JSON.parse(data);


        }
        catch{


            return localStorage.getItem(key);


        }


    },





    set(key,value){



        if(
            typeof value === "object"
        ){


            localStorage.setItem(

                key,

                JSON.stringify(value)

            );


        }

        else{


            localStorage.setItem(

                key,

                value

            );


        }


    },





    remove(key){


        localStorage.removeItem(key);


    },





    clear(){


        localStorage.clear();


    }



};


export {

    Storage

};
