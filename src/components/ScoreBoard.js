import { collection, getDocs, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { config } from "../firebase-config";
import { useState, useEffect } from "react";

const ScoreBoard = ({resetGame}) => {
    const [topScores, setTopScores] = useState([]);
    initializeApp(config);
    const db = getFirestore();
    const topScoreRef = collection(db, "topScore");
    useEffect(() => {
        const getScores = async () => {
            const snapShotToScores = await getDocs(topScoreRef);
            let scoreArr = [];
            snapShotToScores.docs.forEach((doc) => {
                scoreArr.push({ ...doc.data() });
            });
            // console.log(topScores);
            let sortedScores = scoreArr.sort((a, b) => a.time - b.time)
            setTopScores(sortedScores);
        };
        getScores();
    }, []);

    console.log(topScores);
    return (
        <div className="score-board-container">
            <h4>Score Board</h4>
            <button className="score-board-reset-button" onClick={() => resetGame()}>x</button>
            <div className="score-board">
                {topScores.map((score, i) => (
                    <div key={i}>
                        <p className="score-name">{i + 1}. {score.name} </p> <p>{score.time} seconds</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ScoreBoard;
