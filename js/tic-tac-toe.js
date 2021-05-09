const cell00 = document.querySelector('.cell00');
const cell01 = document.querySelector('.cell01');
const cell02 = document.querySelector('.cell02');
const cell10 = document.querySelector('.cell10');
const cell11 = document.querySelector('.cell11');
const cell12 = document.querySelector('.cell12');
const cell20 = document.querySelector('.cell20');
const cell21 = document.querySelector('.cell21');
const cell22 = document.querySelector('.cell22');
const resultNotifier = document.querySelector('.result-notifier');
const turnInformer = document.querySelector('.turn-informer');
const resetBtn = document.querySelector('.reset-btn');
let oWinCount = document.querySelector('.o-win-count');
let xWinCount = document.querySelector('.x-win-count');
let oWinCountVal = 0;
let xWinCountVal = 0;
const cells = [[cell00, cell01, cell02],
[cell10, cell11, cell12],
[cell20, cell21, cell22]];
const NUMROWS = 3;
let turn = 'O';

function check(turn) {
    //세로
    for (let i = 0; i < NUMROWS; ++i) {
        if (cells[0][i].textContent === cells[1][i].textContent &&
            cells[1][i].textContent === cells[2][i].textContent &&
            turn === cells[0][i].textContent)
            return true;
    }

    //가로
    for (let i = 0; i < NUMROWS; ++i) {
        if (cells[i][0].textContent === cells[i][1].textContent &&
            cells[i][1].textContent === cells[i][2].textContent &&
            turn === cells[i][0].textContent)
            return true;
    }

    //대각선
    if (cells[0][0].textContent === cells[1][1].textContent &&
        cells[1][1].textContent === cells[2][2].textContent &&
        cells[0][0].textContent === turn)
        return true;
    if (cells[0][2].textContent === cells[1][1].textContent &&
        cells[2][0].textContent === cells[1][1].textContent &&
        cells[0][2].textContent === turn)
        return true;
    return false;
}

function resetBoard() {
    cells.forEach(arr => arr.forEach(cell => cell.textContent = ""));
}

function isFull() {
    for (let i = 0; i < NUMROWS; ++i) {
        for (let j = 0; j < NUMROWS; ++j) {
            if (cells[i][j].textContent === "")
                return false;
        }
    }
    return true;
}

function handleClick(event) {
    const cell = event.target;

    if (cell.textContent === "") {
        cell.textContent = turn;
        if (check(turn)) {
            resultNotifier.textContent = `${turn} wins!`;
            if (turn === 'O') {
                oWinCount.value = `${++oWinCountVal}`;
            }
            else {
                xWinCount.value = `${++xWinCountVal}`;
            }
            resetBoard();
        }
        else if (isFull()) {
            resetBoard();
            resultNotifier.textContent = "It's a draw!";
        }
        turn = (turn === 'O') ? 'X' : 'O';
        turnInformer.textContent = `It's ${turn} 's turn`;
    }
    else {
        resultNotifier.textContent = 'cell was already chosen';
    }
}

turnInformer.textContent = `It's O 's turn`;
for (let i = 0; i < NUMROWS; ++i) {
    for (let j = 0; j < NUMROWS; ++j) {
        cells[i][j].addEventListener('click', handleClick);
    }
}

resetBtn.addEventListener('click', () => {
    oWinCountVal = 0;
    xWinCountVal = 0;
    oWinCount.value = `0`;
    xWinCount.value = `0`;
});
