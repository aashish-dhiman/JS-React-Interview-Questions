/* 
Q. Consider a configurable 3x3 matrix of boxes. Configurable means the boxes can be arranged in any fashion given the same 3x3 matrix. 
On Clicking of boxes , they are filled with green color
On clicking after all the boxes, they are turned back to white in the same order in which they have clicked with a 1 second delay 

** Asked in INDmoney SDE Intern Frontend Machine Coding Round
*/
import { useState } from "react";

export default function Home() {
    const [changed, setChanged] = useState([]);
    const matrixSize = 9;

    const revertColors = (i) => {
        if (i > 0) {
            setTimeout(() => {
                setChanged((prev) => prev.slice(0, -1));
                revertColors(i - 1);
            }, 1000);
        }
    };

    const changeColor = (id) => {
        if (!changed.includes(id)) {
            const newChanged = [...changed, id];
            setChanged(newChanged);

            if (newChanged.length === matrixSize) {
                revertColors(matrixSize);
            }
        }
    };

    const arr = Array(matrixSize).fill(0);

    return (
        <div className="mx-auto grid max-w-3xl grid-cols-3 grid-rows-3 gap-6 pt-[150px]">
            {arr.map((_, idx) => (
                <div
                    key={idx + 1}
                    id={(idx + 1).toString()}
                    className={`size-20 border border-black ${
                        changed.includes(idx + 1) ? "bg-green-700" : "bg-white"
                    }`}
                    onClick={() => changeColor(idx + 1)}
                ></div>
            ))}
        </div>
    );
}
