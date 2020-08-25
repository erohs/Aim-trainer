import React from 'react';
import './style/GamePage.css';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import Gamemode from '../../components/Gamemode/Gamemode';
import { IGameProps } from './interfaces/IGamePageProps';
import { setDefaultSettings } from '../../helpers/SettingsHelper';

class GamePage extends React.Component<IGameProps> {
    state = {
        gamemode: ""
    }

    componentDidMount() {
        if (localStorage.getItem("settings") === null) {
            setDefaultSettings();
        }
        const settings = JSON.parse(localStorage.getItem("settings") || '{}');
        this.setState({ gamemode: settings.gamemode });
    }

    render() {
        return (
            <>
                <NavigationBar />
                <div className="game-container">
                    <Gamemode gamemode={this.state.gamemode} />
                </div>
            </>
        )
    }
}

export default GamePage;
