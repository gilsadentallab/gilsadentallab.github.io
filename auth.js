/*==================================================
                AUTH MODULE V3
==================================================*/

const Auth={

currentUser:null,

init(){

this.load();

this.bind();

this.refreshButton();

},

load(){

this.currentUser=Storage.get("gilsaCurrentUser");

},

bind(){

const loginForm=Utils.qs("#loginForm");

const registerForm=Utils.qs("#registerForm");

const logoutBtn=Utils.qs("#logoutBtn");

loginForm?.addEventListener(
"submit",
e=>this.login(e)
);

registerForm?.addEventListener(
"submit",
e=>this.register(e)
);

logoutBtn?.addEventListener(
"click",
()=>this.logout()
);

},

isLogin(){

return Storage.get("gilsaLogin")==="true";

},
        login(e){

e.preventDefault();

const username=
Utils.qs("#loginUsername")?.value;

const password=
Utils.qs("#loginPassword")?.value;

const user=
Storage.get("gilsaUser");

if(
user &&
user.username===username &&
user.password===password
){

Storage.set(
"gilsaLogin",
"true"
);

Storage.set(
"gilsaCurrentUser",
user
);

this.currentUser=user;

this.refreshButton();

Utils.alert("ورود موفقیت آمیز بود");

Utils.qs("#authModal")
?.classList.remove("active");

}
else{

Utils.alert(
"نام کاربری یا رمز عبور اشتباه است"
);

}

},
        register(e){

e.preventDefault();

const user={

type:
Utils.qs("#userType")?.value,

name:
Utils.qs("#registerName")?.value,

username:
Utils.qs("#registerUsername")?.value,

password:
Utils.qs("#registerPassword")?.value,

mobile:
Utils.qs("#registerMobile")?.value,

clinic:
Utils.qs("#clinicName")?.value || "",

address:
Utils.qs("#registerAddress")?.value || "",

location:
Utils.qs("#registerLocation")?.value || ""

};

Storage.set(
"gilsaUser",
user
);

Utils.alert(
"ثبت نام با موفقیت انجام شد"
);

e.target.reset();

},
        logout(){

Storage.remove("gilsaLogin");

Storage.remove("gilsaCurrentUser");

location.reload();

},

refreshButton(){

const btn=
Utils.qs(".auth-btn");

if(
!btn ||
!this.isLogin()
)
return;

btn.innerHTML=

`👤 ${this.currentUser?.name}`;

}

};
