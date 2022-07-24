var grids = [];

export default function Backtracking(grid) {
    grids = [];
    solve(grid, 0, 0);
    return grids;
}

// <== Main functions ==>
function solve(grid, row, col) {
    grids.push(JSON.parse(JSON.stringify(grid))); // part of the progress of backtracking animation

    // console.log(grid, row, col);
    if (row === 9) {
        // reached the end of the grid, thus solved
        return true;
    } else if (col === 9) {
        // reached the end of columns,
        // thus move on to the next row
        return solve(grid, row + 1, 0);
    } else if (grid[row][col] !== 0) {
        // the cell is already filled,
        // so move to the next cell
        return solve(grid, row, col + 1);
    } else {
        // try every possibility and backtrack when incorrect
        for (let candidate of getCandidates(grid, row, col)) {
            grid[row][col] = candidate;

            if (solve(grid, row, col + 1)) {
                return true;
            } else {
                grid[row][col] = 0;
            }
        }

        return false;
    }
}

export function validState(grid) {
    const isUnique = (arr) => arr.length === new Set(arr).size;
    const checks = [...getRows(grid), ...getCols(grid), ...getMiniGrids(grid)];

    // check if arr vals are unique
    for (let arr of checks) {
        if (!isUnique(arr)) {
            return false;
        }
    }

    return true;
}

function getCandidates(grid, row, col) {
    const DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    // numbers used up in row
    const usedRow = get_Kth_Row(grid, row);

    // numbers used up in column
    const usedCol = get_Kth_Col(grid, col);

    // numbers used up in current mini grid
    const miniGrid = getCurrMiniGrid(grid, row, col);

    const candidates = DIGITS.filter(
        (x) =>
            x !== 0 &&
            !usedRow.includes(x) &&
            !usedCol.includes(x) &&
            !miniGrid.includes(x)
    );

    return candidates;
}

// <== Helper functions ==>
function get_Kth_Row(grid, k) {
    return grid[k];
}

function getRows(grid) {
    return grid;
}

function get_Kth_Col(grid, k) {
    const kCol = [];

    for (let i = 0; i < 9; i++) {
        kCol.push(grid[i][k]);
    }

    return kCol;
}

function getCols(grid) {
    const cols = [];

    for (let i = 0; i < 9; i++) {
        cols.push(get_Kth_Col(grid, i));
    }

    return cols;
}

function getCurrMiniGrid(grid, row, col) {
    const currMiniGrid = [];

    const [rowLB, rowUB] = [
        Math.floor(row / 3) * 3,
        Math.floor(row / 3) * 3 + 3,
    ];
    const [colLB, colUB] = [
        Math.floor(col / 3) * 3,
        Math.floor(col / 3) * 3 + 3,
    ];

    for (let i = rowLB; i < rowUB; i++) {
        for (let j = colLB; j < colUB; j++) {
            currMiniGrid.push(grid[i][j]);
        }
    }

    return currMiniGrid;
}

function getMiniGrids(grid) {
    const miniGrids = [];

    const indices = [0, 3, 6];

    for (let i of indices) {
        for (let j of indices) {
            miniGrids.push(getCurrMiniGrid(grid, i, j));
        }
    }

    return miniGrids;
}
