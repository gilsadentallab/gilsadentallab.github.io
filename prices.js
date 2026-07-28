const data = {

    update: "1405/05/06",

    instagram: "https://instagram.com/gilsadentallab",

    website: "https://gilsadentallab.github.io",
whatsapp:"https://wa.me/989140503522",
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
document.getElementById("whatsappBtn").href=data.whatsapp;
document.getElementById("updateDate").textContent = data.update;

document.getElementById("instagramBtn").href = data.instagram;

document.getElementById("websiteBtn").href = data.website;

const container = document.getElementById("priceContainer");

data.categories.forEach(category=>{

    const card=document.createElement("div");

    card.className="price-card";

   let html=`
<div class="price-title">

${category.title}

</div>

<div class="price-content">
`;

    category.items.forEach(item=>{

        html+=`
        <div class="price-row">
            <div class="service">${item.service}</div>
            <div class="price">${item.price}</div>
        </div>
        `;

    });
html+="</div>";
    card.innerHTML=html;

    container.appendChild(card);

});
document.querySelectorAll(".price-title").forEach(title=>{

title.addEventListener("click",()=>{

title.parentElement.classList.toggle("open");

});

});

const search=document.getElementById("searchInput");

search.addEventListener("keyup",()=>{

const value=search.value.toLowerCase();

document.querySelectorAll(".price-row").forEach(row=>{

const text=row.innerText.toLowerCase();

row.style.display=text.includes(value)?"flex":"none";

});

});
document.getElementById("downloadBtn").addEventListener("click", function (e) {

    e.preventDefault();

    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF();

    pdf.setFontSize(22);
    pdf.text("Gilsa Dental Laboratory", 20, 20);

    pdf.setFontSize(12);
    pdf.text("Price List", 20, 35);

    let y = 50;

    data.categories.forEach(category => {

        pdf.setFontSize(16);
        pdf.text(category.title, 20, y);

        y += 8;

        category.items.forEach(item => {

            pdf.setFontSize(11);

            pdf.text(
                `${item.service} : ${item.price}`,
                25,
                y
            );

            y += 7;

            if (y > 270) {

                pdf.addPage();

                y = 20;

            }

        });

        y += 8;

    });

    pdf.save("Gilsa-Price-List.pdf");

});
