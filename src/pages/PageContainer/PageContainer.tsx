import React from 'react';
import './style/PageContainer.css';
import GameSettings from '../../components/GameSettings/GameSettings';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import GameStart from '../../components/GameStart/GameStart';
import { IStateTypes } from '../../App';

type PageContainerProps = {
    gameSettings: IStateTypes<string>
    updateGameSettings: Function
    title: string
    authenticate: Function
    logout: () => void
    user: IStateTypes<any>
    playing: boolean
    startGame: () => void
    endGame: () => void
};

class PageContainer extends React.Component<PageContainerProps> {

    render() {
        return (
            <>
                <NavigationBar playing={this.props.playing} endGame={this.props.endGame} />
                <div className="page-container" >

                    <h2 className="page-container--title">{this.props.title}</h2>
                    <GameSettings
                        gameSettings={this.props.gameSettings}
                        updateGameSettings={this.props.updateGameSettings}
                    />
                    <GameStart
                        logout={this.props.logout}
                        authenticate={this.props.authenticate}
                        user={this.props.user}
                        startGame={this.props.startGame}
                    />

                </div>
            </>
        )
    }
}

export default PageContainer;
