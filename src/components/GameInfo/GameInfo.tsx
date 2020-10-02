import React from 'react';
import './style/GameInfo.css';
import { IGameInfoProps } from './interfaces/IGameInfoProps';
import { roundNumber } from '../../helpers/ResultsHelper';

class GameInfo extends React.Component<IGameInfoProps> {
    render() {
        return (
            <div className="game-info">
                <p className="game-info--header">TIMER</p>
                <p className="game-info--value">{this.props.timer}</p>
                <p className="game-info--header">SCORE</p>
                <p className="game-info--value">{roundNumber(this.props.score)}</p>
            </div>
        )
    }
}

export default GameInfo;
