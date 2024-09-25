/* eslint-disable react/prop-types */

const GridBorderDiagonal = ({ size = 8 }) => {
    const isBorder = (i, j) => {
        return i === 0 || j === 0 || i === size - 1 || j === size - 1;
    };

    const isDiagonal = (i, j) => {
        return i === j || i + j === size - 1;
    };

    const getCellColor = (i, j) => {
        if (isBorder(i, j) && isDiagonal(i, j)) {
            return "bg-red-500"; // Red for overlapping border and diagonal
        } else if (isBorder(i, j)) {
            return "bg-blue-500"; // Blue for border
        } else if (isDiagonal(i, j)) {
            return "bg-black"; // Black for diagonal
        } else {
            return "bg-white"; // Default background color
        }
    };

    return (
        <div className="">
            {Array.from({ length: size }).map((_, rowIndex) => (
                <div key={rowIndex} className="flex">
                    {Array.from({ length: size }).map((_, colIndex) => (
                        <div
                            key={colIndex}
                            className={`w-16 h-16 border border-gray-300 ${getCellColor(
                                rowIndex,
                                colIndex
                            )}`}
                        ></div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default GridBorderDiagonal;
