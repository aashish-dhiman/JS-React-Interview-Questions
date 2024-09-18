/**
 Q. Create a 8*8 grid like chess and generate random points for elephant and camel and make sure they are not same;
  highlight the possible moves of elephant with yellow color;
  highlight the possible moves of camel with blue color;
  and if there is any cell where they may collide, highlight that with red.

  time: 45 minutes
  Asked in INDmoney SDE Intern Frontend Round
 */

import { useEffect, useState } from "react";

function generateGrid(gridSize) {
    // let grid = [];
    // for (let i = 0; i < gridSize; i++) {
    //     let row = [];
    //     for (let j = 0; j < gridSize; j++) {
    //         if ((i + j) % 2 == 0) row.push("white");
    //         else row.push("black");
    //     }
    //     grid.push(row);
    // }
    // return grid;

    // better way avoid looping->
    return Array.from({ length: gridSize }, (_, i) => {
        return Array.from({ length: gridSize }, (_, j) =>
            (i + j) % 2 == 0 ? "white" : "black"
        );
    });
}

function generateRandomPoints() {
    let row = Math.floor(Math.random() * 8);
    let col = Math.floor(Math.random() * 8);
    return [row, col];
}

function generateCamel(elephant) {
    let position;
    // Keep generating new positions for camel until they don't overlap with the elephant
    do {
        position = generateRandomPoints();
    } while (position[0] === elephant[0] && position[1] === elephant[1]);
    return position;
}

function generateDiagonals(n, x, y) {
    const points = [];

    // Add current position
    points.push([x, y]);

    // Calculate possible points in top left direction
    let i = x - 1;
    let j = y - 1;
    while (i >= 0 && j >= 0) {
        points.push([i, j]);
        i--;
        j--;
    }

    // Calculate possible points in top right direction
    i = x - 1;
    j = y + 1;
    while (i >= 0 && j < n) {
        points.push([i, j]);
        i--;
        j++;
    }

    // Calculate possible points in bottom left direction
    i = x + 1;
    j = y - 1;
    while (i < n && j >= 0) {
        points.push([i, j]);
        i++;
        j--;
    }

    // Calculate possible points in bottom right direction
    i = x + 1;
    j = y + 1;
    while (i < n && j < n) {
        points.push([i, j]);
        i++;
        j++;
    }

    // optional for better optimised code => sort and remove duplicates
    // // Sort the points in lexicographical order
    // points.sort((a, b) => a[0] - b[0] || a[1] - b[1]);

    // // Remove duplicates
    // const uniquePoints = [];
    // for (const point of points) {
    //     if (!uniquePoints.some((p) => p[0] === point[0] && p[1] === point[1])) {
    //         uniquePoints.push(point);
    //     }
    // }
    return points;
}

export default function ChessBoardExtended() {
    const gridSize = 8;
    const [board, setBoard] = useState(generateGrid(gridSize) || []);
    console.log("board: ", board);
    const [elephant, setElephant] = useState(generateRandomPoints() || []);
    const [camel, setCamel] = useState(generateCamel(elephant) || []);
    const [diagonals, setDiagonals] = useState([]);

    useEffect(() => {
        const diagonals = generateDiagonals(gridSize, camel[0], camel[1]);
        setDiagonals(diagonals);
    }, [camel]);

    // function to check if the grid cell is part of diagonals/ possible move of camel
    const findIntersection = (i, j) => {
        return diagonals.some((point) => point[0] === i && point[1] === j);
    };

    return (
        <div className="w-fit mx-auto p-10">
            {board?.map((row, i) => {
                return (
                    <div key={i} className="flex item-center flex-col ">
                        <div className="flex items-center">
                            {row.map((item, j) => {
                                const isElephant =
                                    i === elephant[0] || j === elephant[1];
                                const isCamel =
                                    i === camel[0] && j === camel[1];
                                const isDiagonal = findIntersection(i, j);
                                const isOverlapping =
                                    isElephant && findIntersection(i, j);
                                const bgColor = isOverlapping
                                    ? "bg-red-500"
                                    : isDiagonal
                                    ? "bg-blue-700"
                                    : isElephant
                                    ? "bg-yellow-600"
                                    : "";

                                return (
                                    <div
                                        key={j}
                                        className={`${bgColor} w-16 h-16 border border-black text-sm`}
                                    >
                                        {i === elephant[0] && j === elephant[1]
                                            ? "Elephant"
                                            : i === camel[0] && j === camel[1]
                                            ? "Camel"
                                            : ""}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
            <div className="flex items-center mt-3 justify-center">
                <button
                    className="border p-2 border-black"
                    onClick={() => {
                        let elephant = generateRandomPoints();
                        setElephant(elephant);
                        setCamel(generateCamel(elephant));
                    }}
                >
                    Reset
                </button>
            </div>
        </div>
    );
}
