import wally from "../assets/images/wally.png";
import wizard from "../assets/images/wizard.png";
import odlaw from "../assets/images/odlaw.png";
import { BsTrophy } from "react-icons/bs";
import { MdRestartAlt } from "react-icons/md";
import { useState, useEffect } from "react";

const Header = ({
    timer,
    timerActive,
    bestTime,
    wallyFound,
    wizardFound,
    odlawFound,
    setShowBestScores,
    resetGame,
}) => {
    const [translateNum, setTranslateNum] = useState(0);
    useEffect(() => {
        const itemContainer = document.getElementsByClassName("item-container");
        const scoresContainer =
            document.getElementsByClassName("score-container");

        setTranslateNum(
            itemContainer[0].offsetLeft - scoresContainer[0].offsetLeft
        );
        console.log(scoresContainer);
    }, []);
    const scoresStyles = !timerActive
        ? {
              transform: `translateX(${translateNum}px)`,
          }
        : { transform: `translateX(0px)` };

    return (
        <div className="header-container">
            <h1>Where's Waldo?</h1>

            <div className="item-container">
                <img
                    src={wally}
                    alt="wally"
                    height="50px"
                    style={{ opacity: wallyFound ? 0.5 : 1 }}
                />
                <img
                    src={wizard}
                    alt="wizard"
                    height="50px"
                    style={{ opacity: wizardFound ? 0.5 : 1 }}
                />
                <img
                    src={odlaw}
                    alt="odlaw"
                    height="50px"
                    style={{ opacity: odlawFound ? 0.5 : 1 }}
                />
            </div>
            <div className="score-container" style={scoresStyles}>
                <button className="reset-button" onClick={() => resetGame()}>
                    <MdRestartAlt size={25} />
                </button>
                <div className="score-sub-container">
                    <div>
                        <p>Current Time : {timer}</p>
                    </div>
                    <div>
                        <p>Best Time : {bestTime}</p>
                    </div>
                </div>
                <button
                    className="get-scores-button"
                    onClick={() => setShowBestScores((prevShow) => !prevShow)}
                >
                    <BsTrophy size={20} />
                </button>
            </div>
        </div>
    );
};

export default Header;
