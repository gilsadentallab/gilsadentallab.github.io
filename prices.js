/* ==========================================
   Gilsa Dental Laboratory
   Price List JS V3
========================================== */


/* =========================
   Data
========================= */

const data = {

    update: "1405/05/06",

    instagram: "https://instagram.com/gilsadentallab",

    website: "https://gilsadentallab.github.io",

    whatsapp: "https://wa.me/989140503522",


    categories: [

        {
            title: "روکش‌های زیرکونیا",

            items: [

                {
                    service: "Full Zirconia",
                    price: "درج قیمت"
                },

                {
                    service: "Layered Zirconia",
                    price: "درج قیمت"
                }

            ]

        },


        {
            title: "ایمپلنت",

            items: [

                {
                    service: "Implant Crown",
                    price: "درج قیمت"
                },

                {
                    service: "Custom Abutment",
                    price: "درج قیمت"
                }

            ]

        },


        {
            title: "E.max",

            items: [

                {
                    service: "E.max Crown",
                    price: "درج قیمت"
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


const backToTop =
document.getElementById("backToTop");


const loader =
document.getElementById("loader");
/* =========================
   Initial Setup
========================= */

function setupPage(){

    // Update Date

    if(updateDate){

        updateDate.textContent = data.update;

    }


    // Social Links

    if(instagramBtn){

        instagramBtn.href = data.instagram;

    }


    if(websiteBtn){

        websiteBtn.href = data.website;

    }


    if(whatsappBtn){

        whatsappBtn.href = data.whatsapp;

    }


    // Contact links

    const contactInstagram =
    document.getElementById("contactInstagram");


    const contactWebsite =
    document.getElementById("contactWebsite");


    const contactWhatsapp =
    document.getElementById("contactWhatsapp");



    if(contactInstagram){

        contactInstagram.href = data.instagram;

    }


    if(contactWebsite){

        contactWebsite.href = data.website;

    }


    if(contactWhatsapp){

        contactWhatsapp.href = data.whatsapp;

    }


    renderPrices();

}



/* =========================
   Render Price Cards
========================= */


function renderPrices(){


    if(!container) return;


    container.innerHTML = "";


    data.categories.forEach(category => {



        const card =
        document.createElement("div");


        card.className =
        "price-card fade-up";



        let content = `


        <div class="price-title">

            ${category.title}

        </div>


        <div class="price-content">


        `;



        category.items.forEach(item => {



            content += `


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



        content += `

        </div>

        `;



        card.innerHTML = content;


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



    titles.forEach(title => {



        title.addEventListener("click",()=>{



            const card =
            title.parentElement;



            card.classList.toggle("open");



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
        .trim()
        .toLowerCase();



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


                    row.style.display="flex";


                    found=true;


                }

                else{


                    row.style.display="none";


                }



            });



            if(found || value===""){


                card.style.display="block";


            }

            else{


                card.style.display="none";


            }



        });



    });



}



/* =========================
   Scroll Animation
========================= */


function activateAnimation(){



    const elements =
    document.querySelectorAll(".fade-up");



    const observer =
    new IntersectionObserver((entries)=>{



        entries.forEach(entry=>{


            if(entry.isIntersecting){


                entry.target.classList.add("show");


            }



        });



    },{
        threshold:.15
    });



    elements.forEach(el=>{


        observer.observe(el);


    });



}



/* =========================
   Loader
========================= */


window.addEventListener("load",()=>{



    if(loader){



        setTimeout(()=>{


            loader.classList.add("hide");


        },500);



    }



});



/* =========================
   Back To Top
========================= */


function activateBackToTop(){



    if(!backToTop) return;



    window.addEventListener("scroll",()=>{



        if(window.scrollY > 350){


            backToTop.classList.add("show");


        }

        else{


            backToTop.classList.remove("show");


        }



    });



    backToTop.addEventListener("click",()=>{



        window.scrollTo({

            top:0,

            behavior:"smooth"

        });



    });



}
/* =========================
   PDF Download
========================= */


function downloadPDF(){


    if(!window.jspdf){


        alert("PDF system is not ready");


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



        pdf.setFontSize(15);



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
                item.service + " : " + item.price,
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
   PDF Button Event
========================= */


if(downloadBtn){


    downloadBtn.addEventListener(
        "click",
        (e)=>{


            e.preventDefault();


            downloadPDF();



        }
    );


}



/* =========================
   External Link Settings
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
   Start Application
========================= */


function startApp(){


    setupPage();


    activateSearch();


    activateAnimation();


    activateBackToTop();


    secureLinks();



    console.log(
        "%cGilsa Dental Laboratory",
        "color:#d4af37;font-size:18px;font-weight:bold;"
    );


    console.log(
        "Price List Loaded Successfully"
    );


}



/* =========================
   Run
========================= */


document.addEventListener(
    "DOMContentLoaded",
    startApp
);
