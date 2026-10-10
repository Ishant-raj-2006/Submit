// =====================================================
// STEP 1: Firebase ke tools mangwana (import)
// =====================================================

// Firebase ka main connection wala tool (ye aapke code me pehle se tha)
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";

// Realtime Database ke tools (ye NAYA add hua hai)
// getDatabase = database se connect karne ke liye
// ref         = batata hai data kis folder me jayega
// push        = har entry ke liye unique ID banata hai
// set         = us ID par data save karta hai
// NOTE: version (13.0.0) upar wali line jaisa hi hona chahiye
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-database.js";


// =====================================================
// STEP 2: Firebase ki settings (config)
// =====================================================
// Ye aapke project ki pehchaan hai, Firebase ne di hai
const firebaseConfig = {
    apiKey: "AIzaSyD8W9QuEOso1EFr6gUO9vglP_uODBLCGIw",
    authDomain: "student-registration-for-71c2e.firebaseapp.com",

    // NAYA add hua: Realtime Database ka address
    // Isse Firebase ko pata chalta hai ki data kahan save karna hai
    databaseURL: "https://student-registration-for-71c2e-default-rtdb.asia-southeast1.firebasedatabase.app",

    projectId: "student-registration-for-71c2e",
    storageBucket: "student-registration-for-71c2e.firebasestorage.app",
    messagingSenderId: "950778596758",
    appId: "1:950778596758:web:00275aa394d50b180fa1b7",
    measurementId: "G-NRBP2Y0SCQ"
};


// =====================================================
// STEP 3: Firebase aur Database se connect karna
// =====================================================

// Firebase project se connection (ye pehle se tha)
const app = initializeApp(firebaseConfig);

// NAYA: us project ke andar ka database nikal kar "db" me rakha
const db = getDatabase(app);


// =====================================================
// STEP 4: HTML ke elements pakadna
// =====================================================
// Ye naam HTML ke id se bilkul same hone chahiye (capital/small letter bhi)

// <form id="studentForm"> wala form
const form = document.getElementById("studentForm");

// <p id="Done"> jisme success ya error message dikhega
const done = document.getElementById("Done");


// =====================================================
// STEP 5: Jab user "Submit Details" dabaye tab ye chale
// =====================================================
form.addEventListener("submit", async (e) => {

    // Page ko reload hone se rokta hai
    // (reload hua to data bhejne se pehle hi page refresh ho jayega)
    e.preventDefault();

    // try = pehle ye kaam karke dekho
    try {

        // STEP 6: Database me "students" folder me nayi entry ki jagah banao
        // push() har student ke liye ek alag unique ID bana deta hai
        const newStudentRef = push(ref(db, "students"));

        // STEP 7: Us jagah par form ka data save karo
        // .value = user ne input box me jo likha wo
        // await = data save hone tak ruko
        await set(newStudentRef, {
            name: document.getElementById("name").value,
            roll: document.getElementById("roll").value,
            studentId: document.getElementById("studentId").value,
            email: document.getElementById("email").value,
            dob: document.getElementById("dob").value
        });

        // STEP 8: Data save ho gaya, to user ko message dikhao
        done.textContent = "Details submit ho gaye!";

        // Form ke saare boxes khali kar do
        form.reset();

    // catch = agar upar kuch bhi galat hua (internet nahi, rules block, etc.)
    } catch (error) {

        // User ko error message dikhao
        done.textContent = "Submit nahi ho paya";

        // Asli error browser ke Console (F12) me dikhega, debugging ke liye
        console.error(error);
    }
});