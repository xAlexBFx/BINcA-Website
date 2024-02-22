"use strict"
let previewWindowHtml = null;
const titleInputDiv = document.getElementById("title-input-div");
const descriptionInputDiv = document.getElementById("description-input-div");
const fileInputDiv = document.getElementById("file-input-div");
const requestForm = document.getElementById("request-form");
const titleInput = document.getElementById("title-input");
const descriptionInput = document.getElementById("description-input");
const fileInput = document.getElementById("file-input");
const previewPublicationButton = document.getElementById("preview-publication-button");
const previewBaseDiv = document.getElementById("image-window-base")
const previewWindowStatus = false;
const fileSelectorImageDiv = document.getElementById("file-selector-image-div");
const fileImageH1 = document.getElementById("file-image-h1");
const InputFilter = /^[a-zA-Z0-9.,;:!?()'"¡¿_\-\s]*$/;
const galleryImageWindowSection = document.getElementById("gallery-image-window-section");
const imageWindowBase = document.getElementById("image-window-base");

requestForm.setAttribute('novalidate', 'true');

function verifyFileType(file) {
    const allowedFileTypes = ['image/jpeg', 'image/png'];
    return allowedFileTypes.includes(file.type);
}

previewPublicationButton.addEventListener("click", () => {
    displayPreviewPublication()
})

function displayPreviewPublication() {
    if(!previewWindowStatus) document.documentElement.style.overflowY = "hidden";
    try {
        const previewImage = fileInput.files[fileInput.files.length - 1];
        previewWindowHtml = `<div id="gallery-window-img-div" class="gallery-window-img-div-c">
        </div>
        <div id="gallery-window-control-panel" class="gallery-window-control-panel-c">
            <i id="image-window-exit-button" class='bx bx-exit' onclick = closePreviewWindow()></i>
        </div>
        <div class="gallery-window-content-div-c">
            <h1>${titleInput.value}</h1>
            <p>${descriptionInput.value}</p>
            <div class="gallery-content-buttons-div-c">
                <button class="gallery-content-buttons-c">Hello</button>
                <button class="gallery-content-buttons-c">bye</button>
            </div>
        </div>`
        if (previewImage) {
            const lector = new FileReader();
            lector.onload = function (e) {
                document.getElementById("gallery-window-img-div").innerHTML = `<img src="${e.target.result}" alt="Your Image">`
            };  
            lector.readAsDataURL(previewImage);
        }
    } catch (err) {
        console.error(err) 
        return;
    }
    galleryImageWindowSection.style.opacity = "1"
    imageWindowBase.innerHTML = previewWindowHtml;
    galleryImageWindowSection.style.top = "0"
}

function closePreviewWindow () {
    if(!previewWindowStatus) document.documentElement.style.overflowY = "auto";
    galleryImageWindowSection.style.pointerEvents = "none"
    previewWindowHtml = null
    galleryImageWindowSection.style.top = "-200vh"
    setTimeout(function () {
        galleryImageWindowSection.style.pointerEvents = "auto"
        galleryImageWindowSection.style.opacity = "0"
    }, 600)
}

function validateInput(input) {
    if(InputFilter.test(input.value) == true) return true;

    else if((InputFilter.test(input.value) == false)){ 
        return false;
    }
}

function showSelectedImage (image) {
    if (image) {
        const lector = new FileReader();
        lector.onload = function (e) {
            fileImageH1.style.display = "none";
            fileSelectorImageDiv.innerHTML =`<img src="${e.target.result}" alt="Your Image">`;
        };  
        lector.readAsDataURL(image);
    }
}

function errorParagraphControl (input, err) {
    const paragraph = document.getElementById(`${input.id}-error-paragraph`) 
    if(!paragraph.classList.contains("active-error-c")) {
        input.classList.add("input-error-c")
        paragraph.textContent = err
        paragraph.classList.add("active-error-c")
        setTimeout(()=> {
            input.classList.remove("input-error-c")
            paragraph.textContent = ""
            paragraph.classList.remove("active-error-c")
        }, 10000)
    }
}

fileInput.addEventListener('change', (event) => {
    const selectedFile = event.target.files[event.target.files.length - 1];
    if (selectedFile && verifyFileType(selectedFile)) {
            showSelectedImage(selectedFile)
    } else {
        errorParagraphControl(fileInput ,"You must select an image");
    }
});

requestForm.addEventListener("submit", function (event) {
    event.preventDefault();
    if(titleInput.value.length > 8 && titleInput.value.length <= 30) {
        if(descriptionInput.value.length > 8 && descriptionInput.value.length <= 60) {
            if(validateInput(titleInput) == true) {
                if(validateInput(descriptionInput) == true) {
                        if(fileInput.files && fileInput.files.length > 0) {
                            if (verifyFileType(fileInput.files[fileInput.files.length - 1])) {
                                    try {
                                        const formData = new FormData(this)
                                        fetch('http://localhost:8080/binca-gallery', {
                                            method: 'POST',
                                            body: formData,
                                        })
                                        .then(response => response.json())
                                        .then(data => {
                                            console.log(data)
                                        })
                                        .catch(error => {
                                            console.error('Error:', error);
                                        });
                                    } catch (err) {
                                        console.log(err)
                                    }
                            }else errorParagraphControl(fileInput ,"You must select an file type image");
                        }else errorParagraphControl(fileInput  ,"Select an image");
                }else if(validateInput(descriptionInput) == false) {
                    errorParagraphControl(descriptionInput , "You must type common characters")
                }
            }else if (validateInput(titleInput) == false) {
                errorParagraphControl(titleInput , "You must type common characters")
            }
        } else if (descriptionInput.value.length <= 8 || descriptionInput.value.length > 60) {
            errorParagraphControl(descriptionInput, "Type a minimum of 8 characters and a maximum of 60")
        }
    } else if (titleInput.value.length <= 8 || titleInput.value.length > 30) {
        errorParagraphControl(titleInput, "Type a minimum of 8 characters and a maximum of 30")
    }
})