import React from 'react';
import './style/GameContainer.css';
import NavigationBar from '../NavigationBar/NavigationBar';
import Game from '../Game/Game';
import { IStateTypes } from '../../App';

interface IGameProps {
    playing: boolean
    endGame: () => void
    gameSettings: IStateTypes<string>
    user: IStateTypes<any>

};

class GameContainer extends React.Component<IGameProps> {
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

export default GameContainer;
