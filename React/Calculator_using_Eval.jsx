import { useState } from "react";

function Calculator() {
    const [expression, setExpression] = useState("");

    const handleClick = (value) => {
        if (value === "C") {
            setExpression("");
        } else if (value === "=") {
            try {
                setExpression(eval(expression).toString());
            } catch (e) {
                setExpression("Error");
            }
        } else {
            setExpression(expression + value);
        }
    };

    return (
        <div
            className="max-w-sm border flex flex-col w-full items-center
        justify-center"
        >
            <div className="border p-1 w-full bg-gray-100">
                <input
                    type="text"
                    value={expression}
                    readOnly
                    className="w-full outline-none"
                />
            </div>
            <div className="flex flex-col w-full">
                <div className="w-full flex items-center justify-evenly gap-1">
                    <button
                        className="flex-1 border"
                        onClick={() => handleClick("1")}
                    >
                        1
                    </button>
                    <button
                        className="flex-1 border"
                        onClick={() => handleClick("2")}
                    >
                        2
                    </button>
                    <button
                        className="flex-1 border"
                        onClick={() => handleClick("3")}
                    >
                        3
                    </button>
                    <button
                        className="flex-1 border"
                        onClick={() => handleClick("+")}
                    >
                        +
                    </button>
                </div>
                <div className="w-full flex items-center justify-evenly gap-1">
                    <button
                        className="flex-1 border"
                        onClick={() => handleClick("4")}
                    >
                        4
                    </button>
                    <button
                        className="flex-1 border"
                        onClick={() => handleClick("5")}
                    >
                        5
                    </button>
                    <button
                        className="flex-1 border"
                        onClick={() => handleClick("6")}
                    >
                        6
                    </button>
                    <button
                        className="flex-1 border"
                        onClick={() => handleClick("-")}
                    >
                        -
                    </button>
                </div>
                <div className="w-full flex items-center justify-evenly gap-1">
                    <button
                        className="flex-1 border"
                        onClick={() => handleClick("7")}
                    >
                        7
                    </button>
                    <button
                        className="flex-1 border"
                        onClick={() => handleClick("8")}
                    >
                        8
                    </button>
                    <button
                        className="flex-1 border"
                        onClick={() => handleClick("9")}
                    >
                        9
                    </button>
                    <button
                        className="flex-1 border"
                        onClick={() => handleClick("*")}
                    >
                        *
                    </button>
                </div>
                <div className="w-full flex items-center justify-evenly gap-1">
                    <button
                        className="flex-1 border"
                        onClick={() => handleClick("C")}
                    >
                        C
                    </button>
                    <button
                        className="flex-1 border"
                        onClick={() => handleClick("0")}
                    >
                        0
                    </button>
                    <button
                        className="flex-1 border"
                        onClick={() => handleClick("=")}
                    >
                        =
                    </button>
                    <button
                        className="flex-1 border"
                        onClick={() => handleClick("/")}
                    >
                        /
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Calculator;
