
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

import { getAuth, GoogleAuthProvider, GithubAuthProvider, signInWithPopup, onAuthStateChanged, signOut, fetchSignInMethodsForEmail } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

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
const signOutBtn = document.getElementById('sign-out')
const profileIcon = document.getElementById('profile-icon')

signOutBtn.style.display = "none";
// profileIcon.style.display = "none";
// welcomeMessage.style.display = "none";

const handleSignInError = async (error) => {
    if (error.code === 'auth/account-exists-with-different-credential') {
      const pendingCred = error.credential;
      const email = error.customData.email;
  
      try {
        const methods = await fetchSignInMethodsForEmail(auth, email);
        alert(`This email is already used with: ${methods[0]}. Please sign in using that provider.`);
  
        // Optional: If user logs in correctly, you could link the accounts:
        // const result = await signInWithPopup(auth, correctProvider);
        // await linkWithCredential(result.user, pendingCred);
  
      } catch (fetchError) {
        console.error("Error fetching sign-in methods:", fetchError);
      }
    } else {
      console.error("Sign-in error:", error);
      alert("Login failed: " + error.message);
    }
  };
  

const googleUserSignIn = async() => {
    signInWithPopup(auth, googleProvider)
    .then(result => console.log(result.user))
    .catch(handleSignInError);
    }

const githubUserSignIn = async() => {
    signInWithPopup(auth, githubProvider)
  .then(result => console.log(result.user))
  .catch(handleSignInError);
}



const userSignOut = async() => {
    signOut(auth).then(() => {
        alert("You have signed out, bye for now!");
    }).catch((error) => {})
}

const fallbackText = document.getElementById('fallback-text');

onAuthStateChanged(auth, (user) => {
    console.log("Auth state changed:", user);

    if (user) {
        const fullName = user.displayName || '';
        const firstName = fullName.split(' ')[0];
        signOutBtn.style.display = "block";
        googleLogin.style.display = "none";
        githubLogin.style.display = "none";
        welcomeMessage.innerHTML =`Hi ${firstName}`

        if (user.photoURL) {
            profileIcon.src = user.photoURL;
            profileIcon.classList.remove("hidden");
            fallbackText.classList.add("hidden");
        } else {
            profileIcon.classList.add("hidden");
            fallbackText.classList.remove("hidden");
            welcomeMessage.innerText = '';
        }
    } else {
        signOutBtn.style.display = "none";
        googleLogin.style.display = "flex";
        githubLogin.style.display = "flex";
        welcomeMessage.innerHTML = `Welcome to Wiki+`
        profileIcon.classList.add("hidden");
        fallbackText.classList.remove("hidden");
    }
});


googleLogin.addEventListener('click', googleUserSignIn);
githubLogin.addEventListener('click', githubUserSignIn);
signOutBtn.addEventListener('click', userSignOut);