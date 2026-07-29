/*==================================================
                GILSA UTILS V4
==================================================*/


const Utils = {


    qs(selector){

        return document.querySelector(selector);

    },



    qsa(selector){

        return document.querySelectorAll(selector);

    },



    create(tag){

        return document.createElement(tag);

    },



    formatDate(){


        return new Date()
        .toLocaleDateString("fa-IR");


    },



    generateId(){


        return Date.now();


    },



    alert(message){


        window.alert(message);


    },



    storage(key,value=null){


        if(value === null){


            try{

                return JSON.parse(
                    localStorage.getItem(key)
                );


            }
            catch{

                return localStorage.getItem(key);

            }


        }



        if(typeof value === "object"){


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


    }



};

export {

    Utils

};
