const game = document.querySelector('.gameStatus');

let gameActive = true;
let currentPlayer = "X";
let oTrong = ["", "", "", "", "", "", "", "", ""];

const winMes = () =>`Player ${currentPlayer} win`;
const turn = () =>`It's player ${currentPlayer} turn`;
const drawMes = () => "Draw!!"

game.innerHTML = turn();


const winCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function doiLuot() {
    const temp = currentPlayer === "X" ? "O" : "X"
    currentPlayer = temp ;
    game.innerHTML = turn();
}

function click(clickedCell, idx) {
    oTrong[idx] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function checkWin() {
    let won = false;
    for(let i = 0; i < winCondition.length; i++) {
        let a = winCondition[i][0];
        let b = winCondition[i][1];
        let c = winCondition[i][2];
        if(oTrong[a] === "" || oTrong[b] === "" || oTrong[c] === "") {
            continue;
        }
        if(oTrong[a] === oTrong[b] && oTrong[b] === oTrong[c]) {
            won = true;
            break;
        }
    }
    if (won) {
        game.innerHTML = winMes();
        gameActive = false;
        return;
    }

    const draw = !oTrong.includes("");

    if(draw) {
        game.innerHTML = drawMes();
        gameActive = false;
        return;
    }
    doiLuot();
}

function play(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
    if(oTrong[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    click(clickedCell, clickedCellIndex);
    checkWin();

}


function restartGame() {
    oTrong = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";        
    gameActive = true;
    game.innerHTML = turn();
    document.querySelectorAll('.cell').forEach(bo => bo.textContent = "");
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', play))
document.querySelector('.reset').addEventListener('click', restartGame);
