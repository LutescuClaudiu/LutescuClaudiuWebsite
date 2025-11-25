
let cells = Array(9).fill(null);
let human = "X";
let ai = "O";
let turn = "X";
let gameOver = false;

let score = { wins: 0, losses: 0, draws: 0 };

const winningLines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

const boardEl = document.getElementById("board");
const statusEl = document.getElementById("status");
const difficultyEl = document.getElementById("difficulty");
const restartBtn = document.getElementById("restart");
const chooseXBtn = document.getElementById("chooseX");
const chooseOBtn = document.getElementById("chooseO");
const scoreEl = document.getElementById("score");

function createBoard() {
    boardEl.innerHTML = "";
    for (let i = 0; i < 9; i++) {
        const div = document.createElement("div");
        div.className = "ttt-cell";
        div.dataset.index = i;
        div.addEventListener("click", onCellClick);
        boardEl.appendChild(div);
    }
}

function render() {
    const cellEls = boardEl.querySelectorAll(".ttt-cell");
    cellEls.forEach((cell, i) => {
        cell.textContent = cells[i] || "";
        cell.classList.remove("win");
    });

    if (!gameOver) {
        statusEl.textContent = turn === human ? "Your move" : "AI's move";
    } else {
        const winner = getWinner(cells);
        if (winner === human) statusEl.textContent = "You win!";
        else if (winner === ai) statusEl.textContent = "AI wins!";
        else statusEl.textContent = "Draw!";
    }

    scoreEl.textContent = `Wins: ${score.wins} | Losses: ${score.losses} | Draws: ${score.draws}`;
}

function onCellClick(e) {
    const idx = Number(e.currentTarget.dataset.index);

    if (gameOver || turn !== human || cells[idx]) return;

    makeMove(idx, human);

    if (!gameOver) setTimeout(aiTurn, 300);
}

function makeMove(idx, mark) {
    cells[idx] = mark;

    const winner = getWinner(cells);
    const full = cells.every(Boolean);

    if (winner || full) {
        gameOver = true;
        if (winner === human) score.wins++;
        else if (winner === ai) score.losses++;
        else score.draws++;
    } else {
        turn = turn === "X" ? "O" : "X";
    }

    render();
}

function getWinner(board) {
    for (const [a,b,c] of winningLines) {
        if (board[a] && board[a] === board[b] && board[a] === board[c])
            return board[a];
    }
    return null;
}

function aiTurn() {
    if (gameOver) return;

    turn = ai;
    render();

    const difficulty = difficultyEl.value;

    let move;

    if (difficulty === "easy") {
        move = randomMove();
    } else if (difficulty === "medium") {
        move = findWinningMove(ai) || findWinningMove(human) || randomMove();
    } else {
        move = bestMove();
    }

    makeMove(move, ai);
}

function randomMove() {
    const available = cells.map((v,i) => v ? null : i).filter(i => i !== null);
    return available[Math.floor(Math.random() * available.length)];
}

function findWinningMove(player) {
    for (let i = 0; i < 9; i++) {
        if (!cells[i]) {
            cells[i] = player;
            if (getWinner(cells) === player) {
                cells[i] = null;
                return i;
            }
            cells[i] = null;
        }
    }
    return null;
}

function bestMove() {
    const boardCopy = cells.slice();
    const result = minimax(boardCopy, 0, true);
    return result.index;
}

function minimax(board, depth, isAITurn) {
    const winner = getWinner(board);
    if (winner === ai) return { score: 10 - depth };
    if (winner === human) return { score: depth - 10 };
    if (board.every(Boolean)) return { score: 0 };

    const moves = [];
    for (let i = 0; i < 9; i++) {
        if (!board[i]) {
            board[i] = isAITurn ? ai : human;
            const result = minimax(board, depth + 1, !isAITurn);
            moves.push({ index: i, score: result.score });
            board[i] = null;
        }
    }

    return isAITurn
        ? moves.reduce((a,b)=>a.score > b.score ? a : b)
        : moves.reduce((a,b)=>a.score < b.score ? a : b);
}

restartBtn.addEventListener("click", () => restart());
chooseXBtn.addEventListener("click", () => { human="X"; ai="O"; restart(); });
chooseOBtn.addEventListener("click", () => { human="O"; ai="X"; restart(); });

function restart() {
    cells = Array(9).fill(null);
    gameOver = false;
    turn = "X";
    createBoard();
    render();
}

createBoard();
render();
