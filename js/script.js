const screens = {
    intro: document.getElementById('screen_intro'),
    landing: document.getElementById('screen_landing'),
    input1: document.getElementById('screen_input1'),
    input2: document.getElementById('screen_input2'),
    game: document.getElementById('screen_game'),
    result: document.getElementById('screen_result'),
};

const btnP1 = document.getElementById('btnPlayerOne');
const btnP2 = document.getElementById('btnPlayerTwo');
const submitP1 = document.getElementById('submitp1');
const submitP2 = document.getElementById('submitp2');
const txtP1 = document.getElementById('inputone');
const txtP2 = document.getElementById('inputtwo');
const boarded = document.getElementById('board');
const resultTitle = document.getElementById('resultTitle');
const resultMessage = document.getElementById('resultMessage');
const btnRestart = document.getElementById('btnRestart');

let choiceP1, choiceP2;
let boardState, currentPlayer;

function show(screenName){
    Object.values(screens).forEach(s=>s.classList.remove('active'));
    screens[name].classList.add('active');
}

btnP1.onclick = () => show('input1');
btnP2.onclick = () => show('input2');

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

function initBoard(){
    boardState = Array (9).fill(null);
    currentPlayer = 'X';
    boarded.innerHTML = '';
    for(let i=0; i<9; i++){
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.idc = i;
        cell.onclick = handleCell;
        boarded.appendChild(cell);
    }
}

const winCombos=[
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0,3,6], [1,4,7], [2,4,8], [0,4,8], [2,4,6]
];

function handelCell(e){
    const i = e.currentTarget.dataset.idx;
    if(boardState[i] || screens.result.classList.contains('active')) return;
    boardState[i] = currentPlayer;
    e.currentTarget.textContent = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin(){
    return winCombos.some(combo => combo.every(i=>boardState[i] === currentPlayer));
}

function endGame(winner){
    show('result');

    screens.result.querySelector('.result').classList.remove('winX', 'winO', 'draw');

    if(winner==='X'){
        resultTitle.textContent ='WINNER!';
        resultMessage.textContent = choiceP1;
        screens.result.querySelector('.result').classList.add('winX');
    }
    else if(winner === 'O'){
        result.Title.textContent = 'WINNER!';
        resultMessage.textContent = choiceP2;
        screens.result.querySelector('.result').classList.add('winO');
    }
    else{
        result.Title.textContent = 'DRAW!';
        resultMessage.textContent = "Hmm... Seems like you are too good at this game. Try Again!";
        screens.result.querySelector('.result').classList.add('draw');
    }
}

btnRestart.onclick = () => {
    txtP1.value = '';
    txtP2.value = '';
    show('landing');
};

screens.intro = document.getElementById('screen_intro');
window.addEventListener('DOMContentLoaded', () => {
    show('intro');
    setTimeout(() => {
        show('landing');
    }, 5000);
});