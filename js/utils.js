/*==================================================
                UTILS MODULE V3
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

        return new Date().toLocaleDateString("fa-IR");

    },

    generateId(){

        return Date.now();

    },

    alert(message){

        window.alert(message);

    }

};
