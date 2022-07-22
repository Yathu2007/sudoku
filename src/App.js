import Board from "./components/Board";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

export default function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <main>
                <div className="game">
                    <h1>SUDOKU</h1>
                    <div className="sudokuBoard">
                        <Board />
                    </div>
                </div>
            </main>
        </ThemeProvider>
    );
}
