const cells = document.querySelectorAll(".cell");
const message = document.getElementById("message");
const resetBtn = document.getElementById("resetBtn");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleClick(e) {
    const cell = e.target;
    const index = cell.getAttribute("data-index");

    if (board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add("taken");

    if (checkWin()) {
    message.textContent = `🎉 Player ${currentPlayer} Wins!`;
    message.style.color = "#00ff85";
    gameActive = false;
    highlightWin();
    } else if (board.every(cell => cell !== "")) {
    message.textContent = "🤝 It's a Draw!";
    message.style.color = "#ffcc33";
    gameActive = false;
    } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    message.textContent = `Player ${currentPlayer}’s Turn`;
    }
}

function checkWin() {
    return winningCombinations.some(combo => {
    const [a, b, c] = combo;
    return (
        board[a] &&
        board[a] === board[b] &&
        board[a] === board[c]
    );
    });
}

function highlightWin() {
    winningCombinations.forEach(combo => {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        [a, b, c].forEach(i => {
        cells[i].style.background = "rgba(0,255,180,0.3)";
        cells[i].style.boxShadow = "0 0 15px #00ff85";
        });
    }
    });
}

function resetGame() {
    board.fill("");
    cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("taken");
    cell.style.background = "rgba(0,255,180,0.05)";
    cell.style.boxShadow = "none";
    });
    currentPlayer = "X";
    message.textContent = "Player X’s Turn";
    message.style.color = "#00ffb3";
    gameActive = true;
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
resetBtn.addEventListener("click", resetGame);