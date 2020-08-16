import React from 'react';
import './style/GameSettings.css';
import GameSetting from '../GameSetting/GameSetting';
import { IGameSettingsState } from './interfaces/IGameSettingsState';
import { Settings } from './Settings';
import { setDefaultSettings } from '../../helpers/SettingsHelper';

class GameSettings extends React.Component {

    state: IGameSettingsState = {
        settings: {}
    }

    componentWillUnmount() {
        this.checkColour()
    }

    checkColour = () => {
        const re = /[0-9A-Fa-f]{6}/g;
        if (!re.test(this.state.settings.colour as string)) {
            const settings = { ...this.state.settings };
            settings["colour"] = "#FF0000";
            localStorage.setItem("settings", JSON.stringify(settings));
        }
    }

    componentDidMount() {
        if (localStorage.getItem("settings") === null) {
            setDefaultSettings();
        }
        const settings = JSON.parse(localStorage.getItem("settings") || '{}');
        this.setState({ settings: settings });
    }

    componentDidUpdate() {
        localStorage.setItem("settings", JSON.stringify(this.state.settings));
    }

    updateSettings = (setting: string, value: string | boolean | number) => {
        let settings = { ...this.state.settings };
        settings[setting] = value;
        this.setState({ settings });
    }

    render() {
        return (
            <div className="game-settings">
                {Object.keys(Settings).map((setting, index) => {
                    return (
                        <GameSetting
                            key={index}
                            name={setting}
                            type={Settings[setting].type}
                            values={Settings[setting].values}
                            types={Settings[setting].types}
                            currentValue={this.state.settings[setting]}
                            updateSettings={this.updateSettings}
                        />
                    )
                })}
            </div>
        )
    }
}

export default GameSettings;
