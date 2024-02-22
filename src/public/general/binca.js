"use strict";
let preScrollPost = window.scrollY;
const header = document.getElementById("header");
const navDesktop = document.getElementById("nav-desktop");

window.addEventListener("scroll", function () {
    let currentScrollPos = window.scrollY;
    if (preScrollPost > currentScrollPos) {
        navDesktop.style.top = "0"
        header.style.top = "0"
    } else if (preScrollPost < currentScrollPos && currentScrollPos > 20) {
        navDesktop.style.top = "-100vh"
        header.style.top = "-100vh"
    }
    preScrollPost = currentScrollPos;
});

header.style.top = "0";
//document.body.classList.add("dark")