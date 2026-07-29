/*==================================================
                GILSA AUTH V4
        Firebase Authentication + Firestore
==================================================*/


import { auth, db } from "./firebase.js";


import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
}
from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


import {
    doc,
    setDoc,
    getDoc
}
from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";





function createFirebaseEmail(username){

    return username
    .trim()
    .toLowerCase()
    +
    "@gilsa.local";

}






function getRegisterData(){


    return {


        role:
        document.querySelector("#userType")?.value || "",


        name:
        document.querySelector("#registerName")?.value || "",


        username:
        document.querySelector("#registerUsername")?.value || "",


        password:
        document.querySelector("#registerPassword")?.value || "",


        mobile:
        document.querySelector("#registerMobile")?.value || "",


        clinicName:
        document.querySelector("#clinicName")?.value || "",


        clinicAddress:
        document.querySelector("#registerAddress")?.value || "",


        location:
        document.querySelector("#registerLocation")?.value || ""


    };


}








async function registerUser(){



    const data =
    getRegisterData();




    if(
        !data.username ||
        !data.password ||
        !data.role
    ){

        alert(
            "اطلاعات ضروری را کامل کنید"
        );

        return;

    }




    try{


        const email =
        createFirebaseEmail(
            data.username
        );



        const result =
        await createUserWithEmailAndPassword(

            auth,

            email,

            data.password

        );



        const uid =
        result.user.uid;




        await setDoc(

            doc(
                db,
                "users",
                uid
            ),

            {


                uid:uid,


                role:data.role,


                name:data.name,


                username:data.username,


                mobile:data.mobile,


                clinicName:data.clinicName,


                clinicAddress:data.clinicAddress,


                location:data.location,


                createdAt:
                new Date()


            }


        );



        alert(
            "ثبت نام با موفقیت انجام شد"
        );



        return true;



    }
    catch(error){



        console.error(error);



        if(
            error.code ===
            "auth/email-already-in-use"
        ){

            alert(
                "این نام کاربری قبلا ثبت شده است"
            );

        }


        else if(
            error.code ===
            "auth/weak-password"
        ){

            alert(
                "رمز عبور حداقل ۶ کاراکتر باشد"
            );

        }


        else{


            alert(
                "خطا در ثبت نام"
            );


        }


    }


}










async function loginUser(){



    const username =
    document.querySelector("#loginUsername")
    ?.value;



    const password =
    document.querySelector("#loginPassword")
    ?.value;





    if(
        !username ||
        !password
    ){

        alert(
            "نام کاربری و رمز عبور را وارد کنید"
        );

        return;

    }






    try{


        const email =
        createFirebaseEmail(username);




        const result =
        await signInWithEmailAndPassword(

            auth,

            email,

            password

        );




        const uid =
        result.user.uid;




        const userDoc =
        await getDoc(

            doc(

                db,

                "users",

                uid

            )

        );





        if(
            userDoc.exists()
        ){



            const userData =
            userDoc.data();




            sessionStorage.setItem(

                "gilsaUser",

                JSON.stringify(userData)

            );




            alert(
                "ورود موفق بود"
            );




            if(
                userData.role === "dentist"
            ){

                location.href =
                "dentist-dashboard.html";

            }


            else if(
                userData.role === "lab"
            ){

                location.href =
                "lab-dashboard.html";

            }


            else{

                location.href =
                "dashboard.html";

            }




            return userData;



        }
        else{


            alert(
                "پروفایل کاربر پیدا نشد"
            );


        }



    }
    catch(error){


        console.error(error);


        alert(
            "نام کاربری یا رمز عبور اشتباه است"
        );


    }



}









async function logoutUser(){



    await signOut(auth);



    sessionStorage.removeItem(
        "gilsaUser"
    );



    location.href =
    "index.html";


}









function checkAuthState(){



    onAuthStateChanged(

        auth,

        async(user)=>{


            if(user){


                const snap =
                await getDoc(

                    doc(

                        db,

                        "users",

                        user.uid

                    )

                );



                if(
                    snap.exists()
                ){


                    sessionStorage.setItem(

                        "gilsaUser",

                        JSON.stringify(
                            snap.data()
                        )

                    );


                }


            }


        }

    );


}









function getCurrentUser(){



    const user =
    sessionStorage.getItem(
        "gilsaUser"
    );



    return user
    ?
    JSON.parse(user)
    :
    null;


}









export const Auth = {


    init(){


        console.log(
            "Auth V4 Started"
        );
console.log(
    "Register Form:",
    document.querySelector("#registerForm")
);

console.log(
    "Firebase Auth:",
    auth
);

        checkAuthState();




        document
        .querySelector("#loginForm")
        ?.addEventListener(

            "submit",

            e=>{

                e.preventDefault();

                this.login();

            }

        );





        document
        .querySelector("#registerForm")
        ?.addEventListener(

            "submit",

            e=>{

                e.preventDefault();

                this.register();

            }

        );




        document
        .querySelector("#logoutBtn")
        ?.addEventListener(

            "click",

            ()=>this.logout()

        );



    },





    login(){

        return loginUser();

    },





    register(){

        return registerUser();

    },





    logout(){

        return logoutUser();

    },





    isLogin(){


        return !!sessionStorage.getItem(
            "gilsaUser"
        );


    },





    current(){


        return getCurrentUser();


    }


};
