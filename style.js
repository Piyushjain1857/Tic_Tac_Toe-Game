const cells = document.querySelectorAll(".cell");
const message = document.getElementById("message");
const scoreXElement = document.getElementById("scoreX");
const scoreOElement = document.getElementById("scoreO");
const playerXCard = document.querySelector(".score-card.player-x");
const playerOCard = document.querySelector(".score-card.player-o");

const modalOverlay = document.getElementById("modalOverlay");
const modalTitle = document.getElementById("modalTitle");
const modalSubtitle = document.getElementById("modalSubtitle");
const replayBtn = document.getElementById("replayBtn");
let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
let scoreX = 0;
let scoreO = 0;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

function updateActivePlayerUI() {
    if (currentPlayer === "X") {
        playerXCard.classList.add("active");
        playerOCard.classList.remove("active");
    } else {
        playerOCard.classList.add("active");
        playerXCard.classList.remove("active");
    }
}

function handleClick(e) {
    const cell = e.target;
    const index = cell.getAttribute("data-index");

    if (board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add("taken", currentPlayer.toLowerCase());

    checkResult();
}

function checkResult() {
    let roundWon = false;
    let winningCombo = [];

    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            winningCombo = [a, b, c];
            break;
        }
    }

    if (roundWon) {
        message.textContent = "Game Over";
        gameActive = false;
        
        // Update Score
        if (currentPlayer === "X") {
            scoreX++;
            scoreXElement.textContent = scoreX;
            modalTitle.textContent = "Player X Wins! 🎉";
            modalTitle.style.color = "var(--primary-color)";
        } else {
            scoreO++;
            scoreOElement.textContent = scoreO;
            modalTitle.textContent = "Player O Wins! 🎉";
            modalTitle.style.color = "var(--secondary-color)";
        }
        
        modalSubtitle.textContent = "Great job, you outsmarted your opponent!";
        setTimeout(() => modalOverlay.classList.add("show"), 400);

        // Highlight winning cells
        winningCombo.forEach(index => {
            cells[index].classList.add("win");
        });

        // Remove active state from scoreboards
        playerXCard.classList.remove("active");
        playerOCard.classList.remove("active");
        return;
    }

    if (!board.includes("")) {
        message.textContent = "Game Over";
        gameActive = false;
        playerXCard.classList.remove("active");
        playerOCard.classList.remove("active");
        
        modalTitle.textContent = "It's a Draw! 🤝";
        modalTitle.style.color = "var(--draw-color)";
        modalSubtitle.textContent = "A fiercely fought battle with no clear victor.";
        setTimeout(() => modalOverlay.classList.add("show"), 400);
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    message.textContent = `Player ${currentPlayer}'s Turn`;
    message.style.color = "var(--text-primary)";
    updateActivePlayerUI();
}

function resetGame() {
    modalOverlay.classList.remove("show");
    board.fill("");
    gameActive = true;
    currentPlayer = "X";
    
    cells.forEach(cell => {
        cell.textContent = "";
        cell.className = "cell"; // Reset to default class
    });

    message.textContent = "Player X's Turn";
    message.style.color = "var(--text-primary)";
    
    updateActivePlayerUI();
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
replayBtn.addEventListener("click", resetGame);

// Initialize UI
updateActivePlayerUI();