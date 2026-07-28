const data = {

    update: "1405/05/06",

    instagram: "https://instagram.com/gilsadentallab",

    website: "https://gilsadentallab.github.io",

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

document.getElementById("updateDate").textContent = data.update;

document.getElementById("instagramBtn").href = data.instagram;

document.getElementById("websiteBtn").href = data.website;

const container = document.getElementById("priceContainer");

data.categories.forEach(category=>{

    const card=document.createElement("div");

    card.className="price-card";

    let html=`<div class="price-title">${category.title}</div>`;

    category.items.forEach(item=>{

        html+=`
        <div class="price-row">
            <div class="service">${item.service}</div>
            <div class="price">${item.price}</div>
        </div>
        `;

    });

    card.innerHTML=html;

    container.appendChild(card);

});
