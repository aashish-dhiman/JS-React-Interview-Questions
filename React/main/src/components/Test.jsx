/* eslint-disable react/prop-types */
import { useState } from "react";
import { FcFile, FcFolder } from "react-icons/fc";
const explorer = [
    {
        name: "folder-view",
        children: [],
    },
    {
        name: "js-questions",
        children: [
            {
                name: "folder-view.js",
            },
            {
                name: "hasOwnProperty.js",
            },
            {
                name: "inner-folder",
                children: [
                    {
                        name: "innermost",
                        children: [],
                    },
                    {
                        name: "file-1.ts",
                    },
                    {
                        name: "file-2.ts",
                    },
                ],
            },
        ],
    },
    {
        name: "progress-bar",
        children: [
            {
                name: "index.html",
            },
            {
                name: "index.js",
            },
            {
                name: "styles.css",
            },
        ],
    },
    {
        name: "package.json",
    },
];

const TreeWrapper=()=>{
    return {explorer.map((row,i)=><TreeView data={row} key={i}/>)}
}



const TreeView = ({ data, isChild = false }) => {
    const [expand, setExpand] = useState(true);
    return (
        <>
            <div
                style={{ marginLeft: isChild ? 20 : "" }}
                className="text-left"
            >
                <div onClick={() => setExpand(!expand)}>
                    {data.children && data.children.length > 0 ? (
                        <FcFolder />
                    ) : (
                        <FcFile />
                    )}
                    {data.name}
                </div>
                <br />
                {data.children &&
                    data.children.length > 0 &&
                    data.children.map((row, i) => {
                        return (
                            <div
                                key={i}
                                style={{
                                    display: expand ? "block" : "none",
                                }}
                            >
                                <TreeView
                                    style={{ paddingLeft: 15 }}
                                    data={row}
                                    isChild={true}
                                />
                            </div>
                        );
                    })}
            </div>
        </>
    );
};
export default TreeWrapper;
