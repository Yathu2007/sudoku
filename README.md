<div align="center">
    <img src="imgs/Banner.svg">
</div>

<div align="center">
<img alt="GitHub" src="https://img.shields.io/github/license/Yathu2007/sudoku?style=plastic">
<img alt="GitHub issues" src="https://img.shields.io/github/issues/Yathu2007/sudoku?style=plastic">
<img alt="GitHub pull requests" src="https://img.shields.io/github/issues-pr/Yathu2007/sudoku?style=plastic">
<img alt="GitHub forks" src="https://img.shields.io/github/forks/Yathu2007/sudoku?style=plastic">
<img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/Yathu2007/sudoku?style=plastic">
<img alt="GitHub contributors" src="https://img.shields.io/github/contributors/Yathu2007/sudoku?style=plastic">
</div>

---

## 📘 Overview

This mini-project is to demonstrate how the backtracking algorithm can be used to solve a problem (with multiple contraints) like Sudoku. In the case of Sudoku numbers cannot repeat in a row, column or mini-grid

The process of trying possible candidates to the solution and backtracking as soon as it determines that the candidate cannot possibly be completed to a valid solution, is visible via the animation of solving.

### Basic pseudocode template for sudoku backtracking

```c++
get_candidates(state) {
    return candidates // possible candidates at current state
}

solve(state) {
    if (base_case) {
        return true; // base case to return True
    } else if (another_case) {
        return solve(different_state); // several ifs for other types of cases
    } else {
        // try every possibility and backtrack when incorrect
        for candidate in get_candidates(state) {
            state.add(candidate); // modify the grid

            // recurse on the modified grid
            if (solve(state) {
                return true; // this state was solved with the chosen candidate
            } else {
                state.remove(candidate); // undo the change
            }
        }

        // tried all possible candidates,
        // but none solves the problem, so
        return false;
    }
}
```

[Learn more in Wikipedia](https://en.wikipedia.org/wiki/Backtracking)

## 🚀 Preview

<p align="center" width="100%">
    <img width=700px src="imgs/Animation.gif">
</p>

## 🛠️ Installation Steps

1.  Clone the repository

```bash
git clone https://github.com/Yathu2007/sudoku.git
```

2.  Change the working directory

```bash
cd .\sudoku\
```

3.  Install dependencies

```bash
npm install
```

4.  Run the app

```bash
npm start
```

🌟 You are all set!

## 💻 Built with

-   [React JS](https://reactjs.org/)
-   [Material UI](https://mui.com/) - for styling
