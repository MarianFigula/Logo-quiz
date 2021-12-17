
let startGameBtn = document.querySelector("#start-game-btn");
let rulesBtn = document.querySelector("#rules-btn");
let controlsBtn = document.querySelector("#controls-btn");
let understandBtn = document.querySelector("#understand-btn")
let buttonX = document.querySelector("#button-x")

const hoverAnimation = (id) => {
    anime({
        targets: id,
        scale: {
            value: 1.2
        },
        duration: 1000,
    })
}

const mouseOut = (id) => {
    anime({
        targets: id,
        scale: {
            value: 1
        },
        duration: 1100,
    })
}

const modalScroll = (id) => {
    anime({
        targets: id,
        translateY: 90,
        duration: 1100,
    })
}

// todo: zmenit aby sa nevykonavala animacia
const modalScrollBack = (id) => {
    anime({
        targets: id,
        translateY: -90,
    })
}

function displayModal(){
    let modal = document.getElementById("my-modal");
    modal.style.opacity = "1";
    modal.style.display = "block";
}

function modalPravidla(){
    displayModal();
    let modalBody = document.querySelector('.modal-body');
    let modalTitle = document.querySelector('.modal-title');
    modalTitle.innerHTML = "Pravidlá";
    modalBody.innerHTML = "Hra logo quiz pozostáva z desiatich úloh.\n" +
        "        Vašou úlohou bude uhádnuť známe ale aj menej populárne svetové značky a ich logá.\n" +
        "        Za každé uhádnuté logo hráč získava bod. Ak logo nebude vedieť uhádnuť, môže kliknúť na tlačidlo \"Neviem\".\n" +
        "        Tým pádom hráč nezískava bod a pokračuje v hre ďalej. Na konci hráč uvidí svoje skóre.\n"
}
function modalNastavenia(){
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
startGameBtn.addEventListener("mouseout", () => mouseOut(startGameBtn))
startGameBtn.addEventListener("click", () => window.open("gameSite.html","_self"))

rulesBtn.addEventListener("mouseover", () => hoverAnimation(rulesBtn))
rulesBtn.addEventListener("mouseout", () => mouseOut(rulesBtn))
rulesBtn.addEventListener("click", () => {
    modalPravidla();
    modalScroll("#dialog")
})


controlsBtn.addEventListener("mouseover", () => hoverAnimation(controlsBtn))
controlsBtn.addEventListener("mouseout", () => mouseOut(controlsBtn))
controlsBtn.addEventListener("click", () => {
    modalNastavenia();
    modalScroll("#dialog")
})

understandBtn.addEventListener("click", () =>{
    closeModal();
    modalScrollBack("#dialog")
})

buttonX.addEventListener("click", () =>{
    closeModal();
    modalScrollBack("#dialog")
})







//  ZMAZANIE STRANKY
/*

let startGameBtn = document.querySelector('#start-game-btn')
startGameBtn.addEventListener("click", () => {
    let body = document.querySelector("body");
    body.innerHTML = './zadanie5/index.html';
})
*/
