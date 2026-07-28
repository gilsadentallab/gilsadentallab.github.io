/*==================================================
                PRICELIST MODULE V4
==================================================*/


const PriceList = {


    data:null,


    init(){


        if(typeof data === "undefined"){

            console.log(
                "Price data not found"
            );

            return;

        }


        this.data = data;


        this.render();


        this.search();


        this.setupLinks();



        console.log(
            "PriceList V4 Started"
        );


    },





    render(){


        const container =
        Utils.qs("#priceContainer");



        if(!container) return;



        container.innerHTML = "";



        this.data.categories.forEach(category=>{


            let html = `


            <div class="price-card">


                <div class="price-title">

                    ${category.title}

                </div>



                <div class="price-content">

            `;



            category.items.forEach(item=>{


                html += `


                <div class="price-row">


                    <div class="service">

                        ${item.service}

                    </div>



                    <div class="price">

                        ${item.price}

                    </div>


                </div>


                `;


            });



            html += `


                </div>


            </div>


            `;



            container.innerHTML += html;



        });



    },







    search(){



        const input =
        Utils.qs("#searchInput");



        if(!input) return;



        input.addEventListener(
            "input",
            ()=>{


                const value =
                input.value
                .toLowerCase()
                .trim();



                document
                .querySelectorAll(".price-card")
                .forEach(card=>{


                    let found=false;



                    card
                    .querySelectorAll(".price-row")
                    .forEach(row=>{



                        const text =
                        row.innerText
                        .toLowerCase();




                        if(
                            text.includes(value)
                        ){


                            row.style.display =
                            "flex";


                            found=true;


                        }

                        else{


                            row.style.display =
                            "none";


                        }


                    });




                    card.style.display =

                    (
                        found ||
                        value === ""
                    )

                    ?

                    "block"

                    :

                    "none";



                });



            }
        );



    },








    setupLinks(){



        const update =
        Utils.qs("#updateDate");



        if(update){

            update.innerHTML =
            this.data.update;

        }





        const instagram =
        Utils.qs("#instagramBtn");

        if(instagram){

            instagram.href =
            this.data.instagram;

        }






        const website =
        Utils.qs("#websiteBtn");

        if(website){

            website.href =
            this.data.website;

        }






        const whatsapp =
        Utils.qs("#whatsappBtn");

        if(whatsapp){

            whatsapp.href =
            this.data.whatsapp;

        }



    }



};





export {

    PriceList

};
