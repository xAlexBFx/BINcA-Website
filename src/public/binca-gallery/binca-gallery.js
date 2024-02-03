"use-strict"
const titleInputDiv = document.getElementById("title-input-div");
const descriptionInputDiv = document.getElementById("description-input-div");
const fileInputDiv = document.getElementById("file-input-div");
const requestForm = document.getElementById("request-form");
const titleInput = document.getElementById("title-input");
const descriptionInput = document.getElementById("description-input");
const fileInput = document.getElementById("file-input");
const formSubmitButton = document.getElementById("form-submit-button");
const fileSelectorImageDiv = document.getElementById("file-selector-image-div");
const fileImageH1 = document.getElementById("file-image-h1");
const InputFilter = /^[a-zA-Z0-9.,;:!?()'"¡¿_\-\s]*$/;

requestForm.setAttribute('novalidate', 'true');

fileInput.addEventListener('change', (event) => {
    const selectedFile = event.target.files[event.target.files.length - 1];

    if (selectedFile && verifyFileType(selectedFile)) {
        fileImageH1.style.display = "none"
        fileSelectorImageDiv.innerHTML = `<img src="./src/starting2.jpg" alt="">`;
    } else {
        errorParagraphControl(fileInput ,"You must select an image");
    }
});

function verifyFileType(file) {
    const allowedFileTypes = ['image/jpeg', 'image/png'];
    return allowedFileTypes.includes(file.type);
}

requestForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData();

    if(titleInput.value.length > 8 && titleInput.value.length <= 30) {
        if(descriptionInput.value.length > 8 && descriptionInput.value.length <= 60) {
            if(validateInput(titleInput) == true) {
                if(validateInput(descriptionInput) == true) {
                        if(fileInput.files && fileInput.files.length > 0) {
                            if (verifyFileType(fileInput.files[fileInput.files.length - 1])) {
                                    try {
                                        const data = {
                                            "title" : titleInput.value,
                                            "description" : descriptionInput.value
                                        }
                                        console.log(data.src)
                                        fetch("http://localhost:8080/binca-gallery", {
                                            method: 'POST',
                                            headers: {
                                                "Content-Type": "application/json"
                                            },
                                            body: JSON.stringify(data)
                                        })
                                        .then((res) => res.json())
                                        .then((res) => {
                                            if(res.ErrorStatus == true) {
                                                throw new Error(res.message)
                                            } else{
                                                console.log(res.uploaded)
                                            }
                                        })
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

function validateInput(input) {
    if(InputFilter.test(input.value) == true) return true;

    else if((InputFilter.test(input.value) == false)){ 
        return false;
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