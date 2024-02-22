"use strict"
let currentAppreciationId = null;
let appreciationList = [];
let memberList = [];
let newMember = null;
const familyTeamPresentations = document.getElementById("family-team-presentations");
class Member {
    constructor(name, img, rol, id) {
        this.name = name,
        this.img = img,
        this.rol = rol,
        this.id = id,
        this.html = `<div class="presentation-card-c">
        <img src="${this.img}" alt="Family  Picture">
        <div class="card-content-div-c">
            <h1>${this.rol}</h1>
            <p>${this.name}</p>
            <button class="family-card-button-c" onclick = memberMoreInfo(${this.id})>More Info</button>
        </div>`
    }
}

const addMember = (name, img, rol, ) => {
    newMember = new Member(name, img, rol, memberList.length)
    memberList.push(newMember)
    return newMember
}

let yaritza = addMember("Yaritza Sanchez", "./src/yaritza.webp", "Family Liaison")
let gustavo = addMember("Gustavo Nascimento", "./src/gustavo.webp", "Attendance Paraprofessional")
let Crismeiry = addMember("Crismeiry Mejia", "../general/src/bincalogo.png", "Attendance Paraprofessional")
for (let i = 0; i < memberList.length; i++) {
    familyTeamPresentations.innerHTML += memberList[i].html
}