import React from "react";

// puzzle generation
import RandomPuzzle from "../puzzle/RandomPuzzle";

// Components
import Status from "./Status";
import Square from "./Square";
import ButtonControls from "./ButtonControls";

// Sudoku backtracker
import Backtracking from "../Backtracking";
import { validState } from "../Backtracking";

// MUI Components
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

export default class Board extends React.Component {
    constructor(props) {
        super(props);

        const initialPuzzle = RandomPuzzle();

        this.state = {
            boardState: this.getDeepCopy(initialPuzzle),
            initialPuzzle: initialPuzzle,
            displayState: null,
            engineStarted: false,
            switchChecked: true,
            verifyDisabled: true,
        };
    }

    getDeepCopy(arr) {
        return JSON.parse(JSON.stringify(arr));
    }

    handleChange(e, row, col) {
        const val = parseInt(e.target.value) || 0;
        const boardStateArr = this.getDeepCopy(this.state.boardState);
        // console.log(val, row, col);

        if (val === 0 || (val >= 1 && val <= 9)) {
            boardStateArr[row][col] = val;
        }

        this.setState({ boardState: boardStateArr });

        if (boardStateArr.toString().includes(0)) {
            this.setState({ verifyDisabled: true });
        } else {
            this.setState({ verifyDisabled: false });
        }
    }

    // create a board of Square components
    genBoard() {
        const board = [];
        const boardState = this.state.boardState;

        for (let i = 0; i < boardState.length; i++) {
            let row = [];

            for (let j = 0; j < boardState.length; j++) {
                const val = boardState[i][j];

                let newSquare = (
                    <td
                        key={"" + i + j}
                        className={(j + 1) % 3 === 0 ? "colBorder" : ""}
                    >
                        <Square
                            value={val !== 0 ? val : ""}
                            onChange={(e) => this.handleChange(e, i, j)}
                            key={"" + i + j}
                            disabled={
                                val !== 0 &&
                                val === this.state.initialPuzzle[i][j]
                            }
                            readOnly={this.state.engineStarted}
                        />
                    </td>
                );
                row.push(newSquare);
            }

            board.push(
                <tr key={i} className={(i + 1) % 3 === 0 ? "rowBorder" : ""}>
                    {row}
                </tr>
            );
        }

        return board;
    }

    // The 3 button controls section -->
    newGame() {
        // generate a new puzzle
        const newPuzzle = RandomPuzzle();

        this.setState({
            boardState: newPuzzle,
            initialPuzzle: newPuzzle,
            displayState: null,
            verifyDisabled: true,
        });
        this.genBoard();
    }

    verifyPuzzle() {
        // check if the puzzle has been correctly solved
        const currBoard = this.getDeepCopy(this.state.boardState);

        if (validState(currBoard)) {
            this.setState({
                boardState: currBoard,
                displayState: true,
            });
        } else {
            this.setState({
                boardState: currBoard,
                displayState: false,
            });
        }
    }

    async visualizer(grids) {
        for (const grid of grids) {
            this.setState({ boardState: grid });
            await new Promise((resolve) => setTimeout(resolve, 20));
        }
        this.setState({ engineStarted: false });
    }

    solve() {
        // backtracking
        this.setState({
            boardState: this.getDeepCopy(this.state.initialPuzzle),
            displayState: "solver",
            engineStarted: true,
            verifyDisabled: true,
        });

        const grids = Backtracking(this.getDeepCopy(this.state.initialPuzzle));

        console.log(grids);

        if (this.state.switchChecked) {
            this.visualizer(grids);
        } else {
            this.setState({ boardState: grids[grids.length - 1] });
            this.setState({ engineStarted: false });
        }
    }

    renderLabel() {
        if (this.state.displayState !== null) {
            return <Status displayState={this.state.displayState} />;
        }
    }

    // Render section -->
    render() {
        const board = this.genBoard();

        return (
            <div>
                <table>
                    <tbody>{board}</tbody>
                </table>

                <ButtonControls
                    newGame={() => this.newGame()}
                    verify={() => this.verifyPuzzle()}
                    solve={() => this.solve()}
                    disabled={this.state.engineStarted}
                    verifyDisabled={this.state.verifyDisabled}
                />

                <FormControlLabel
                    control={
                        <Switch
                            defaultChecked
                            onChange={() =>
                                this.setState({
                                    switchChecked: !this.state.switchChecked,
                                })
                            }
                        />
                    }
                    label="Show backtracking animation when solving"
                />

                {this.renderLabel()}
            </div>
        );
    }
}
