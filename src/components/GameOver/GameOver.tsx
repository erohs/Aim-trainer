import React from 'react';
import './style/GameOver.css';
import { IStateTypes } from '../../App';

interface GameOverProps {
    clickCount: IStateTypes<number>
    targetCount: IStateTypes<number>
};

class GameOver extends React.Component<GameOverProps> {
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


            </div>

        )
    }
}

export default GameOver;
