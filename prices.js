/* ==========================================
   Gilsa Dental Laboratory
   Price List V2
========================================== */

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

/* ==========================================
   Elements
========================================== */

const container = document.getElementById("priceContainer");

const searchInput = document.getElementById("searchInput");

const updateDate = document.getElementById("updateDate");

const instagramBtn = document.getElementById("instagramBtn");

const websiteBtn = document.getElementById("websiteBtn");

const whatsappBtn = document.getElementById("whatsappBtn");

const downloadBtn = document.getElementById("downloadBtn");

const backToTop = document.getElementById("backToTop");

const loader = document.querySelector(".page-loader");
/* ==========================================
   Initialize
========================================== */

function initialize() {

    updateDate.textContent = data.update;

    instagramBtn.href = data.instagram;

    websiteBtn.href = data.website;

    whatsappBtn.href = data.whatsapp;

    instagramBtn.target = "_blank";
    websiteBtn.target = "_blank";
    whatsappBtn.target = "_blank";

    renderCards();

}

/* ==========================================
   Render Cards
========================================== */

function renderCards() {

    container.innerHTML = "";

    data.categories.forEach(category => {

        const card = document.createElement("div");

        card.className = "price-card fade-up";

        let html = `

            <div class="price-title">

                ${category.title}

            </div>

            <div class="price-content">

        `;

        category.items.forEach(item => {

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

        html += `</div>`;

        card.innerHTML = html;

        container.appendChild(card);

    });

    enableAccordion();

}
/* ==========================================
   Accordion
========================================== */

function enableAccordion() {

    const titles = document.querySelectorAll(".price-title");

    titles.forEach(title => {

        title.addEventListener("click", () => {

            const card = title.parentElement;

            card.classList.toggle("open");

        });

    });

}

/* ==========================================
   Search
========================================== */

function enableSearch() {

    searchInput.addEventListener("input", () => {

        const value = searchInput.value.trim().toLowerCase();

        document.querySelectorAll(".price-card").forEach(card => {

            let found = false;

            card.querySelectorAll(".price-row").forEach(row => {

                const text = row.innerText.toLowerCase();

                const visible = text.includes(value);

                row.style.display = visible ? "flex" : "none";

                if (visible) {

                    found = true;

                }

            });

            card.style.display = found ? "block" : "none";

        });

    });

}

/* ==========================================
   Scroll Animation
========================================== */

function enableScrollAnimation() {

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    }, {

        threshold: 0.15

    });

    document.querySelectorAll(".fade-up").forEach(item => {

        observer.observe(item);

    });

}
/* ==========================================
   Loader
========================================== */

window.addEventListener("load", () => {

    setTimeout(() => {

        loader.classList.add("hide");

    }, 600);

});


/* ==========================================
   Back To Top
========================================== */

window.addEventListener("scroll", () => {

    if (window.scrollY > 350) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});

backToTop.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


/* ==========================================
   Auto Open First Category
========================================== */

function openFirstCategory() {

    const first = document.querySelector(".price-card");

    if (first) {

        first.classList.add("open");

    }

}


/* ==========================================
   Keyboard Shortcut
========================================== */

document.addEventListener("keydown", (e) => {

    if (e.key === "/") {

        e.preventDefault();

        searchInput.focus();

    }

});
/* ==========================================
   Download PDF
========================================== */

function downloadPDF() {

    if (!window.jspdf) {

        alert("کتابخانه PDF بارگذاری نشده است.");

        return;

    }

    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF({

        orientation: "portrait",

        unit: "mm",

        format: "a4"

    });

    pdf.setFontSize(20);

    pdf.text("Gilsa Dental Laboratory", 20, 20);

    pdf.setFontSize(12);

    pdf.text("Price List", 20, 30);

    pdf.setFontSize(10);

    pdf.text(`Updated : ${data.update}`, 20, 38);

    let y = 50;

    data.categories.forEach(category => {

        if (y > 260) {

            pdf.addPage();

            y = 20;

        }

        pdf.setFontSize(15);

        pdf.text(category.title, 20, y);

        y += 8;

        category.items.forEach(item => {

            if (y > 280) {

                pdf.addPage();

                y = 20;

            }

            pdf.setFontSize(11);

            pdf.text(`${item.service}`, 25, y);

            pdf.text(`${item.price}`, 120, y);

            y += 7;

        });

        y += 8;

    });

    pdf.save("Gilsa-Price-List.pdf");

}

/* ==========================================
   Events
========================================== */

downloadBtn.addEventListener("click", function(e){

    e.preventDefault();

    downloadPDF();

});

/* ==========================================
   Utilities
========================================== */

function closeAllCards(){

    document.querySelectorAll(".price-card").forEach(card=>{

        card.classList.remove("open");

    });

}

function openAllCards(){

    document.querySelectorAll(".price-card").forEach(card=>{

        card.classList.add("open");

    });

}
/* ==========================================
   Helpers
========================================== */

function setLink(id, url) {

    const element = document.getElementById(id);

    if (!element || !url) return;

    element.href = url;

    element.target = "_blank";

    element.rel = "noopener noreferrer";

}

function debounce(callback, delay = 250) {

    let timer;

    return (...args) => {

        clearTimeout(timer);

        timer = setTimeout(() => {

            callback(...args);

        }, delay);

    };

}

/* ==========================================
   Search Optimization
========================================== */

if (searchInput) {

    const handler = debounce(() => {

        searchInput.dispatchEvent(new Event("input"));

    });

    searchInput.addEventListener("keyup", handler);

}

/* ==========================================
   External Links
========================================== */

setLink("instagramBtn", data.instagram);

setLink("websiteBtn", data.website);

setLink("whatsappBtn", data.whatsapp);

/* ==========================================
   Error Handler
========================================== */

window.addEventListener("error", function (event) {

    console.error("Gilsa Error:", event.message);

});

/* ==========================================
   Version
========================================== */

console.log("%cGilsa Dental Laboratory", "color:#d4af37;font-size:18px;font-weight:bold;");

console.log("Price List V2 Loaded Successfully");

/* ==========================================
   End
========================================== */
