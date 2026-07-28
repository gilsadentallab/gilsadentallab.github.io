/*==================================================
                ORDER MODULE V4
==================================================*/


const Order = {


    orders: [],



    init(){


        this.load();

        this.bind();

        this.render();


        console.log(
            "Order V4 Started"
        );


    },





    load(){


        this.orders =
        Storage.get("gilsaOrders") || [];


    },





    bind(){


        const form =
        Utils.qs("#orderForm");



        form?.addEventListener(

            "submit",

            e=>this.submit(e)

        );


    },





    submit(e){


        e.preventDefault();



        if(!Auth.isLogin()){


            Utils.alert(
                "ابتدا وارد حساب کاربری شوید."
            );



            Utils.qs("#authModal")
            ?.classList.add("active");



            return;


        }





        const user =
        Storage.get(
            "gilsaCurrentUser"
        );



        const order = {


            id:
            Utils.generateId(),



            user:
            user.username,



            userName:
            user.name,



            patient:
            Utils.qs("#patientName")
            ?.value || "",



            service:
            Utils.qs("#orderService")
            ?.value || "",



            material:
            Utils.qs("#materialType")
            ?.value || "",



            shade:
            Utils.qs("#shade")
            ?.value || "",



            description:
            Utils.qs("#orderDescription")
            ?.value || "",



            file:
            Utils.qs("#orderFile")
            ?.files[0]
            ?.name || "بدون فایل",



            status:
            "در انتظار بررسی",



            date:
            Utils.formatDate()


        };





        this.orders.push(order);



        Storage.set(

            "gilsaOrders",

            this.orders

        );





        Utils.alert(

            "سفارش با موفقیت ثبت شد."

        );





        e.target.reset();



        this.render();



    },







    getUserOrders(){



        const user =

        Storage.get(
            "gilsaCurrentUser"
        );



        if(!user)

        return [];



        return this.orders.filter(

            order =>

            order.user === user.username

        );



    },









    render(){



        const box =

        Utils.qs(
            "#dashboardOrders"
        );



        if(!box)

        return;





        const list =

        this.getUserOrders();





        if(!list.length){



            box.innerHTML = `


            <div class="empty-orders">

                هنوز سفارشی وجود ندارد

            </div>


            `;


            return;


        }





        box.innerHTML =



        list.map(order=>`



        <div class="order-item">


            <h3>

            ${order.service}

            </h3>



            <p>

            بیمار:
            ${order.patient}

            </p>



            <p>

            وضعیت:
            ${order.status}

            </p>



            <p>

            تاریخ:
            ${order.date}

            </p>



        </div>



        `).join("");



    }





};





export {

    Order

};
},

render(){

    const container =
    Utils.qs("#dashboardOrders");

    if(!container) return;


    const orders = this.getUserOrders();


    if(!orders.length){

        container.innerHTML =
        `
        <div class="empty-orders">
        هنوز سفارشی وجود ندارد
        </div>
        `;

        return;

    }


    container.innerHTML =
    orders.map(order=>`

        <div class="order-item">

            <h3>
            ${order.patient}
            </h3>

            <p>
            خدمات:
            ${order.service}
            </p>

            <p>
            وضعیت:
            ${order.status}
            </p>

            <small>
            ${order.date}
            </small>

        </div>

    `).join("");

}


};

