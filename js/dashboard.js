/*==================================================
                DASHBOARD MODULE V3
==================================================*/
import { Storage } from "./storage.js";
import { Utils } from "./utils.js";
import { Auth } from "./auth.js";
const Dashboard = {

    init(){

        this.load();

    },

    load(){

        const dashboard = Utils.qs("#dashboard");

        if(!dashboard) return;

        if(!Auth.isLogin()){

            dashboard.innerHTML = `

            <div class="login-required">

                <h3>

                برای مشاهده پنل ابتدا وارد شوید

                </h3>

            </div>

            `;

            return;

        }

        this.render();

    },
  render(){

const user=
Storage.get("gilsaCurrentUser");

const dashboard=
Utils.qs("#dashboard");

dashboard.innerHTML=`

<div class="profile-card">

<div class="profile-header">

<div class="profile-avatar">

👤

</div>

<div>

<h2>${user.name}</h2>

<p>

${user.type==="dentist"

?

"دندانپزشک"

:

"لابراتوار"}

</p>

</div>

</div>

<div class="profile-info">

<p>

<b>نام کاربری:</b>

${user.username}

</p>

<p>

<b>موبایل:</b>

${user.mobile}

</p>

<p>

<b>آدرس:</b>

${user.address || "-"}

</p>

</div>

<button
id="logoutDashboard"
class="btn gold">

خروج

</button>

</div>

`;

this.bind();

},
  bind(){

const logout=

Utils.qs("#logoutDashboard");

logout?.addEventListener(

"click",

()=>{

Auth.logout();

}

);

}

};

export {

    Dashboard

};
