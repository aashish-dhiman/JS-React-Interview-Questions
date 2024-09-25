import "./App.css";
import Auto_Increment_Counter from "./components/Auto_Increment_Counter";
import AutoComplete from "./components/AutoComplete_Search";
import Calculator from "./components/Calculator_using_Eval";
import DragAndDropList from "./components/Drag_&_Drop_List";
import LoginWithExpiry from "./components/Login_With_Expiry";
import Timer from "./components/Timer_5_sec";
import UndoRedo from "./components/UndoRedo";
import ChessBoard from "./components/ChessBoard";
import ChessBoardExtended from "./components/ChessBoard_with_elephant&camel";
import TrafficLight from "./components/TrafficLight";
import Matrix from "./components/Q_3x3_Matrix";
import Pagination from "./components/Pagination";
import TicTacToe from "./components/TicTacToe_Configurable/TicTacToe";
import Cookie from "./components/Cookie";
import InfiniteScroll from "./components/Infinite_Fetch_Intersection";
import GridBorderDiagonal from "./components/GridBorderDiagonal";
import SnakeLadderGame from "./components/Snake_&_Ladder.jsx";
import NestedCheckboxes from "./components/NestedCheckBox.jsx";
import SelectAllComponent from "./components/SelectCheckBox.jsx";

function App() {
    return (
        <div className="container mx-auto p-4 w-full h-full flex flex-col items-center justify-center gap-6 divide-y-2 ">
            <div>
                <h1>1. Auto Increment Counter</h1>
                <Auto_Increment_Counter />
            </div>
            <div>
                <h1>2. Auto Complete Search</h1>
                <AutoComplete />
            </div>
            <div>
                <h1>3. Calculator Using Eval fn in JS</h1>
                <Calculator />
            </div>
            <div>
                <h1>4. Drag And Drop List</h1>
                <DragAndDropList />
            </div>
            <div>
                <h1>5. Simple Login with Expiry</h1>
                <LoginWithExpiry />
            </div>
            <div>
                <h1>6. Timer</h1>
                <Timer />
            </div>
            <div>
                <h1>7. Undo Redo</h1>
                <UndoRedo />
            </div>
            <div>
                <h1>8. ChessBoard</h1>
                <ChessBoard />
            </div>
            <div>
                <h1>9. ChessBoard with elephant and camel positions</h1>
                <ChessBoardExtended />
            </div>
            <div>
                <h1>10. Traffic Light</h1>
                <TrafficLight />
            </div>
            <div>
                <h1>11. 3x3 Matrix Color Change on click and Reverse</h1>
                <Matrix />
            </div>
            <div>
                <h1>12. Pagination with debouncing</h1>
                <Pagination />
            </div>
            <div>
                <h1>13. TicTacToe</h1>
                <TicTacToe />
            </div>
            <div>
                <h1>14. Set cookie using local storage</h1>
                <Cookie />
            </div>
            <div className="max-h-[400px] overflow-y-scroll">
                <h1>14. Infinite Scroll</h1>
                <InfiniteScroll />
            </div>
            <div>
                <h1>15. Color Border and Diagonal of Grid</h1>
                <GridBorderDiagonal />
            </div>
            <div>
                <h1>16. Snake and Ladder (2 Players)</h1>
                <SnakeLadderGame />
            </div>
            <div>
                <h1>17. Recursive Nested Checkbox (CARS 24)</h1>
                <NestedCheckboxes />
            </div>
            <div>
                <h1>18. Select All Checkbox</h1>
                <SelectAllComponent />
            </div>
        </div>
    );
}

export default App;
