const cells = document.querySelectorAll(".cell");
const statusCurr = document.getElementById("status");
const restartbtn = document.getElementById("restartbtn");
const modeToggle = document.getElementById("modeToggle");
const modeText = document.getElementById("modeText");

function myfunc(){
	var x=document.getElementById("mytopnav");
	if(x.className === "topnav"){
		x.className += " responsive";
	}
	else{
		x.className= "topnav";
	}
}


const winCondi = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];
var options = ["", "", "", "", "", "", "", "", ""];
var currentPlayer = "X";
var running = false;
var vsComputer = false;

modeToggle.addEventListener("change", () => {
    vsComputer = modeToggle.checked;
    modeText.textContent = vsComputer ? "VS Computer" : "Two Players";
    restartGame();
});

initializeGame();

function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartbtn.addEventListener("click", restartGame);
    statusCurr.textContent = `${currentPlayer}'s turn`;
    running = true;
}

function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex");
    if (options[cellIndex] != "" || !running) {
        return;
    }
    updateCell(this, cellIndex);
    checkWinner();
    if (vsComputer && running) {
        setTimeout(computerMove, 500);
    }
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer() {
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
    statusCurr.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
    var roundWon = false;
    for (var i = 0; i < winCondi.length; i++) {
        const condition = winCondi[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];
        if (cellA === "" || cellB === "" || cellC === "") {
            continue;
        }
        if (cellA === cellB && cellB === cellC) {
            roundWon = true;
            break;
        }
    }
    if (roundWon) {
        statusCurr.textContent = `${currentPlayer} has Won!!`;
        running = false;
    } else if (!options.includes("")) {
        statusCurr.textContent = `It's A Draw`;
        running = false;
    } else {
        changePlayer();
    }
}

function computerMove() {
    let emptyCells = [];
    cells.forEach((cell, index) => {
        if (options[index] === "") {
            emptyCells.push(cell);
        }
    });
    if (emptyCells.length > 0) {
        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        const cellIndex = randomCell.getAttribute("cellIndex");
        updateCell(randomCell, cellIndex);
        checkWinner();
    }
}

function restartGame() {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusCurr.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}
