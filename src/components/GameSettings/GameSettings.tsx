import React from 'react';
import './style/GameSettings.css';
import GameSetting from '../GameSetting/GameSetting';
import { IStateTypes } from '../../App';
import { IGameSettingsValues } from './interfaces/ISettings';
import { IGameSettingsState } from './interfaces/IGameSettingsState';
import { Settings } from './Settings';

export var defaults: IStateTypes<string> = {
    "Difficulty": "Medium",
    "Duration": "30 seconds",
    "Sizes": "Medium",
    "Cursor": "Crosshair",
    "TargetColour": "#FF0000",
    "Sound": "On"
}

export var Values: IGameSettingsValues = {
    "Difficulty": { "Easy": 1000, "Medium": 800, "Hard": 600, "Very Hard": 400 },
    "Duration": { "15 seconds": 15, "30 seconds": 30, "60 seconds": 60, "90 seconds": 90, "120 seconds": 120 },
    "Sizes": { "Tiny": 10, "Small": 20, "Medium": 40, "Large": 80 },
    "Cursor": { "Default": "default", "Crosshair": "crosshair" },
    "Sound": { "On": true, "Off": false },
    "Colour": { "Default": "#FF0000" }
}

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
            this.setDefaultSettings();
        }
        const settings = JSON.parse(localStorage.getItem("settings") || '{}');
        this.setState({ settings: settings });
    }

    setDefaultSettings = () => {
        let defaultSettings: IStateTypes<string | number | boolean> = {};
        for (const setting in Settings) {
            var index: number = Settings[setting].defaultIndex;
            defaultSettings[setting] = Settings[setting].values[index];
        };
        localStorage.setItem("settings", JSON.stringify(defaultSettings));
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
