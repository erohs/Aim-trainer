import React from 'react';
import './style/GamePage.css';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import Game from '../../components/Game/Game';
import { IGameProps } from './interfaces/IGamePageProps';

class GamePage extends React.Component<IGameProps> {
    render() {
        return (
            <>
                <NavigationBar />
                <div className="game-container">
                    <Game />
                </div>
            </>
        )
    }
}

export default GamePage;
