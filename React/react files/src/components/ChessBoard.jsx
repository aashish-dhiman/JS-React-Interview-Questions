import { useState } from "react";

const createBoard = (size) => {
    const newBoard = [];
    for (let i = 0; i < size; i++) {
        const row = [];
        for (let j = 0; j < size; j++) {
            row.push((i + j) % 2 === 0 ? "white" : "black");
        }
        newBoard.push(row);
    }
    return newBoard;
};

const ChessBoard = () => {
    const size = 8;
    const [board] = useState(createBoard(size));
    console.log('board: ', board);

    return (
        <div className="flex flex-col items-center justify-center">
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className="flex border border-black">
                    {row.map((cellColor, colIndex) => (
                        <div
                            key={colIndex}
                            className={`w-10 h-10 ${
                                cellColor === "white"
                                    ? "bg-gray-200"
                                    : "bg-black"
                            }`}
                        ></div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default ChessBoard;
