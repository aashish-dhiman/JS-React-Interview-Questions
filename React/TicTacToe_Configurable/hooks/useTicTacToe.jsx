import { useState } from "react";

const getInitialBoard = () => Array(9).fill(null);
const useTicTacToe = () => {
    const [board, setBoard] = useState(getInitialBoard());
    const [isXNext, setIsXNext] = useState(true);
    console.log("board: ", board);

    const WINNING_SET = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const handleClick = (idx) => {
        let winner = findWinner(board);
        if (winner || board[idx]) return;

        const newBoard = [...board];
        newBoard[idx] = isXNext ? "X" : "O";
        setBoard(newBoard);
        setIsXNext(!isXNext);
    };

    const resetBoard = () => {
        setBoard(getInitialBoard());
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
        return null;
    };

    return { board, handleClick, resetBoard, getStatusMessage };
};

export default useTicTacToe;
