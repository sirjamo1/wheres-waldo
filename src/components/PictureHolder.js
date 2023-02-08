import wheresWaldoBackground from "../assets/images/wheresWaldoBackground.jpg";
import { useState } from "react";
const PictureHolder = ({
    timerActive,
    setTimerActive,
    doesClickMatchItem,
    wallyFound,
    wizardFound,
    odlawFound,
}) => {
    console.log(timerActive);
    const [listTop, setListTop] = useState(100);
    const [listLeft, setListLeft] = useState(100);
    const [showList, setShowList] = useState(false);

    return (
        <div className="picture-container">
            <div
                className="drop-down-items"
                style={{
                    top: listTop,
                    left: listLeft,
                    visibility: showList === true ? "visible" : "hidden",
                }}
            >
                <ul>
                    <li
                        onClick={() => {
                            doesClickMatchItem("wally", listTop, listLeft);
                            setShowList(!showList);
                        }}
                        style={{ opacity: wallyFound ? 0.5 : 1 }}
                    >
                        Wally
                    </li>
                    <li
                        onClick={() => {
                            doesClickMatchItem("wizard", listTop, listLeft);
                            setShowList(!showList);
                        }}
                        style={{ opacity: wizardFound ? 0.5 : 1 }}
                    >
                        Wizard
                    </li>
                    <li
                        onClick={() => {
                            doesClickMatchItem("odlaw", listTop, listLeft);
                            setShowList(!showList);
                        }}
                        style={{ opacity: odlawFound ? 0.5 : 1 }}
                    >
                        Odlaw
                    </li>
                </ul>
            </div>
            {timerActive ? (
                <img
                    onClick={(e) => {
                        setListTop(e.pageY - e.target.y);
                        setListLeft(e.pageX - e.target.x);
                        setShowList(!showList);
                    }}
                    src={wheresWaldoBackground}
                    alt="wheres waldo background"
                />
            ) : (
                <button
                    className="click-to-start"
                    onClick={() => setTimerActive(true)}
                >
                    Click to start
                </button>
            )}
        </div>
    );
};

export default PictureHolder;
