import { useState } from "react";

const SelectAllComponent = () => {
    // Let's assume we have 10 checkboxes
    const checkboxItems = Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        label: `Checkbox ${i + 1}`,
    }));

    // State to manage the checked status of each checkbox
    const [checkedState, setCheckedState] = useState(
        new Array(checkboxItems.length).fill(false)
    );

    const [isSelectAllChecked, setIsSelectAllChecked] = useState(false);

    // Function to handle Select All click
    const handleSelectAll = () => {
        const newCheckedState = checkedState.map(() => !isSelectAllChecked);
        setCheckedState(newCheckedState);
        setIsSelectAllChecked(!isSelectAllChecked);
    };

    // Function to handle individual checkbox clicks
    const handleCheckboxChange = (index) => {
        const newCheckedState = [...checkedState];
        newCheckedState[index] = !newCheckedState[index];

        // Update individual checkbox state
        setCheckedState(newCheckedState);

        // If any checkbox is unchecked, uncheck "Select All"
        if (newCheckedState.includes(false)) {
            setIsSelectAllChecked(false);
        } else {
            // If all are checked, set "Select All" to checked
            setIsSelectAllChecked(true);
        }
    };

    return (
        <div>
            <h3>Select All Checkboxes</h3>

            {/* Select All Checkbox */}
            <div>
                <input
                    type="checkbox"
                    id="select-all"
                    checked={isSelectAllChecked}
                    onChange={handleSelectAll}
                />
                <label htmlFor="select-all">Select All</label>
            </div>

            {/* Individual Checkboxes */}
            <ul style={{ listStyleType: "none", paddingLeft: "10px" }}>
                {checkboxItems.map((item, index) => (
                    <li key={item.id}>
                        <input
                            type="checkbox"
                            id={item.label}
                            checked={checkedState[index]}
                            onChange={() => handleCheckboxChange(index)}
                        />
                        <label htmlFor={item.label}>{item.label}</label>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SelectAllComponent;
