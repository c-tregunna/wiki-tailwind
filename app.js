
const themeBtn = document.getElementById('theme-btn')
const lightDarkIcon = document.getElementById('light-dark-icon')
const showNavBtn = document.getElementById('show-nav-btn')
const navWrapper = document.getElementById('nav-wrapper')
const htmlElement = document.documentElement 

themeBtn.addEventListener('click', () => {
    console.log('click')
    htmlElement.classList.toggle('dark')
})


// authorisation
// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth, GoogleAuthProvider, GithubAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8FPQgzXn9LHpifuLDYEh29kiPuE_I7rw",
  authDomain: "wikiplus-c670d.firebaseapp.com",
  projectId: "wikiplus-c670d",
  storageBucket: "wikiplus-c670d.firebasestorage.app",
  messagingSenderId: "172634418865",
  appId: "1:172634418865:web:8ad356774707051029bc90"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const googleProvider = new GoogleAuthProvider()
const githubProvider = new GithubAuthProvider()

const googleLogin = document.getElementById('google-login')
const githubLogin = document.getElementById('github-login')
const welcomeMessage = document.getElementById('message')

const googleUserSignIn = async() => {
    signInWithPopup(auth, googleProvider)
    .then((result) => {
        const user = result.user
        console.log(user);
    }).catch((error) => {
        console.error("Error during sign-in:", error);
        alert("Login failed: " + error.message);
    })
}

const githubUserSignIn = async() => {
    signInWithPopup(auth, githubProvider)
    .then((result) => {
        const user = result.user
        console.log(user);
    }).catch((error) => {
        console.error("Error during sign-in:", error);
        alert("Login failed: " + error.message);
    })
}

onAuthStateChanged(auth, (user) => {
    if(user) {
        // signOutButton.style.display = "block";
        // message.style.display = "block";
        welcomeMessage.innerHTML = `Welcome ${user.displayName}`;
        console.log('click')
        // userImage.src = user.photoURL
        console.log(user);
        // console.log(user.photoURL);
    } else {
        // signOutButton.style.display = "none";
        // message.style.display = "none";
    }
})

googleLogin.addEventListener('click', googleUserSignIn);
githubLogin.addEventListener('click', githubUserSignIn);
// signOutButton.addEventListener('click', userSignOut);