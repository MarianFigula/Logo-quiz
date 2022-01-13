
const correctLettersCont = document.querySelector(".correct-letters-container");
const randomLettersCont = document.querySelector(".random-letters-container");
const hintBtn = document.querySelector('#hint-btn');
const solutionBtn = document.querySelector('#solution-btn');
const nextLvlBtn = document.querySelector("#next-lvl-btn");
const mainMenuBtn = document.querySelector("#main-menu-btn");
const understandBtn = document.querySelector('#understand-btn');
const imageContainer = document.querySelector(".image-container");
const buttonX = document.querySelector('#button-x')
let pole;
let index;
let counterGood;
const audioFail = new Audio('./sounds/fail.mp3');
const audioSuccess = new Audio('./sounds/success.mp3');

/*
function pridajPolicka(name){
    for (let i = 0; i < name.length; i++) {
        let policko = document.createElement("div");
        policko.setAttribute("class", "hadacie-policko");
        correctLettersCont.appendChild(policko);
    }
}
*/

function createLetterFields(name){
    let hiddenWord = name;
    let randomNumber = Math.floor(Math.random() * hiddenWord.length);
    for (let i = 0, counter = 0; i < 24; i++) {
        let field = document.createElement("div");
        let randomChar = Math.floor(Math.random() * (91-65)) + 65;
        field.setAttribute("class", "letter-field");


        if (i % 2=== 0 && counter !== name.length){
            field.innerText = hiddenWord[randomNumber].toUpperCase();
            hiddenWord = hiddenWord.replace(hiddenWord[randomNumber], "");
            randomNumber = Math.floor(Math.random() * hiddenWord.length);
            counter++;
        }else {
            field.innerText = String.fromCharCode(randomChar);
        }
        field.addEventListener("dragend", () => {
            checkWin().then(r => console.log("dragend OK"));
        });
        field.addEventListener("touchend", () => {
            checkWin().then(r => console.log("touchend OK"));

        });
        randomNumber = Math.floor(Math.random() * hiddenWord.length);
        randomLettersCont.appendChild(field);
    }
}

function setFromLocalStorage(key,number){ if (isNaN(number) || number == null) return localStorage.getItem(key); }

function pushToLocalStorage(key, number){
    if (localStorage.getItem(key) == null){
        localStorage.setItem(key, number);
    }
}

function setLocalStorage(){
    if (localStorage.getItem("objects") == null){
        let pole = [];
        fetch("./game.json")
            .then(res => res.json())
            .then(data => {
                for (let i = 0; i < 10; i++) {
                    let random = Math.floor(Math.random() * data.length);
                    pole.push(data[random]);
                    data.splice(random, 1);
                }
                localStorage.setItem("objects", JSON.stringify(pole));
            })
    }
    pushToLocalStorage("index",0);
    pushToLocalStorage("counterGood",0);
}


function createImage(object){
    let img = document.createElement("img");
    img.setAttribute("id","logo");
    img.src = `imgs/${object.filename}`;
    img.alt = object.name;
    imageContainer.appendChild(img);
}

function displayModal(){
    let modal = document.getElementById("my-modal");
    modal.style.opacity = "1";
    modal.style.display = "block";
}

function closeModal(){
    let modal = document.getElementById("my-modal");
    modal.style.opacity = "0";
    modal.style.display = "none";
}

// function of adding specific text to modal (1 modal, different text)
function modalText(title, helpText){
    displayModal();
    let modalBody = document.querySelector('.modal-body');
    let modalTitle = document.querySelector('.modal-title');
    modalTitle.innerHTML = title;
    modalBody.innerHTML = helpText;
}

// switching between 3 buttons according to displayed modal with different content
function switchDisplay(btn1,btn2,btn3){
    btn1.style.display = "block";
    btn2.style.display = "none";
    btn3.style.display = "none";
}

hintBtn.addEventListener("click", () =>{
    buttonX.style.display = "block"
    modalText("Nápoveda",pole[index].help);
    switchDisplay(understandBtn, nextLvlBtn, mainMenuBtn);
})

understandBtn.addEventListener("click", () => {
    closeModal();
})

solutionBtn.addEventListener("click", async () => {

    audioFail.volume = 0.5;
    await audioFail.play().then(r => console.log("audioFail OK")).catch(err => console.log("Audi Error: ",err));
    buttonX.style.display = "none"

    if (index === pole.length - 1) {
        modalText("Koniec Hry!", "Vaše skóre: " + `<span class='fw-bold'>${counterGood}/${pole.length}</span>`);
        switchDisplay(mainMenuBtn, understandBtn, nextLvlBtn)
    } else {
        modalText("Riešenie", "Správna odpoveď je: " + `<span class='fw-bold'>${pole[index].name.toUpperCase()}</span>`);
        switchDisplay(nextLvlBtn, understandBtn, mainMenuBtn);
    }
})

nextLvlBtn.addEventListener("click", () =>{
    nextLvl();
    closeModal();
})

mainMenuBtn.addEventListener("click", () => {
    window.open("index.html","_self");
    localStorage.clear();
})

buttonX.addEventListener("click", () =>{
    closeModal()
})

// remove all children from parent
function clearAllChildren(container){
    let child = container.lastChild;
    while (child){
        container.removeChild(child);
        child = container.lastChild;
    }
}

// clear all content (img, rand. letters fields, correct letter fields)
function clearAll(){
    clearAllChildren(randomLettersCont);
    clearAllChildren(imageContainer);
    clearAllChildren(correctLettersCont);
}

// load new img and random letters
function startLvl(){
    createImage(pole[index]);
    createLetterFields(pole[index].name);
}

function nextLvl(){
    clearAll();
    index++;
    localStorage.setItem("index",index)
    startLvl();
}

// promise to wait before some commands
//function sleep(ms) {return new Promise(resolve => setTimeout(resolve, ms));}

// display modal when the player get correct answer
async function winModal() {
    audioSuccess.volume = 0.5;
    await audioSuccess.play().then(r => console.log("AudioSuccess OK")).catch(err => console.log("Audio Error:", err));
    buttonX.style.display = "none"
    if (index === pole.length - 1) {
        modalText("Koniec Hry!", "Vaše skóre: " + `<span class='fw-bold'>${counterGood}/${pole.length}</span>`);
        switchDisplay(mainMenuBtn, understandBtn, nextLvlBtn)
    } else {
        switchDisplay(nextLvlBtn, understandBtn, mainMenuBtn)
        modalText("Výborne!", "Správna odpoveď bola: " + `<span class='fw-bold'>${pole[index].name.toUpperCase()}</span>`);
    }
}

async function checkWin () {
    let nodes = correctLettersCont.childNodes;
    let string = "";

    nodes.forEach(node => {
        string += node.innerText;

    })
    if (string === pole[index].name.toUpperCase()) {
        counterGood++;
        //console.log(counterGood)
        localStorage.setItem("counterGood",counterGood)
        await winModal();
    }
}
/*
dragula([document.getElementById("random"), document.getElementById("correct")], {

}).on('drop', checkWin);*/


setLocalStorage();
index = setFromLocalStorage("index",index)
counterGood = setFromLocalStorage("counterGood",counterGood)

try{pole = JSON.parse(localStorage.getItem("objects"));}
catch (e){ console.log("ERROR",e)}

startLvl();

navigator.serviceWorker.register("serviceWorker.js")
    .then((reg) => {
        console.log("SW Registered", reg)
    }).catch((err) => {
    console.log("SW ERROR:",err)
})

new Sortable(document.getElementById("random"), {
    group: 'shared', // set both lists to same group
    animation: 150,

});

new Sortable(document.getElementById("correct"), {
    group: 'shared',
    animation: 150
});

