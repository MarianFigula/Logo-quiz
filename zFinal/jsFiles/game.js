


/*
navigator.serviceWorker.register("./serviceWorker.js")
.then((reg) => {
    console.log("service worker registered", reg);
})
.catch(err => {
    console.log("error",err)
})
*/

// TODO: ak index === pole.length tak button pre novy level bude odkzaovat na hl menu (novy button)
// TODO: ukladat index do local storage

const spravnePolickaCont = document.querySelector(".spravne-policka-container");
const randomPismenaCont = document.querySelector(".random-pismena-container");
const napovedaBtn = document.querySelector('#napoveda-btn');
const riesenieBtn = document.querySelector('#riesenie-btn');
const nextLvlBtn = document.querySelector("#next-lvl-btn");
const mainMenuBtn = document.querySelector("#main-menu-btn");
const understandBtn = document.querySelector('#understand-btn');
const imageContainer = document.querySelector(".image-container");
const buttonX = document.querySelector('#button-x')
const audioSuccess = new Audio('success.mp3');
//const audioFail = new Audio('fail.mp3');

let pole;
let index;
let counterGood;


audioSuccess.volume = 0.5
/*
function pridajPolicka(name){
    for (let i = 0; i < name.length; i++) {
        let policko = document.createElement("div");
        policko.setAttribute("class", "hadacie-policko");
        spravnePolickaCont.appendChild(policko);
    }


}
*/


function pridajPismenka(name){
    let hiddenWord = name;
    let randomNumber = Math.floor(Math.random() * hiddenWord.length);
    console.log("randomNumber", randomNumber);
    for (let i = 0, counter = 0; i < 26; i++) {
        let policko = document.createElement("div");
        let randomChar = Math.floor(Math.random() * (91-65)) + 65;
        policko.setAttribute("class", "vsetky-pismena");


        if (i % 2=== 0 && counter !== name.length){
            policko.innerText = hiddenWord[randomNumber].toUpperCase();
            hiddenWord = hiddenWord.replace(hiddenWord[randomNumber], "");
            console.log("nameLength", hiddenWord.length);
            console.log("name", hiddenWord);
            randomNumber = Math.floor(Math.random() * hiddenWord.length);
            console.log("randomNumberAFTER", randomNumber);
            counter++;
            console.log(counter)
            policko.style.backgroundColor = "#0c6594";
        }else {
            console.log("random char else:", randomChar)
            policko.innerText = String.fromCharCode(randomChar);
        }
    //     console.log(randomChar.toString());
    //     policko.style.width = "3.8vw";
    //     policko.style.minHeight = "7vh";
    //     policko.style.backgroundColor = "red";
    //     policko.style.borderRadius = "10px";
    //     policko.style.textAlign = "center";
    //     policko.style.fontSize = "1rem";
    //     policko.style.paddingTop = "0.7em";
    //     policko.style.border = "1px solid black";

        randomNumber = Math.floor(Math.random() * hiddenWord.length);
        randomPismenaCont.appendChild(policko);

    }
}

function setFromLocalStorage(key,number){
    if (isNaN(number) || number == null){
        number = localStorage.getItem(key);
        return number;
    }
}

function pushToLocalStorage(key, number){
    if (localStorage.getItem(key) == null)
        localStorage.setItem(key, number);
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


function vytvorImage(object){
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

function modalText(title, helpText){
    displayModal();
    let modalBody = document.querySelector('.modal-body');
    let modalTitle = document.querySelector('.modal-title');
    modalTitle.innerHTML = title;
    modalBody.innerHTML = helpText;
}

function switchDisplay(btn1,btn2,btn3){
    btn1.style.display = "block";
    btn2.style.display = "none";
    btn3.style.display = "none";
}

napovedaBtn.addEventListener("click", () =>{
    buttonX.style.display = "block"
    modalText("Nápoveda",pole[index].help);
    switchDisplay(understandBtn, nextLvlBtn, mainMenuBtn);
})

understandBtn.addEventListener("click", () => {
    closeModal();
})

riesenieBtn.addEventListener("click", () =>{
    buttonX.style.display = "block"

    if (index === pole.length - 1){
        modalText("Koniec Hry!","Vaše skóre: " + `<span class='fw-bold'>${counterGood}/${pole.length}</span>`);
        switchDisplay(mainMenuBtn, understandBtn, nextLvlBtn)
    }
    else{
        modalText("Riešenie","Správna odpoveď je: " + `<span class='fw-bold'>${pole[index].name.toUpperCase()}</span>`);
        switchDisplay(nextLvlBtn, understandBtn, mainMenuBtn);
    }
})

nextLvlBtn.addEventListener("click", () =>{
    nextLvl();
    closeModal();
    console.log("next lvl")
})

mainMenuBtn.addEventListener("click", () => {
    window.open("index.html","_self");
    localStorage.clear();
})

buttonX.addEventListener("click", () =>{
    closeModal()
})

function clearAllChildren(container){
    let child = container.lastChild;
    while (child){
        container.removeChild(child);
        child = container.lastChild;
    }
}

function clearAll(){
    clearAllChildren(randomPismenaCont);
    clearAllChildren(imageContainer);
    clearAllChildren(spravnePolickaCont);
}

function startLvl(){
    vytvorImage(pole[index]);
    pridajPismenka(pole[index].name);

}

function nextLvl(){
    clearAll();
    index++;
    localStorage.setItem("index",index)
    console.log("index:",index)
    startLvl();
}



function sleep(ms) {return new Promise(resolve => setTimeout(resolve, ms));}

function winModal(){
    audioSuccess.play().then(r => console.log("OK"));
    buttonX.style.display = "none"
    console.log("winmodalpole",pole)
    if (index === pole.length - 1){
        modalText("Koniec Hry!","Vaše skóre: " + `<span class='fw-bold'>5/10</span>`);
        switchDisplay(mainMenuBtn, understandBtn, nextLvlBtn)
    }
    else{
        switchDisplay(nextLvlBtn, understandBtn, mainMenuBtn)
        modalText("Výborne!","Správna odpoveď bola: " + `<span class='fw-bold'>${pole[index].name.toUpperCase()}</span>`);
    }
}

async function checkWin () {
    let nodes = spravnePolickaCont.childNodes;
    let string = "";

    nodes.forEach(node => {
        string += node.innerText;
        console.log(string);
    })
    if (string === pole[index].name.toUpperCase()) {
        await sleep(80);
        counterGood++;
        winModal();
        console.log("SPRAVNA ODPOVED")
    }
}

dragula([document.getElementById("left"), document.getElementById("right")], {

}).on('drop', checkWin);


setLocalStorage();

try{
    pole = JSON.parse(localStorage.getItem("objects"));
}catch (e){

}
console.log(pole);
setFromLocalStorage("index",index)
setFromLocalStorage("counterGood",counterGood)

console.log(index)
startLvl();