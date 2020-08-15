import React from 'react';
import './style/LeaderBoard.css';
import firebase from 'firebase';
import LeaderboardRow from '../LeaderboardRow/LeaderboardRow';
import { ILeaderboardState } from './interfaces/ILeaderboardState';

class Leaderboard extends React.Component {

    state: ILeaderboardState = {
        highscores: []
    }

    componentDidMount() {
        this.getLeaderBoard();
    }

    getLeaderBoard = async () => {
        const events = await firebase.firestore().collection('highscores').orderBy("highscore", "desc")
        // .limit(10); an add to limit it
        events.get().then((querySnapshot) => {
            const tempDoc = querySnapshot.docs.map((doc) => {
                return { id: doc.id, ...doc.data() }
            });
            this.setState({ highscores: tempDoc });
        });
    }

    render() {
        return (
            <div >
                {this.state.highscores.map((highscore, index) => {
                    return (
                        <LeaderboardRow
                            index={index + 1}
                            key={index}
                            name={highscore.id}
                            highscore={highscore.highscore}
                        />
                    )
                })}
            </div>
        )
    }
}

export default Leaderboard;
