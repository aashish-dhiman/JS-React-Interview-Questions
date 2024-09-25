/* eslint-disable react/prop-types */
import { useState } from "react";

// Sample nested data
const categories = [
    {
        id: 1,
        label: "Electronics",
        children: [
            {
                id: 2,
                label: "Mobile Phones",
                children: [{ id: 11, label: "Samsung", children: [] }],
            },

            {
                id: 3,
                label: "Laptops",
                children: [
                    { id: 4, label: "Gaming Laptops", children: [] },
                    { id: 5, label: "Business Laptops", children: [] },
                ],
            },
        ],
    },
    {
        id: 6,
        label: "Clothing",
        children: [
            {
                id: 7,
                label: "Men",
                children: [{ id: 12, label: "Shirt", children: [] }],
            },
            { id: 8, label: "Women", children: [] },
        ],
    },
];

// Recursive component to render checkboxes with children
const CheckboxTree = ({ nodes, checkedState, onToggle }) => {
    return (
        <ul style={{ listStyleType: "none", paddingLeft: "20px" }}>
            {nodes.map((node) => (
                <li key={node.id}>
                    <input
                        type="checkbox"
                        id={node.id}
                        checked={!!checkedState[node.id]}
                        onChange={() => onToggle(node.id)}
                    />
                    {<label htmlFor={node.id}> {node.label} </label>}
                    {/* Recursively render children */}
                    {node.children.length > 0 && (
                        <CheckboxTree
                            nodes={node.children}
                            checkedState={checkedState}
                            onToggle={onToggle}
                        />
                    )}
                </li>
            ))}
        </ul>
    );
};

const NestedCheckboxes = () => {
    // State to track checked status of each node
    const [checkedState, setCheckedState] = useState({});

    const handleToggle = (id) => {
        const newState = { ...checkedState };

        // Helper function to toggle all children of a node recursively
        const toggleChildren = (nodeId, isChecked) => {
            const node = findNodeById(categories, nodeId);
            if (node && node.children.length > 0) {
                node.children.forEach((child) => {
                    newState[child.id] = isChecked;
                    toggleChildren(child.id, isChecked); // Recursive call for deeper nesting
                });
            }
        };

        // Toggle the current node
        const isChecked = !newState[id];
        newState[id] = isChecked;

        // Toggle all children when a parent is checked/unchecked
        toggleChildren(id, isChecked);

        // Update parent state (if all children are unchecked, uncheck the parent)
        updateParentState(newState, id);

        setCheckedState(newState);
    };

    // Helper function to update the parent state based on children status
    const updateParentState = (newState, nodeId) => {
        const parent = findParent(categories, nodeId);
        if (parent) {
            const areAllChildrenChecked = parent.children.every(
                (child) => newState[child.id]
            );
            const areAllChildrenUnchecked = parent.children.every(
                (child) => !newState[child.id]
            );

            if (areAllChildrenChecked) {
                newState[parent.id] = true;
            } else if (areAllChildrenUnchecked) {
                newState[parent.id] = false;
            }
            // Continue updating the parent's parent recursively
            updateParentState(newState, parent.id);
        }
    };

    // Helper function to find a node by id
    const findNodeById = (nodes, id) => {
        for (let node of nodes) {
            if (node.id === id) return node;
            if (node.children.length > 0) {
                const result = findNodeById(node.children, id);
                if (result) return result;
            }
        }
        return null;
    };

    // Helper function to find the parent of a node
    const findParent = (nodes, nodeId, parent = null) => {
        for (let node of nodes) {
            if (node.id === nodeId) return parent;
            if (node.children.length > 0) {
                const result = findParent(node.children, nodeId, node);
                if (result) return result;
            }
        }
        return null;
    };

    return (
        <div>
            <h3>Select Categories</h3>
            <CheckboxTree
                nodes={categories}
                checkedState={checkedState}
                onToggle={handleToggle}
            />
        </div>
    );
};

export default NestedCheckboxes;
