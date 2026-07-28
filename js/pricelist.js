/*==================================================
                PRICELIST MODULE V3
==================================================*/

const PriceList = {

    data:null,

    init(){

        if(typeof data === "undefined") return;

        this.data = data;

        this.render();

        this.search();

        this.setupLinks();

    },
  render(){

const container =
Utils.qs("#priceContainer");

if(!container) return;

container.innerHTML="";

this.data.categories.forEach(category=>{

let html=`

<div class="price-card">

<div class="price-title">

${category.title}

</div>

<div class="price-content">

`;

category.items.forEach(item=>{

html+=`

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

html+=`

</div>

</div>

`;

container.innerHTML+=html;

});

}
  search(){

const input=
Utils.qs("#searchInput");

if(!input) return;

input.addEventListener("input",()=>{

const value=
input.value.toLowerCase();

document
.querySelectorAll(".price-card")
.forEach(card=>{

let found=false;

card
.querySelectorAll(".price-row")
.forEach(row=>{

if(

row.innerText
.toLowerCase()
.includes(value)

){

row.style.display="flex";

found=true;

}

else{

row.style.display="none";

}

});

card.style.display=

(found || value==="")

?

"block"

:

"none";

});

});

},
  setupLinks(){

Utils.qs("#updateDate").innerHTML=

this.data.update;

Utils.qs("#instagramBtn").href=

this.data.instagram;

Utils.qs("#websiteBtn").href=

this.data.website;

Utils.qs("#whatsappBtn").href=

this.data.whatsapp;

}

};
