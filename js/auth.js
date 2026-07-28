// auth.js V4
// Firebase Authentication + Firestore

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


// تبدیل username به ایمیل داخلی Firebase

function createFirebaseEmail(username){

    return username.trim().toLowerCase()
    + "@gilsa.local";

}


// گرفتن اطلاعات فرم ثبت نام

function getRegisterData(){

    return {

       role:
document.querySelector("#userType")?.value,

        name:
        document.querySelector("#registerName")?.value,


        username:
        document.querySelector("#registerUsername")?.value,


        password:
        document.querySelector("#registerPassword")?.value,


        mobile:
        document.querySelector("#registerMobile")?.value,


        clinicName:
        document.querySelector("#clinicName")?.value || "",


      clinicAddress:
document.querySelector("#registerAddress")?.value || "",


        location:
        document.querySelector("#registerLocation")?.value || ""

    };

}
// ===============================
// Register User
// ===============================

export async function registerUser(){


    const data = getRegisterData();


    if(
        !data.username ||
        !data.password ||
        !data.role
    ){

        alert("لطفاً اطلاعات ضروری را کامل کنید");
        return;

    }



    try{


        const email = createFirebaseEmail(
            data.username
        );



        // ساخت حساب Firebase

        const userCredential =
        await createUserWithEmailAndPassword(
            auth,
            email,
            data.password
        );



        const user =
        userCredential.user;



        // ذخیره اطلاعات در Firestore

        await setDoc(
            doc(
                db,
                "users",
                user.uid
            ),
            {

                uid:user.uid,

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


        console.log(
            "New User:",
            user.uid
        );



    }
    catch(error){


        console.error(error);



        if(
            error.code === 
            "auth/email-already-in-use"
        ){

            alert(
            "این نام کاربری قبلاً ثبت شده است"
            );

        }


        else if(
            error.code ===
            "auth/weak-password"
        ){

            alert(
            "رمز عبور باید حداقل ۶ کاراکتر باشد"
            );

        }


        else{

            alert(
            "خطا در ثبت نام"
            );

        }

    }


}
// ===============================
// Login User
// ===============================

export async function loginUser(){


    const username =
    document.querySelector("#loginUsername")?.value;


    const password =
    document.querySelector("#loginPassword")?.value;



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



        // ورود به Firebase

        const userCredential =
        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );



        const user =
        userCredential.user;



        // گرفتن اطلاعات پروفایل

        const userDoc =
        await getDoc(
            doc(
                db,
                "users",
                user.uid
            )
        );



        if(
            userDoc.exists()
        ){


            const userData =
            userDoc.data();



            // ذخیره موقت اطلاعات کاربر

            sessionStorage.setItem(
                "gilsaUser",
                JSON.stringify(userData)
            );



            alert(
                "ورود موفق بود"
            );



            console.log(
                "Logged User:",
                userData
            );



            // انتقال بر اساس نقش

            if(
                userData.role === "dentist"
            ){

                window.location.href =
                "dentist-dashboard.html";

            }


            else if(
                userData.role === "laboratory"
            ){

                window.location.href =
                "lab-dashboard.html";

            }


            else{

                window.location.href =
                "dashboard.html";

            }



        }

        else{


            alert(
                "اطلاعات پروفایل پیدا نشد"
            );


        }



    }
    catch(error){


        console.error(error);



        if(
            error.code ===
            "auth/invalid-credential"
        ){

            alert(
            "نام کاربری یا رمز عبور اشتباه است"
            );

        }


        else{

            alert(
            "خطا در ورود"
            );

        }

    }


}
// ===============================
// Logout User
// ===============================

export async function logoutUser(){


    try{


        await signOut(auth);



        sessionStorage.removeItem(
            "gilsaUser"
        );



        alert(
            "از حساب خارج شدید"
        );



        window.location.href =
        "index.html";


    }
    catch(error){

        console.error(error);

        alert(
            "خطا در خروج از حساب"
        );

    }

}





// ===============================
// Current User Listener
// ===============================

export function checkAuthState(){


    onAuthStateChanged(
        auth,
        async (user)=>{


            if(user){


                console.log(
                    "Firebase User:",
                    user.uid
                );



                const userDoc =
                await getDoc(
                    doc(
                        db,
                        "users",
                        user.uid
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



                }


            }

            else{


                console.log(
                    "No User Logged In"
                );


            }


        }

    );

}




// ===============================
// Get Current User Data
// ===============================

export function getCurrentUser(){


    const user =
    sessionStorage.getItem(
        "gilsaUser"
    );



    if(user){


        return JSON.parse(user);


    }


    return null;


}
