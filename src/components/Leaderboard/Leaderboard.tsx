import React from 'react';
import './style/LeaderBoard.css';
import firebase from 'firebase';
import LeaderboardRow from '../LeaderboardRow/LeaderboardRow';
import { ILeaderboardState } from './interfaces/ILeaderboardState';
import { ILeaderboardProps } from './interfaces/ILeaderboardProps';

class Leaderboard extends React.Component<ILeaderboardProps> {

    state: ILeaderboardState = {
        highscores: []
    }

    componentDidMount() {
        this.getLeaderBoard();
    }

    componentDidUpdate() {
        this.getLeaderBoard();
    }

    getLeaderBoard = async () => {
        const collection = `${this.props.leaderboard}Highscores`;
        const events = await firebase.firestore().collection(collection).orderBy("results.score", "desc")
        // .limit(10); an add to limit it
        events.get().then((querySnapshot) => {
            const tempDoc = querySnapshot.docs.map((doc) => {
                return { id: doc.id, ...doc.data() }
            });
            this.setState({ highscores: tempDoc });
        });
        console.log(this.state)
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
                            highscore={highscore.results.score.toString()}
                        />
                    )
                })}
            </div>
        )
    }
}

export default Leaderboard;
