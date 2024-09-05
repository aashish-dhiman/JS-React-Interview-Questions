// Q. Create a simple undo-redo functionality in react using an input and two buttons to perform required functionality

// This question was asked in CloudSek SDE Frontend Intern Interview
import { useState } from "react";

const UndoRedo = () => {
    const [textValue, setTextValue] = useState("");
    const [history, setHistory] = useState({
        undo: [],
        redo: [],
    });

    const handleUndo = () => {
        setHistory((prev) => {
            if (prev.undo.length === 0) return prev; // No undo available

            const previousValue = prev.undo[prev.undo.length - 1];
            //remove the previous value
            const newUndo = prev.undo.slice(0, -1);
            // add the current value to redo
            const newRedo = [textValue, ...prev.redo];
            // update the current value to value from undo
            setTextValue(previousValue || "");
            return {
                undo: newUndo,
                redo: newRedo,
            };
        });
    };

    const handleRedo = () => {
        setHistory((prev) => {
            if (prev.redo.length === 0) return prev; // No redo available

            const nextValue = prev.redo[0];
            // update the new Undo and add current text value
            const newUndo = [...prev.undo, textValue];
            // update the redo and remove the recent redo value
            const newRedo = prev.redo.slice(1);
            // update the text value to the value extracted from redo array
            setTextValue(nextValue);
            return {
                undo: newUndo,
                redo: newRedo,
            };
        });
    };

    const handleChange = (e) => {
        const newValue = e.target.value;

        // update the history.undo to contain the previous value of textbox
        setHistory((prev) => ({
            undo: [...prev.undo, textValue],
            redo: [],
        }));

        //set the current text value to the new value
        setTextValue(newValue);
    };

    return (
        <div className="flex items-center justify-center flex-col gap-3">
            <textarea
                name="text"
                value={textValue}
                onChange={handleChange}
                id=""
                className="border border-gray-900"
            ></textarea>
            <button onClick={handleUndo} disabled={history.undo.length === 0}>
                Undo
            </button>
            <button onClick={handleRedo} disabled={history.redo.length === 0}>
                Redo
            </button>
        </div>
    );
};

export default UndoRedo;
