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
            console.log(prev);
            const previousValue = prev.undo[prev.undo.length - 1];
            const newUndo = prev.undo.slice(0, -1);
            const newRedo = [textValue, ...prev.redo];

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

            console.log(prev);
            const nextValue = prev.redo[0];
            const newUndo = [...prev.undo, textValue];
            const newRedo = prev.redo.slice(1);

            setTextValue(nextValue || "");
            return {
                undo: newUndo,
                redo: newRedo,
            };
        });
    };

    const handleChange = (e) => {
        const newValue = e.target.value;

        setHistory((prev) => ({
            undo: [...prev.undo, textValue],
            redo: [],
        }));

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
