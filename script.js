//  import { initializeApp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";
//   const firebaseConfig = {
//     apiKey: "AIzaSyD8W9QuEOso1EFr6gUO9vglP_uODBLCGIw",
//     authDomain: "student-registration-for-71c2e.firebaseapp.com",
//     projectId: "student-registration-for-71c2e",
//     storageBucket: "student-registration-for-71c2e.firebasestorage.app",
//     messagingSenderId: "950778596758",
//     appId: "1:950778596758:web:00275aa394d50b180fa1b7",
//     measurementId: "G-NRBP2Y0SCQ"
//   };
//   const app = initializeApp(firebaseConfig);




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