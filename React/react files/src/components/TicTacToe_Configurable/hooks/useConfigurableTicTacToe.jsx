import { useState } from "react";

const getInitialBoard = (size) => Array(size * size).fill(null);

const generateWinningSets = (n) => {
    const winningSets = [];

    // Rows
    for (let row = 0; row < n; row++) {
        const rowSet = [];
        for (let col = 0; col < n; col++) {
            rowSet.push(row * n + col);
        }
        winningSets.push(rowSet);
    }

    // Columns
    for (let col = 0; col < n; col++) {
        const colSet = [];
        for (let row = 0; row < n; row++) {
            colSet.push(row * n + col);
        }
        winningSets.push(colSet);
    }

    // Main diagonal (top-left to bottom-right)
    const mainDiagonal = [];
    for (let i = 0; i < n; i++) {
        mainDiagonal.push(i * n + i);
    }
    winningSets.push(mainDiagonal);

    // Anti-diagonal (top-right to bottom-left)
    const antiDiagonal = [];
    for (let i = 0; i < n; i++) {
        antiDiagonal.push(i * n + (n - 1 - i));
    }
    winningSets.push(antiDiagonal);

    return winningSets;
};

const useConfigurableTicTacToe = () => {
    const [boardSize, setBoardSize] = useState(4);
    const [board, setBoard] = useState(getInitialBoard(boardSize));
    const [isXNext, setIsXNext] = useState(true);

    const WINNING_SET = generateWinningSets(boardSize);

    const handleClick = (idx) => {
        let winner = findWinner(board);
        if (winner || board[idx]) return;

        const newBoard = [...board];
        newBoard[idx] = isXNext ? "X" : "O";
        setBoard(newBoard);
        setIsXNext(!isXNext);
    };

    const resetBoard = () => {
        setBoard(getInitialBoard(boardSize));
        setIsXNext(true);
    };

    const getStatusMessage = () => {
        let winner = findWinner(board);
        if (winner) {
            return `Player ${winner} wins!`;
        }
        if (!board.includes(null)) {
            return " Match Tied!";
        }
        return isXNext ? "Player X turn!" : "Player Y turn!";
    };

    const findWinner = (board) => {
        for (const set of WINNING_SET) {
            const first = board[set[0]];

            // Skip if the first element is empty (no player move)
            if (!first) continue;

            // Check if all elements in the current winning set are the same
            const isWinningSet = set.every((index) => board[index] === first);

            if (isWinningSet) {
                return first; // Return the player who won (either 'X' or 'O')
            }
        }

        return null; // No winner
    };

    return {
        board,
        handleClick,
        resetBoard,
        getStatusMessage,
        boardSize,
        setBoardSize,
    };
};

export default useConfigurableTicTacToe;
