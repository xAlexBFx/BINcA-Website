"use strict";
const mainGalleryButton = document.getElementById("main-gallery-button");
const principalImgSection = document.getElementById("principal-img-section")
const galleryImageWindowSection = document.getElementById("gallery-image-window-section");
const imageWindowBase = document.getElementById("image-window-base")
const galleryWindowSection = document.getElementById("gallery-window-section");
const galleryOpenedSection = document.getElementById("gallery-opened-section");
const galleryOpenedImg = document.getElementById("gallery-opened-img");
const imageWindowExitButton = document.getElementById("image-window-exit-button");
const galleryOpenedPanelControl = document.getElementById("gallery-opened-panel-control");
const galleryBackButton = document.getElementById("gallery-back-button");
const mainGallery = document.getElementById("main-gallery");
const galleryOpenedContainer = document.getElementById("gallery-opened-grid-container")

let publicationIndex = 0;
let requestId = 1;
let windowGalleryStatus = false
let galleryIndex = 0
let publicationsList = []
let loadingPublications = false

principalImgSection.style.opacity = "1";

if (galleryWindowSection.style.opacity == 0) {
    galleryBackButton.addEventListener("click", () => {
        windowGalleryStatus = false
        galleryWindowSection.style.top = "-100vh"
        document.documentElement.style.overflowY = "scroll"
        setTimeout(function () {
            galleryWindowSection.style.opacity = "0"
        }, 600)
    })
};

async function loadPublications (starting) { 
    loadingPublications = true
    await fetch(`http://localhost:8080/home/${requestId}`)
        .then(response => response.json())
        .then(publicationsChunk => {
            if(publicationsChunk.nPublication !== 0 && publicationsChunk.status == true ){
                publicationsChunk.chunkList.forEach(publication => {
                    if(publication){
                        publicationsList.push(publication)
                        requestId++
                    }
                })
                if (starting == true) {
                    loadingPublications = false
                    generateGalleryImages()
                }
            loadPublicationsToGallery()
            loadingPublications = false
            } else throw new Error("Undefined response");
            })
            .catch (error => console.error('Error:', error))
}

loadPublications(true)

function findPublication (idp) {
    let foundPublication;
    try{
        foundPublication = publicationsList.find((publication) => publication.orderId == idp)
    } catch (err) {
        console.error(`There is not publication with id: ${idp}`)
        return;
    }

    return foundPublication
}

function galleryImgButtonClick (idp) {
    if(!windowGalleryStatus) document.documentElement.style.overflowY = "hidden";
    let publication = findPublication(idp)
    try {
        const imageSrc = `data:${publication.imageType};base64,${publication.imageSrc}`
        publication.windowHtml = `<div class="gallery-window-img-div-c">
            <img src="${imageSrc}" alt="Gallery img">
        </div>
        <div class="gallery-window-control-panel-c">
            <i id="image-window-exit-button" class='bx bx-exit' onclick = closePublicationWindow(${publication.orderId})></i>
            <i class='bx bx-up-arrow-alt' onclick = changePublication(${publication.orderId},${publication.orderId -1})></i>
            <i class='bx bx-down-arrow-alt' onclick = changePublication(${publication.orderId},${publication.orderId + 1})></i>
        </div>
        <div class="gallery-window-content-div-c">
            <h1>${publication.title}</h1>
            <p>${publication.description}</p>
            <h2>${publication.date}</h2>
            <div class="gallery-content-buttons-div-c">
                <button class="gallery-content-buttons-c">Hello</button>
                <button class="gallery-content-buttons-c">bye</button>
            </div>
        </div>`
    } catch (err) {
        console.error(err) 
        return
    }
    
    galleryImageWindowSection.style.opacity = "1"
    imageWindowBase.innerHTML = publication.windowHtml;
    galleryImageWindowSection.style.top = "0"
}

function closePublicationWindow (idp) {
    if(!windowGalleryStatus) document.documentElement.style.overflowY = "auto";
    let publication = findPublication(idp)
    publication.windowHtml = null;
    galleryImageWindowSection.style.pointerEvents = "none"
    galleryImageWindowSection.style.top = "-200vh"
    setTimeout(function () {
        galleryImageWindowSection.style.pointerEvents = "auto"
        galleryImageWindowSection.style.opacity = "0"
    }, 600)
}

function loadPublicationsToGallery () {
    publicationsList.forEach(publication => {
        if (!publication.loadStatus) {
            const imageSrc = `data:${publication.imageType};base64,${publication.imageSrc}`
            galleryOpenedSection.innerHTML += `<div class="gallery-opened-img-div-c" onclick = galleryImgButtonClick(${publication.orderId})>
            <img id="gallery-opened-img${publication.orderId}" class="gallery-opened-img-c" src="${imageSrc}" alt="Gallery Img">
            </div>`
            publication.loadStatus = true
        }
    })
}

mainGalleryButton.addEventListener("click", function () {
    windowGalleryStatus = true
    galleryWindowSection.style.opacity = "1"
    galleryWindowSection.style.top = "0"
    document.documentElement.style.overflowY = "hidden"
});

function changePublication (lastId, newId) {
    if (newId < 1) {
        newId = publicationsList.length
        findPublication(lastId).windowHtml = null
        galleryImgButtonClick(newId)
    } else if (newId > publicationsList.length) {
        newId = 1
        findPublication(lastId).windowHtml = null
        galleryImgButtonClick(newId)
    } else {
        findPublication(lastId).windowHtml = null
        galleryImgButtonClick(newId)
    }
}

function generateGalleryImages () {
    publicationsList.forEach(publication => {
        if (galleryIndex < 6) {
            const imageSrc = `data:${publication.imageType};base64,${publication.imageSrc}`
            mainGallery.innerHTML += `<div class="gallery-img-div-c" onclick = galleryImgButtonClick(${publication.orderId})>
            <img class="main-gallery-img-c" src="${imageSrc}" alt="Gallery Publication">
            <button id="gallery-img-button${publication.orderId}" class="gallery-img-button-c" onclick = galleryImgButtonClick(${publication.orderId})><i class='bx bx-message-square'></i>Open</button>
            </div>`
            galleryIndex++
        }
    })
}

galleryOpenedContainer.addEventListener("scroll", () => {
    if (windowGalleryStatus == true && loadingPublications == false){
        const myScroll = galleryOpenedContainer.scrollHeight - galleryOpenedContainer.scrollTop
        const containerLowerScroll = galleryOpenedContainer.offsetHeight 
        if(myScroll <= containerLowerScroll + 10) {
            loadPublications(false)
        }
    }
})