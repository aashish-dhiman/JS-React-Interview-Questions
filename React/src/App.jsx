import "./App.css";
import Cookie from "./components/Cookie";
import Pagination from "./components/Pagination";
import UndoRedo from "./components/UndoRedo";

function App() {
    return (
        <div className="container mx-auto p-4">
            {/* <Pagination /> */}
            <div className="h-1 bg-black w-full my-5"></div>
            <Cookie />
            <div className="h-1 bg-black w-full my-5"></div>
            <UndoRedo />
        </div>
    );
}

export default App;
