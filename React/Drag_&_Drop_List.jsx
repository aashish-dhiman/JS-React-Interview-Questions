import { useState } from "react";

const DragAndDropList = () => {
    const [items, setItems] = useState([
        "Item 1",
        "Item 2",
        "Item 3",
        "Item 4",
    ]);
    const [draggedItemIndex, setDraggedItemIndex] = useState(null);

    const handleDragStart = (index) => {
        setDraggedItemIndex(index);
    };

    const handleDragOver = (event) => {
        event.preventDefault(); // Required to allow dropping
    };

    const handleDrop = (index) => {
        const updatedItems = [...items];
        const draggedItem = updatedItems.splice(draggedItemIndex, 1)[0];
        updatedItems.splice(index, 0, draggedItem);
        setItems(updatedItems);
        setDraggedItemIndex(null);
    };

    return (
        <div>
            <h3>Drag and Drop List</h3>
            <ul>
                {items.map((item, index) => (
                    <li
                        key={index}
                        draggable
                        onDragStart={() => handleDragStart(index)}
                        onDragOver={handleDragOver}
                        onDrop={() => handleDrop(index)}
                        style={{
                            padding: "10px",
                            margin: "5px 0",
                            border: "1px solid black",
                            backgroundColor:
                                draggedItemIndex === index
                                    ? "lightgray"
                                    : "white",
                            cursor: "move",
                        }}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DragAndDropList;
