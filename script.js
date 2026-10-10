// //  import { initializeApp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";
// //   const firebaseConfig = {
// //     apiKey: "AIzaSyD8W9QuEOso1EFr6gUO9vglP_uODBLCGIw",
// //     authDomain: "student-registration-for-71c2e.firebaseapp.com",
// //     projectId: "student-registration-for-71c2e",
// //     storageBucket: "student-registration-for-71c2e.firebasestorage.app",
// //     messagingSenderId: "950778596758",
// //     appId: "1:950778596758:web:00275aa394d50b180fa1b7",
// //     measurementId: "G-NRBP2Y0SCQ"
// //   };
// //   const app = initializeApp(firebaseConfig);




// /* STEP 1: Firebase ke SDK se required functions import karo */

// // Firebase app initialize karne ke liye
// import {
//   initializeApp
// } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";

// // Firestore database aur data save karne ke functions
// import {
//   getFirestore,
//   collection,
//   addDoc,
//   serverTimestamp
// } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js";


// /* STEP 2: Firebase Console se mili configuration */

// // Is object ko apne Firebase Console wale config se match rakho
// const firebaseConfig = {
//   apiKey: "AIzaSyD8W9QuEOso1EFr6gUO9vglP_uODBLCGIw",
//   authDomain: "student-registration-for-71c2e.firebaseapp.com",
//   projectId: "student-registration-for-71c2e",
//   storageBucket: "student-registration-for-71c2e.firebasestorage.app",
//   messagingSenderId: "950778596758",
//   appId: "1:950778596758:web:00275aa394d50b180fa1b7",
//   measurementId: "G-NRBP2Y0SCQ"
// };


// /* STEP 3: Firebase app aur database connect karo */

// // Firebase app initialize hota hai
// const app = initializeApp(firebaseConfig);

// // Cloud Firestore database ka reference milta hai
// const db = getFirestore(app);


// /* STEP 4: Apne existing HTML form ko select karo */

// // HTML mein form ka id="studentForm" hona chahiye
// const studentForm = document.getElementById("studentForm");


// /* STEP 5: Form submit hone par data save karo */

// studentForm.addEventListener("submit", async (event) => {

//   // Page reload hone se rokta hai
//   event.preventDefault();

//   // HTML inputs se student ki details read karo
//   const name = document.getElementById("name").value.trim();
//   const roll = document.getElementById("roll").value.trim();
//   const studentId = document.getElementById("studentId").value.trim();
//   const email = document.getElementById("email").value.trim();
//   const dob = document.getElementById("dob").value;

//   // Empty fields ko submit hone se roko
//   if (!name || !roll || !studentId || !email || !dob) {
//     alert("Please fill in all fields.");
//     return;
//   }

//   try {

//     // Firestore mein students collection ke andar
//     // ek naya student document save karo
//     const result = await addDoc(collection(db, "students"), {
//       name: name,
//       roll: roll,
//       studentId: studentId,
//       email: email,
//       dob: dob,
//       createdAt: serverTimestamp()
//     });

//     // Success message dikhao
//     alert("Student registered successfully!");

//     // Saved document ki ID browser console mein dikhao
//     console.log("Saved student ID:", result.id);

//     // Form ko clear karo
//     studentForm.reset();

//   } catch (error) {

//     // Agar data save nahi hua, toh actual error dekho
//     console.error("Firebase error:", error);

//     alert("Registration failed. Check the browser console.");

//   }

// });


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {
    getDatabase,
    ref,
    push,
    set,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

// 👇 Firebase page ke copy icon se poora firebaseConfig copy karke yahan paste karo
const firebaseConfig = {
  apiKey: "AIzaSyD8W9QuEOso1EFr6gUO9vglP_uODBLCGIw",
  authDomain: "student-registration-for-71c2e.firebaseapp.com",
  databaseURL: "https://student-registration-for-71c2e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "student-registration-for-71c2e",
  storageBucket: "student-registration-for-71c2e.firebasestorage.app",
  messagingSenderId: "950778596758",
  appId: "1:950778596758:web:00275aa394d50b180fa1b7",
  measurementId: "G-NRBP2Y0SCQ"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const form = document.getElementById("studentForm");
const btn = form.querySelector("button");
const done = document.getElementById("Done");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    btn.disabled = true;
    btn.textContent = "Submitting...";
    done.textContent = "";
    done.className = "";

    try {
        // students -> (auto unique id) -> data
        const newStudentRef = push(ref(db, "students"));

        await set(newStudentRef, {
            name: document.getElementById("name").value.trim(),
            roll: document.getElementById("roll").value.trim(),
            studentId: document.getElementById("studentId").value.trim(),
            email: document.getElementById("email").value.trim(),
            dob: document.getElementById("dob").value,
            submittedAt: serverTimestamp()
        });

        done.textContent = "✅ Details successfully submit ho gaye!";
        done.className = "success";
        form.reset();
    } catch (error) {
        console.error("Firebase error:", error);
        done.textContent = "❌ Submit nahi ho paya. Dobara try karo.";
        done.className = "error";
    } finally {
        btn.disabled = false;
        btn.textContent = "Submit Details";
    }
});