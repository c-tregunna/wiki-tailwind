const themeBtn = document.getElementById('theme-btn')
const lightDarkIcon = document.getElementById('light-dark-icon')
const showNavBtn = document.getElementById('show-nav-btn')
const navWrapper = document.getElementById('nav-wrapper')
const htmlElement = document.documentElement 

themeBtn.addEventListener('click', () => {
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
const bookmarks = document.getElementById('favourites')
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
        signOutBtn.style.display = "flex";
        bookmarks.style.display = "flex";
        googleLogin.style.display = "none";
        githubLogin.style.display = "none";
        welcomeMessage.innerHTML =`Hi ${firstName}!`

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
        bookmarks.style.display = "none";
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



// search

const searchBox = document.getElementById('search-box')
const searchBtn = document.getElementById('search-btn')
const articleModal = document.getElementById('article-modal')
const closeModalBtn = document.getElementById('close-modal')
const modalBackground = document.getElementById('modal-backdrop')



const searchWikiApi = (searchValue) => {

    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${searchValue}`)
    .then(response => response.json()) // Convert response to JSON
    .then(data => createInformation(data)) // Pass data to function
    .catch(error => console.error("Error fetching data:", error)); // Catch any errors
}

searchBox.addEventListener('keypress', (e) => {
  if(e.key === "Enter") {
    e.preventDefault()
    searchBtn.click()
  }
})

searchBtn.addEventListener('click', () => {
  modalBackground.classList.remove('opacity-0', 'pointer-events-none');
  modalBackground.classList.add('opacity-100');

  articleModal.classList.remove('opacity-0', 'scale-90', 'pointer-events-none');
  articleModal.classList.add('opacity-100', 'scale-100', 'w-11/12', 'h-11/12', 'md:w-1/2');
  
  let searchValue = searchBox.value
  searchWikiApi(searchValue)
  console.log(searchValue)
  searchBox.value = ""
})

closeModalBtn.addEventListener('click', () => {
  modalBackground.classList.add('opacity-0', 'pointer-events-none');
  modalBackground.classList.remove('opacity-100');

  articleModal.classList.add('opacity-0', 'scale-90', 'pointer-events-none');
  articleModal.classList.remove('opacity-100', 'scale-100', 'w-11/12', 'h-11/12', 'md:w-1/2');
})


const featuredArticle = document.getElementById('featured-article')

function createInformation(data) {
  console.log(data);

  // Check if it's a disambiguation page or missing important info
  if (data.type === "disambiguation" || !data.thumbnail) {
      articleModal.innerHTML = `
      <div class="text-center">
          <h2 class="text-lg font-semibold mb-2">${data.title}</h2>
          <p>This search term refers to multiple topics. Please be more specific or <a href="https://en.wikipedia.org/wiki/${data.title}" class="text-blue-600 underline" target="_blank">view the full disambiguation page here</a>.</p>
      </div>`;
      return;
  }

  // Normal article rendering
  featuredArticle.innerHTML = `
  <div class="h-full overflow-y-auto px-4 py-6">
    <div class="flex flex-col items-center gap-4 relative">
      <h2 class="text-lg md:text-4xl mb-2" id="article-title">${data.title}</h2>
      <div class="bg-dark-grey/15 p-4 rounded-sm outline outline-white/25 w-full md:w-1/4 mb-6">
        <img src="${data.thumbnail.source}" class="object-cover mx-auto rounded-sm">
      </div>
      ${data.extract_html || "No description available."}
      <p class="mt-2">Read full article <a href="https://en.wikipedia.org/wiki/${data.title}" class="text-blue-600 underline" target="_blank" id="article-link">here</a></p>
    </div>
  </div>
`;

  // Add bookmark functionality after the article is rendered
  const bookmarkBtn = document.getElementById('bookmark-btn');
  if (bookmarkBtn) {
    bookmarkBtn.addEventListener('click', () => {
      const title = document.getElementById('article-title').textContent;
      const link = document.getElementById('article-link').href;

      // Get existing bookmarks from localStorage
      let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
      
      // Check if article is already bookmarked
      const isAlreadyBookmarked = bookmarks.some(bookmark => bookmark.link === link);
      
      if (!isAlreadyBookmarked) {
        bookmarks.push({ title, link });
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        alert('Great news! Your article has been bookmarked safely. Top job!!');
      } else {
        alert('This article is already bookmarked!');
      }
    });
  }
}

console.log(document.getElementById('bookmark-btn')); 

// Add this JS to the page where articles are shown
document.querySelectorAll('#bookmark-btn').forEach(button => {
  button.addEventListener('click', function () {
    const article = this.closest('article');
    const title = article.getElementById('article-title').textContent;
    const link = article.getElementById('article-link').href;

    const bookmark = { title, link };

    // Get current bookmarks from localStorage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

    // Check if it's already saved
    const isAlreadyBookmarked = bookmarks.some(b => b.link === link);
    if (!isAlreadyBookmarked) {
      bookmarks.push(bookmark);
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
      alert("Bookmarked!");
    } else {
      alert("Already bookmarked!");
    }
  });
});





