const screens = {
    intro: document.getElementById('screen_intro'),
    landing: document.getElementById('screen_landing'),
    input1: document.getElementById('screen_input1'),
    input2: document.getElementById('screen_input2'),
    game: document.getElementById('screen_game'),
    result: document.getElementById('screen_result'),
};

const btnP1 = document.getElementById('btnPlayerOne');
const submitP1 = document.getElementById('submitp1');
const submitP2 = document.getElementById('submitp2');
const txtP1 = document.getElementById('inputone');
const txtP2 = document.getElementById('inputtwo');
const boarded = document.getElementById('board');
const resultTitle = document.getElementById('resultTitle');
const resultPlayer = document.getElementById('resultPlayer');
const resultMessage = document.getElementById('resultMessage');
const btnRestart = document.getElementById('btnRestart');

let choiceP1, choiceP2;
let boardState, currentPlayer;

function show(screenName){
    Object.values(screens).forEach(s=>s.classList.remove('active'));
    screens[screenName].classList.add('active');
}

/*Input*/

btnP1.onclick = () => show('input1');

submitP1.onclick = () => {
    if(!txtP1.value.trim()) return alert('You must enter something, Player One!');
    choiceP1 = txtP1.value.trim();
    show('input2');
};

submitP2.onclick = () =>{
    if(!txtP2.value.trim()) return alert('You must enter something, Player Two!');
    choiceP2 = txtP2.value.trim();
    initBoard();
    show('game');
};

/*Game*/

function initBoard(){
    boardState = Array(9).fill(null);
    currentPlayer = 'X';
    boarded.innerHTML = '';
    for(let i=0; i<9; i++){
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.idx = i;
        cell.onclick = handleCell;
        boarded.appendChild(cell);
    }
}

const winCombos=[
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]
];

function handleCell(e){
    const i = e.currentTarget.dataset.idx;
    if(boardState[i] || screens.result.classList.contains('active')) return;
    boardState[i] = currentPlayer;
    if(currentPlayer === 'X'){
        const img = document.createElement('img');
        img.src= '../assets/star.svg';
        img.alt = '*';
        e.currentTarget.appendChild(img);
    }else{
        const img = document.createElement('img');
        img.src= '../assets/circle.svg';
        img.alt = 'O';
        e.currentTarget.appendChild(img);
    }
    if(checkWin()){
        endGame(currentPlayer);
    } else if(boardState.every(v=>v !== null)){
        endGame(null);
    } else{
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWin(){
    return winCombos.some(combo => combo.every(i=>boardState[i] === currentPlayer));
    
}

function endGame(winner){
    show('result');
    const modal = screens.result.querySelector('.result');
    modal.classList.remove('winX', 'winO', 'draw');

    if(winner==='X'){
        resultTitle.textContent ='WINNER!';
        resultPlayer.textContent = 'Player One';
        resultMessage.textContent = choiceP1;
        modal.classList.add('winX');
    }
    else if(winner === 'O'){
        resultTitle.textContent = 'WINNER!';
        resultPlayer.textContent = 'Player Two';
        resultMessage.textContent = choiceP2;
        modal.classList.add('winO');
    }
    else{
        resultTitle.textContent = 'DRAW!';
        resultMessage.textContent = "Hmm... Seems like you are too good at this game. Try Again!";
        modal.classList.add('draw');
    }
}

btnRestart.onclick = () => {
    txtP1.value = '';
    txtP2.value = '';
    show('landing');
};

/*Splash Page*/

window.addEventListener('DOMContentLoaded', () => {
    show('intro');
    setTimeout(() =>
        show('landing'), 3000);
});