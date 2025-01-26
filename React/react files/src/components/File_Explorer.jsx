/* eslint-disable react/prop-types */
import { useState } from "react";

// Recursive component to render files and folders
const FileExplorer = ({ files }) => {
    return (
        <div style={{ marginLeft: "20px" }} className="flex items-start flex-col">
            {files.map((file) => (
                <FileOrFolder key={file.id} file={file} />
            ))}
        </div>
    );
};

// Component to render each file or folder
const FileOrFolder = ({ file }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleFolder = () => {
        setIsOpen((prevState) => !prevState);
    };

    return (
        <div style={{ margin: "5px 0" }}>
            {file.type === "folder" ? (
                <div>
                    <button
                        onClick={toggleFolder}
                        style={{ marginRight: "10px" }}
                    >
                        {isOpen ? "📂" : "📁"} {file.name}
                    </button>
                    {isOpen && <FileExplorer files={file.children} />}
                </div>
            ) : (
                <span>📄 {file.name}</span>
            )}
        </div>
    );
};

export default FileExplorer;
