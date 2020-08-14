import React from 'react';
import './style/LeaderBoardRow.css';
import { ILeaderboardRowProps } from './interfaces/ILeaderboardRowProps'

class LeaderboardRow extends React.Component<ILeaderboardRowProps> {

    render() {
        return (
            <div className="leader-board-row">
                <div className="leader-board-row--position">#{this.props.index}</div>
                <div className="leader-board-row--name">{this.props.name}</div>
                <div className="leader-board-row--highscore">{this.props.highscore}</div>
            </div>
        )
    }
}

export default LeaderboardRow;
