/* ==========================================
   Gilsa Dental Laboratory
   Price List JS V4
========================================== */


const data = {

    update: "1405/05/06",

    instagram: "https://instagram.com/gilsadentallab",

    website: "https://gilsadentallab.github.io",

    whatsapp: "https://wa.me/989140503522",


    categories: [

        {
            title:"روکش و بریج (Fixed Prosthesis)",

            items:[

                {
                    service:"PFM Crown",
                    price:"درج قیمت"
                },

                {
                    service:"Zirconia Crown",
                    price:"درج قیمت"
                },

                {
                    service:"Monolithic Crown",
                    price:"درج قیمت"
                },

                {
                    service:"Monolithic Zirconia (Implant)",
                    price:"درج قیمت"
                },

                {
                    service:"Multilayer Zirconia",
                    price:"درج قیمت"
                },

                {
                    service:"Multilayer Zirconia (Implant)",
                    price:"درج قیمت"
                },

                {
                    service:"Temporary Crown (PMMA)",
                    price:"درج قیمت"
                }

            ]

        },


        {
            title:"ایمپلنت (Implant)",

            items:[

                {
                    service:"Screw Retained Crown",
                    price:"درج قیمت"
                },

                {
                    service:"Implant Restoration",
                    price:"درج قیمت"
                },

                {
                    service:"Post Implant",
                    price:"درج قیمت"
                }

            ]

        },


        {
            title:"زیبایی (Esthetic Dentistry)",

            items:[

                {
                    service:"Laminate Veneer",
                    price:"درج قیمت"
                },

                {
                    service:"Diagnostic Wax-Up",
                    price:"درج قیمت"
                },

                {
                    service:"Digital Mock-Up",
                    price:"درج قیمت"
                }

            ]

        },
       
        {
            title:"پروتز متحرک (Removable Prosthesis)",

            items:[

                {
                    service:"Complete Denture",
                    price:"درج قیمت"
                },

                {
                    service:"Over Denture",
                    price:"درج قیمت"
                },

                {
                    service:"Special Tray",
                    price:"درج قیمت"
                },

                {
                    service:"Try-In Resin",
                    price:"درج قیمت"
                }

            ]

        },


        {
            title:"خدمات جانبی (Other Services)",

            items:[

                {
                    service:"Bleaching Tray",
                    price:"درج قیمت"
                },

                {
                    service:"Night Guard",
                    price:"درج قیمت"
                },

                {
                    service:"Dental Cast / Model",
                    price:"درج قیمت"
                }

            ]

        },


        {
            title:"سایر خدمات",

            items:[

                {
                    service:"طراحی اختصاصی",
                    price:"تماس بگیرید"
                },

                {
                    service:"کیس‌های خاص",
                    price:"تماس بگیرید"
                },

                {
                    service:"خدمات دیجیتال",
                    price:"تماس بگیرید"
                },

                {
                    service:"سایر خدمات لابراتواری",
                    price:"تماس بگیرید"
                }

            ]

        },


        {
            title:"خدمات VIP (۴۰٪ افزایش)",

            items:[

                {
                    service:"روکش VIP زیرکونیا",
                    price:"۴۰٪ بیشتر"
                },

                {
                    service:"ایمپلنت VIP",
                    price:"۴۰٪ بیشتر"
                },

                {
                    service:"لمینت VIP",
                    price:"۴۰٪ بیشتر"
                },

                {
                    service:"خدمات دیجیتال VIP",
                    price:"۴۰٪ بیشتر"
                },

                {
                    service:"کیس فوری VIP",
                    price:"۴۰٪ بیشتر"
                }

            ]

        }


    ]

};


/* =========================
   Elements
========================= */


const updateDate =
document.getElementById("updateDate");


const container =
document.getElementById("priceContainer");


const searchInput =
document.getElementById("searchInput");


const instagramBtn =
document.getElementById("instagramBtn");


const websiteBtn =
document.getElementById("websiteBtn");


const downloadBtn =
document.getElementById("downloadBtn");


const whatsappBtn =
document.getElementById("whatsappBtn");




/* =========================
   Setup Page
========================= */


function setupPage(){


    if(updateDate){

        updateDate.textContent =
        data.update;

    }



    if(instagramBtn){

        instagramBtn.href =
        data.instagram;

    }



    if(websiteBtn){

        websiteBtn.href =
        data.website;

    }



    if(whatsappBtn){

        whatsappBtn.href =
        data.whatsapp;

    }



    renderPrices();


}




/* =========================
   Create Price List
========================= */


function renderPrices(){


    if(!container) return;



    container.innerHTML = "";



    data.categories.forEach(category=>{


        const card =
        document.createElement("div");



        card.className =
        "price-card";



        let html = `


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

        `;



        card.innerHTML = html;



        container.appendChild(card);



    });



    activateAccordion();


}




/* =========================
   Accordion
========================= */


function activateAccordion(){


    const titles =
    document.querySelectorAll(".price-title");



    titles.forEach(title=>{


        title.addEventListener("click",()=>{


            title.parentElement
            .classList
            .toggle("open");


        });


    });


}

/* =========================
   Search System
========================= */


function activateSearch(){


    if(!searchInput) return;



    searchInput.addEventListener("input",()=>{


        const value =
        searchInput.value
        .toLowerCase()
        .trim();



        const cards =
        document.querySelectorAll(".price-card");



        cards.forEach(card=>{


            let found = false;



            const rows =
            card.querySelectorAll(".price-row");



            rows.forEach(row=>{


                const text =
                row.innerText
                .toLowerCase();



                if(text.includes(value)){


                    row.style.display =
                    "flex";


                    found = true;


                }

                else{


                    row.style.display =
                    "none";


                }



            });



            if(found || value === ""){


                card.style.display =
                "block";


            }

            else{


                card.style.display =
                "none";


            }



        });



    });



}



/* =========================
   PDF Download
========================= */


function downloadPDF(){



    if(!window.jspdf){


        alert("PDF آماده نیست");


        return;


    }



    const { jsPDF } =
    window.jspdf;



    const pdf =
    new jsPDF();



    pdf.setFontSize(18);


    pdf.text(
        "Gilsa Dental Laboratory",
        20,
        20
    );



    pdf.setFontSize(12);


    pdf.text(
        "Price List",
        20,
        32
    );



    pdf.text(
        "Updated: " + data.update,
        20,
        42
    );



    let y = 55;



    data.categories.forEach(category=>{


        if(y > 270){


            pdf.addPage();


            y = 20;


        }



        pdf.setFontSize(14);



        pdf.text(
            category.title,
            20,
            y
        );



        y += 10;



        category.items.forEach(item=>{



            if(y > 280){


                pdf.addPage();


                y = 20;


            }



            pdf.setFontSize(11);



            pdf.text(

                item.service +
                " : " +
                item.price,

                25,

                y

            );



            y += 8;



        });



        y += 10;



    });



    pdf.save(
        "Gilsa-Price-List.pdf"
    );


}




/* =========================
   PDF Button
========================= */


if(downloadBtn){


    downloadBtn.addEventListener(
        "click",
        function(e){


            e.preventDefault();


            downloadPDF();


        }
    );


}

/* =========================
   Security Links
========================= */


function secureLinks(){


    const links =
    document.querySelectorAll(
        "a[target='_blank']"
    );



    links.forEach(link=>{


        link.rel =
        "noopener noreferrer";


    });


}




/* =========================
   Start App
========================= */


function startApp(){


    setupPage();


    activateSearch();


    secureLinks();



    console.log(
        "%cGilsa Dental Laboratory",
        "color:#d4af37;font-size:18px;font-weight:bold;"
    );


    console.log(
        "Price List V4 Loaded Successfully"
    );


}




/* =========================
   Run
========================= */


document.addEventListener(
    "DOMContentLoaded",
    startApp
);
