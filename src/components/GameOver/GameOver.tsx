import React from 'react';
import './style/GameOver.css';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import { IGameOverProps } from './interfaces/IGameOverProps';
import { IGameOverState } from './interfaces/IGameOverState';

class GameOver extends React.Component<IGameOverProps> {

    state: IGameOverState = {
        name: ""
    }

    continue = () => {
        this.updateLeaderBoard(this.state.name, this.props.score.toString());
    }

    updateLeaderBoard = (name: string, score: string) => {
        let docRef = firebase.firestore().collection('highscores').doc(name);
        let user = {
            "highscore": score
        }

        docRef.set({ ...user }, { merge: true });
    }

    handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({ name: event.currentTarget.value });
    }

    render() {
        return (
            <div className="game-over">
                <p className="game-over--title">GAME OVER</p>
                <div className="results-container">
                    <div className="results-target">
                        {Object.keys(this.props.targetCount).map(key => (<p> {this.props.targetCount[key]}</p>))}
                    </div>
                    <div className="results-click">
                        {Object.keys(this.props.clickCount).map(key => (<p> {this.props.clickCount[key]}</p>))}
                    </div>
                </div>
                {/* separate into component */}
                <div className="game-over--name-container">
                    <div className="game-over--details-container">
                        <input onChange={this.handleChange} value={this.state.name} placeholder="Enter name..." type="text" className="game-over--name-input" />
                        <Link tabIndex={-1} className="game-over--name-link" to="/leaderboard" >
                            <button className="game-over--name-submit" onClick={this.continue} disabled={!this.state.name}>Submit</button>
                        </Link>

                    </div>
                </div>
            </div>
        )
    }
}

export default GameOver;
