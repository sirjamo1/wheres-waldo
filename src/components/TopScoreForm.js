import {
    collection,
    getDocs,
    getFirestore,
    setDoc,
    doc,
    addDoc,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { config } from "../firebase-config";
import { MdRestartAlt } from "react-icons/md";

const TopScoreForm = ({ resetGame, timer, setShowBestScores }) => {
    initializeApp(config);
    const db = getFirestore();

    const topScoreRef = collection(db, "topScore");
    const sendScore = async (userName) => {
        await addDoc(topScoreRef, {
            name: userName,
            time: timer,
        });
    };
    return (
        <form
            className="top-score-form"
            onSubmit={(e) => {
                e.preventDefault();
                sendScore(e.target.name.value);
                console.log(e.target.name.value);
                setShowBestScores(true);
                resetGame();
            }}
        >
            <h4>Add Your Score to The Leader Board</h4>
            <input
                name="name"
                type="text"
                placeholder="Name"
                required="true"
            ></input>
            <p>Time : {timer}</p>
            <button type="submit" className="form-submit-button">Submit</button>
            <button className="form-reset-button"
                onClick={(e) => {
                    e.preventDefault();
                    resetGame();
                }}
            >
               <MdRestartAlt size={20}/>
            </button>
        </form>
    );
};
export default TopScoreForm;
