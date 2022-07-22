import puzzles from "./Puzzles";

export default function RandomPuzzle() {
    const newPuzzle = puzzles[Math.floor(Math.random() * 100)];
    const someBoard = [];

    let row = 0;

    while (row < 81) {
        someBoard.push(
            Array.from(newPuzzle.slice(row, row + 9).split(""), Number)
        );
        row += 9;
    }

    return someBoard;
}
