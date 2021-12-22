
let startGameBtn = document.querySelector("#start-game-btn");
let rulesBtn = document.querySelector("#rules-btn");
let controlsBtn = document.querySelector("#controls-btn");
let understandBtn = document.querySelector("#understand-btn")
let buttonX = document.querySelector("#button-x")

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
}

try {
    setLocalStorage()
}catch (e){}

const hoverAnimation = (id) => {
    anime({
        targets: id,
        scale: {
            value: 1.2
        },
        duration: 1000,
    })
}

const hoverAnimationOut = (id) => {
    anime({
        targets: id,
        scale: {
            value: 1
        },
        duration: 1100,
    })
}

const modalScroll = (id,pixels,duration) => {
    anime({
        targets: id,
        translateY: pixels,
        duration: duration,
    })
}

function displayModal(){
    let modal = document.getElementById("my-modal");
    modal.style.opacity = "1";
    modal.style.display = "block";
}

function modalRules(){
    displayModal();
    let modalBody = document.querySelector('.modal-body');
    let modalTitle = document.querySelector('.modal-title');
    modalTitle.innerHTML = "Pravidlá";
    modalBody.innerHTML = "Hra logo quiz pozostáva z desiatich úloh.\n" +
        "        Vašou úlohou bude uhádnuť známe ale aj menej populárne svetové značky a ich logá.\n" +
        "        Ak hráč usporiadá písmená v správnom poradí, získava bod. Ak logo nebude vedieť uhádnuť, môže kliknúť na tlačidlo \"Nápoveda\" alebo " +
        "       \"Riešenie\".\n" + "Ak hráč klikne na tlačidlo \"Riešenie\" nezískava bod a prechádza na ďalší level.\n"+
        "        Na konci hráč uvidí svoje skóre.\n"
}

function modalControls(){
    displayModal();
    let modalBody = document.querySelector('.modal-body');
    let modalTitle = document.querySelector('.modal-title');
    modalTitle.innerHTML = "Ovládanie hry";
    modalBody.innerHTML = "Typ hry - drag and drop.\n" +
        "        Hráč ovláda hru myšou (prstom na smartphone/tablete).\n" +
        "        Hráč musí kliknúť na písmeno a presunúť ho do vyznačeného poľa.\n"
}

function closeModal(){
    let modal = document.getElementById("my-modal");
    modal.style.opacity = "0";
    modal.style.display = "none";
}

startGameBtn.addEventListener("mouseover", () => hoverAnimation(startGameBtn))
startGameBtn.addEventListener("mouseout", () => hoverAnimationOut(startGameBtn))
startGameBtn.addEventListener("click", () => {
    window.open("gameSite.html","_self")
    hoverAnimationOut(startGameBtn);
})

rulesBtn.addEventListener("mouseover", () => hoverAnimation(rulesBtn))
rulesBtn.addEventListener("mouseout", () => hoverAnimationOut(rulesBtn))
rulesBtn.addEventListener("click", () => {
    modalRules();
    modalScroll("#dialog",60, 1100)
})

controlsBtn.addEventListener("mouseover", () => hoverAnimation(controlsBtn))
controlsBtn.addEventListener("mouseout", () => hoverAnimationOut(controlsBtn))
controlsBtn.addEventListener("click", () => {
    modalControls();
    modalScroll("#dialog",90,1100)
})

understandBtn.addEventListener("click", () =>{
    closeModal();
    if (document.querySelector('.modal-title').innerText === "Pravidlá"){
        modalScroll("#dialog",-60, 0)}
    else{
        modalScroll("#dialog",-90, 0)}
})

buttonX.addEventListener("click", () =>{
    closeModal();
    if (document.querySelector('.modal-title').innerText === "Pravidlá")
        modalScroll("#dialog",-60, 0)
    else
        modalScroll("#dialog",-90, 0)
})

// registrating service worker
navigator.serviceWorker.register("serviceWorker.js")
    .then((reg) => {
        console.log("SW Registered", reg)
    }).catch((err) => {
    console.log("ERROR:",err)
})

