const themeBtn = document.getElementById('theme-btn')
const lightDarkIcon = document.getElementById('light-dark-icon')
const showNavBtn = document.getElementById('show-nav-btn')
const navWrapper = document.getElementById('nav-wrapper')
const htmlElement = document.documentElement 
console.log(htmlElement)

themeBtn.addEventListener('click', () => {
    console.log('click')
    htmlElement.classList.toggle('dark')
    // lightDarkIcon.classList.toggle('icon-dark-mode')
})

// showNavBtn.addEventListener('click', () => {
//     navWrapper.classList.toggle('hidden')
// })