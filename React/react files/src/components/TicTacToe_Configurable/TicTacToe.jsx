import useConfigurableTicTacToe from "./hooks/useConfigurableTicTacToe";
import useTicTacToe from "./hooks/useTicTacToe";

const TicTacToe = () => {
    // const { board, getStatusMessage, resetBoard, handleClick, boardSize } =
    //     useConfigurableTicTacToe();
    const { board, getStatusMessage, resetBoard, handleClick } =
        useTicTacToe();

    return (
        <div className="max-w-2xl mx-auto space-y-4">
            <div className="flex items-center justify-between max-w-xs mx-auto">
                <div className="bg-blue-300 p-2 rounded-xl">
                    {getStatusMessage()}
                </div>
                <button
                    className="border p-1"
                    onClick={() => resetBoard()}
                    disabled={board.every((item) => item === null)}
                >
                    Reset Game
                </button>
            </div>
            <div
                className={`grid grid-cols-3 grid-rows-3 place-items-center w-[300px] mx-auto h-[300px] border border-black`}
            >
                {board?.map((box, i) => {
                    return (
                        <button
                            key={i}
                            className="w-full h-full border border-black cursor-pointer"
                            onClick={() => handleClick(i)}
                            disabled={box !== null}
                        >
                            {box}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default TicTacToe;
