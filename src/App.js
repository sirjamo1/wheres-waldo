import { initializeApp } from "firebase/app";
import { config } from "./firebase-config";
import React, { useEffect, useState } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import "./App.css";
import Header from "./components/Header";
import PictureHolder from "./components/PictureHolder";
import TopScoreForm from "./components/TopScoreForm";
import ScoreBoard from "./components/ScoreBoard";

function App() {
    const [timer, setTimer] = useState(0);
    const [bestTime, setBestTime] = useState(0);
    const [timerActive, setTimerActive] = useState(false);
    const [wallyFound, setWallyFound] = useState(false);
    const [wizardFound, setWizardFound] = useState(false);
    const [odlawFound, setOdlawFound] = useState(false);
    const [allFound, setAllFound] = useState(false);
    const [showBestScores, setShowBestScores] = useState(false);
    const wallyPosition = {
        yMin: 416,
        yMax: 435,
        xMin: 280,
        xMax: 323,
    };
    const wizardPosition = {
        yMin: 491,
        yMax: 517,
        xMin: 279,
        xMax: 327,
    };
    const odlawPosition = {
        yMin: 187,
        yMax: 207,
        xMin: 284,
        xMax: 334,
    };
    const getNamePosition = (name) => {
        if (name === "wally") {
            return wallyPosition;
        } else if (name === "wizard") {
            return wizardPosition;
        } else if ((name = "odlaw")) {
            return odlawPosition;
        }
    };
    const getSetNameFound = (name) => {
        if (name === "wally") {
            return setWallyFound;
        } else if (name === "wizard") {
            return setWizardFound;
        } else if ((name = "odlaw")) {
            return setOdlawFound;
        }
    };
    const doesClickMatchItem = (name, x, y) => {
        const nameVar = getNamePosition(name);
        const upperCaseName = name.charAt(0).toUpperCase() + name.slice(1);
        if (
            x > nameVar.xMin &&
            x < nameVar.xMax &&
            y > nameVar.yMin &&
            y < nameVar.yMax
        ) {
            console.log(`You found ${upperCaseName}`);
            const setNameFound = getSetNameFound(name);
            setNameFound(true);
        } else {
            return console.log("nope..");
        }
    };
    initializeApp(config);
    const db = getFirestore();
    const helloRef = collection(db, "hello");
    const countTimer = () => {
        if (timerActive === true) setTimer(timer + 1);
    };
    const logBestTime = () => {
        if (timer < bestTime || bestTime === 0) setBestTime(timer);
    };
    const resetGame = () => {
        setTimer(0);
        setWallyFound(false);
        setWizardFound(false);
        setOdlawFound(false);
        setAllFound(false);
        setTimerActive(false);
        if (showBestScores) setShowBestScores(false);
        // setShowBestScores(false);
    };
    useEffect(() => {
        if (wallyFound && wizardFound && odlawFound) {
            logBestTime();

            return setAllFound(true);
        }
        if (!allFound) {
            const int = setInterval(countTimer, 1000);
            return () => clearInterval(int);
        }
    }, [timer, timerActive]);

    return (
        <div className="App">
            <Header
                timer={timer}
                timerActive={timerActive}
                bestTime={bestTime}
                wallyFound={wallyFound}
                wizardFound={wizardFound}
                odlawFound={odlawFound}
                setShowBestScores={setShowBestScores}
                resetGame={resetGame}
            />
            {allFound ? (
                <TopScoreForm
                    timer={timer}
                    resetGame={resetGame}
                    setShowBestScores={setShowBestScores}
                />
            ) : (
                <></>
            )}
            {showBestScores ? (
                <ScoreBoard timer={timer} resetGame={resetGame} />
            ) : (
                <></>
            )}
            <PictureHolder
                timerActive={timerActive}
                setTimerActive={setTimerActive}
                doesClickMatchItem={doesClickMatchItem}
                wallyFound={wallyFound}
                wizardFound={wizardFound}
                odlawFound={odlawFound}
            />
        </div>
    );
}

export default App;
