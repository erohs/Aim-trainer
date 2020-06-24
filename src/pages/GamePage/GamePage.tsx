import React from 'react';
import './style/GamePage.css';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import Game from '../../components/Game/Game';
import { IStateTypes } from '../../App';

interface IGameProps {
    playing: boolean
    endGame: () => void
    gameSettings: IStateTypes<string>
    user: IStateTypes<any>

};

class GamePage extends React.Component<IGameProps> {
    render() {

        return (
            <>
                <NavigationBar playing={this.props.playing} endGame={this.props.endGame} />
                <div className="game-container">
                    <Game
                        gameSettings={this.props.gameSettings}
                        user={this.props.user}
                    />
                </div>
            </>
        )
    }
}

export default GamePage;
