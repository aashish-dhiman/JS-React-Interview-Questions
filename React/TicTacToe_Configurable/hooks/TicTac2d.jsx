import { useState } from "react";

const getInitialBoard = () => [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

const useTicTacToe = () => {
    const [board, setBoard] = useState(getInitialBoard());
    const [isXNext, setIsXNext] = useState(true);
    console.log("board: ", board);

    const WINNING_SET = [
        [
            [0, 0],
            [0, 1],
            [0, 2],
        ],
        [
            [1, 0],
            [1, 1],
            [1, 2],
        ],
        [
            [2, 0],
            [2, 1],
            [2, 2],
        ],
        [
            [0, 0],
            [1, 0],
            [2, 0],
        ],
        [
            [0, 1],
            [1, 1],
            [2, 1],
        ],
        [
            [0, 2],
            [1, 2],
            [2, 2],
        ],
        [
            [0, 0],
            [1, 1],
            [2, 2],
        ],
        [
            [0, 2],
            [1, 1],
            [2, 0],
        ],
    ];

    const handleClick = (row, col) => {
        let winner = findWinner(board);
        if (winner || board[row][col]) return;

        const newBoard = board.map((r, i) =>
            r.map((cell, j) =>
                i === row && j === col ? (isXNext ? "X" : "O") : cell
            )
        );
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
        if (board.every((row) => row.every((cell) => cell !== null))) {
            return " Match Tied!";
        }
        return isXNext ? "Player X turn!" : "Player O turn!";
    };

    const findWinner = (board) => {
        for (const set of WINNING_SET) {
            const first = board[set[0][0]][set[0][1]];

            if (!first) continue;

            const isWinningSet = set.every(
                ([row, col]) => board[row][col] === first
            );

            if (isWinningSet) {
                return first; // Return the player who won (either 'X' or 'O')
            }
        }
        return null;
    };

    return { board, handleClick, resetBoard, getStatusMessage };
};

export default useTicTacToe;
