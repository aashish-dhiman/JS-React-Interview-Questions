/* eslint-disable react/prop-types */
import { useState } from "react";

// Define snakes and ladders positions
const snakesAndLadders = {
    16: 6,
    47: 26,
    49: 11,
    56: 63,
    62: 19,
    64: 60,
    87: 24,
    93: 73,
    95: 75,
    98: 78,
    1: 38,
    4: 14,
    9: 31,
    21: 42,
    28: 84,
    36: 44,
    51: 67,
    71: 91,
    80: 100,
};

// Component to render a single square
const Square = ({ number, playerXPosition, playerYPosition }) => {
    const isXHere = playerXPosition === number;
    const isYHere = playerYPosition === number;
    return (
        <div
            className={`w-16 h-16 flex flex-col items-center justify-center border text-xs ${
                isXHere
                    ? "bg-blue-500 text-white"
                    : isYHere
                    ? "bg-red-600 text-white"
                    : ""
            }`}
        >
            <div>{isXHere ? "X" : isYHere ? "Y" : number}</div>
            <div>
                {snakesAndLadders[number] &&
                    (snakesAndLadders[number] > number
                        ? "Ladder-" + snakesAndLadders[number]
                        : "Snake-" + snakesAndLadders[number])}
            </div>
        </div>
    );
};

// The game component
const SnakeLadderGame = () => {
    const [diceValue, setDiceValue] = useState(null);
    const [XPosition, setXPosition] = useState(null);
    const [YPosition, setYPosition] = useState(null);
    const [winner, setWinner] = useState(null);
    const [isXTurn, setIsXTurn] = useState(true);

    // Function to roll the dice
    const rollDice = () => {
        const roll = Math.floor(Math.random() * 6) + 1;
        setDiceValue(roll);

        // Determine current player position and set function
        const currentPosition = isXTurn ? XPosition : YPosition;
        const setPosition = isXTurn ? setXPosition : setYPosition;
        const player = isXTurn ? "Player X" : "Player Y";

        let newPosition = currentPosition + roll;
        if (newPosition > 100) return; // Prevent moving if roll exceeds 100

        // Check for snake or ladder exists at new position
        newPosition = snakesAndLadders[newPosition] || newPosition;

        setPosition(newPosition);

        // Check for win
        if (newPosition === 100) {
            setWinner(`${player} Wins!!!`);
        }

        // Toggle turn
        setIsXTurn(!isXTurn);
    };

    function getStatusMessage() {
        if (winner) return winner;
        return isXTurn ? "Player X Turn!" : "Player Y Turn!";
    }

    // Render the board
    const renderBoard = () => {
        const squares = [];
        for (let i = 100; i > 0; i--) {
            squares.push(
                <Square
                    key={i}
                    number={i}
                    playerXPosition={XPosition}
                    playerYPosition={YPosition}
                />
            );
        }
        return squares;
    };

    function handleReset() {
        setDiceValue(null);
        setXPosition(null);
        setYPosition(null);
        setWinner(null);
        setIsXTurn(true);
    }
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-xl font-bold">Snake and Ladder Game</h1>
            <div className="mt-2">
                <h2 className="text-green-500 font-bold">
                    {getStatusMessage()}
                </h2>
            </div>

            <div className="grid grid-cols-10 gap-0.5 mt-4">
                {renderBoard()}
            </div>

            <div className="mt-4 flex gap-3 items-center">
                <button
                    onClick={rollDice}
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                    disabled={winner}
                >
                    Roll Dice
                </button>
                <p>
                    Dice Rolled: <strong>{diceValue}</strong>
                </p>
            </div>

            {/* reset button */}
            <button
                onClick={handleReset}
                className="px-3 py-1 bg-red-500 text-white rounded mt-3"
            >
                Reset Match
            </button>
        </div>
    );
};

export default SnakeLadderGame;
