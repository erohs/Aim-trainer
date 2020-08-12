import React from 'react';
import './style/GameStart.css';
// import Login from '../Login/Login';
import { Link } from 'react-router-dom';
import { IGameStartProps } from './interfaces/IGameStartProps';

class GameStart extends React.Component<IGameStartProps> {
    render() {
        // const logout = <button className="game-start--button" onClick={this.props.logout}>Log out</button>

        // if (!this.props.user.uid) {
        //     return <Login authenticate={this.props.authenticate} />
        // }

        return (
            <div className="game-start--container">
                {/* {logout} */}
                <Link to="/play">
                    <button className="game-start--button">Start</button>
                </Link>
            </div>
        )
    }
}

export default GameStart;
