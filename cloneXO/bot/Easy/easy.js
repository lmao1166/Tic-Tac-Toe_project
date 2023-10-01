let game = document.querySelector('.gameStatus');


let currentPlayer = "X";
let run = true;

const winMes = () => `Player ${currentPlayer} won`;
const drawMes = () => "Draw!!";
const turnMes = () => `It's player ${currentPlayer} turn`;

let gameState = ["", "", "", "", "", "", "", "", ""];
game.innerHTML = turnMes();
const winCondition = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8],
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8],
    [0, 4, 8], 
    [2, 4, 6]
];


function swapTurn() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    game.innerHTML = turnMes();
}

function click(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function checkWin() {
    let won = false;
    for(let i = 0; i < winCondition.length; i++) {
        let a = gameState[winCondition[i][0]];
        let b = gameState[winCondition[i][1]];
        let c = gameState[winCondition[i][2]];
        if(a === "" || b === "" || c === "") 
            continue;
        if(a === b && b === c) {
            won = true;
            break;
        }
    }

    if(won) {
        game.innerHTML = winMes();
        run = false;
        return;
    }

    if(!gameState.includes("")) {
        game.innerHTML = drawMes();
        run = false;
        return;
    }
    swapTurn();
}

function playerClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
    if(gameState[clickedCellIndex] != "" || !run) {
        return;
    }
    click(clickedCell, clickedCellIndex);
    checkWin();
    if(run) {
        setTimeout(() => {
            bot();
        }, 1000);        
    }
} 


function bot() {
    let i = 9;
    while(true) {
        let idx = Math.floor(Math.random() * i);
        if(gameState[idx] == "") {
            gameState[idx] = currentPlayer;
            document.querySelectorAll('.cell')[idx].innerHTML = gameState[idx];
            checkWin();
            return;
        }
        i--;
    }
}

function restartGame() {
    run = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    game.innerHTML = turnMes();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', playerClick));
document.querySelector('.reset').addEventListener('click', restartGame);







