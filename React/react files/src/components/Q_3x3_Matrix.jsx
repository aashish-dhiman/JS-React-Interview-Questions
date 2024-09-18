/* 
Q. Consider a configurable 3x3 matrix of boxes. Configurable means the boxes can be arranged in any fashion given the same 3x3 matrix. 
On Clicking of boxes , they are filled with green color
On clicking after all the boxes, they are turned back to white in the same order in which they have clicked with a 500 ms delay 

** Asked in INDmoney SDE Intern Frontend Machine Coding Round
*/
import { useState } from "react";

export default function Matrix() {
    const [changed, setChanged] = useState([]);
    const [isDeactivating, setIsDeactivating] = useState(false);

    const matrixSize = 9;
    const arr = Array.from({ length: matrixSize }, (_, idx) => idx + 1);

    const revertColors = () => {
        setIsDeactivating(true);
        let timer = setInterval(() => {
            setChanged((prev) => {
                let newArr = [...prev];
                newArr = newArr.slice(1);
                if (newArr.length === 0) {
                    clearInterval(timer);
                    setIsDeactivating(false);
                }
                return newArr;
            });
        }, 500);
    };

    const changeColor = (id) => {
        if (!changed.includes(id)) {
            const newChanged = [...changed, id];
            setChanged(newChanged);

            if (newChanged.length === matrixSize) {
                revertColors();
            }
        }
    };

    return (
        <div className="mx-auto max-w-xs w-full grid grid-cols-3 gap-4">
            {arr.map((id) => (
                <button
                    key={id}
                    className={`w-full h-24 border border-black flex items-center justify-center ${
                        changed?.includes(id) ? "bg-green-700" : "bg-white"
                    }`}
                    onClick={() => changeColor(id)}
                    disabled={isDeactivating}
                >
                    {id}
                </button>
            ))}
        </div>
    );
}
