/* 
Q. Consider a configurable 3x3 matrix of boxes. Configurable means the boxes can be arranged in any fashion given the same 3x3 matrix. 
On Clicking of boxes , they are filled with green color
On clicking after all the boxes, they are turned back to white in the same order in which they have clicked with a 1 second delay 

** Asked in INDmoney SDE Intern Frontend Machine Coding Round
*/
import { useState } from "react";

export default function Home() {
    const [changed, setChanged] = useState([]);

    // create a new array of length matrixSize
    const matrixSize = 9;
    const arr = Array.from({ length: matrixSize }, (_, idx) => idx + 1);
    // const arr = [...Array(matrixSize).Keys()];

    const revertColors = (i) => {
        if (i > 0) {
            setTimeout(() => {
                setChanged((prev) => prev.slice(1));
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

    return (
        <div className="mx-auto grid max-w-3xl grid-cols-3 grid-rows-3 place-items-center gap-6 pt-[150px]">
            {arr.map((id) => (
                <div
                    key={id}
                    className={`size-20 border border-black ${
                        changed.includes(id) ? "bg-green-700" : "bg-white"
                    }`}
                    onClick={() => changeColor(id)}
                >
                    {id}
                </div>
            ))}
        </div>
    );
}
