import React from 'react';
import './style/GameStart.css';
import Login from '../Login/Login';
import { IStateTypes } from '../../App';

type GameStartProps = {
    authenticate: Function
    logout: () => void
    user: IStateTypes<any>
    startGame: () => void
};

class GameStart extends React.Component<GameStartProps> {
    render() {
        const logout = <button className="game-start--button" onClick={this.props.logout}>Log out</button>

        if (!this.props.user.uid) {
            return <Login authenticate={this.props.authenticate} />
        }

        return (
            <div className="game-start--container">
                {logout}
                <button onClick={this.props.startGame} className="game-start--button">Start</button>
            </div>
        )
    }
}

export default GameStart;
