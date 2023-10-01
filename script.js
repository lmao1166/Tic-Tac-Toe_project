const game = document.querySelector('.gameStatus');

let gameActive = true;
let randomPlayer = ["X", "O"];
let n = Math.random();
if(n > 0.5)
    n = 1;
else
    n = 0;
let currentPlayer = randomPlayer[n];
let oTrong = ["", "", "", "", "", "", "", "", ""];

let winMes = () =>`Player ${currentPlayer} win`;
let turn = () =>`It's player ${currentPlayer} turn`;
let drawMes = () => "Draw!!"

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
    currentPlayer =  currentPlayer === "X" ? "O" : X;
    luotDi.innerHTML = turn();
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
            gameActive = false;
            game.innerHTML = winMes();
            break;
        }
        const draw = !oTrong.includes("");
        if(draw) {
            game.innerHTML = drawMes();
            gameActive = false;
            return;
        }
    }


}
