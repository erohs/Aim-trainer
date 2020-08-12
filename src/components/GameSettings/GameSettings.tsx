import React from 'react';
import './style/GameSettings.css';
import GameSetting from '../GameSetting/GameSetting';
import { IStateTypes } from '../../App';
import { SettingNames, SettingTypes } from '../../enums';
import { IGameSettingsProps } from './interfaces/IGameSettingsProps';
import { IGameSettingsValues } from './interfaces/IGameSettingsValues';

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
    "Sound": { "On": true, "Off": false }
}

class GameSettings extends React.Component<IGameSettingsProps> {
    render() {
        return (
            <div className="game-settings">
                <GameSetting
                    gameSettings={this.props.gameSettings}
                    updateGameSettings={this.props.updateGameSettings}
                    values={Object.keys(Values["Difficulty"])}
                    type={SettingTypes.select}
                    name={SettingNames.difficulty}
                />
                <GameSetting
                    gameSettings={this.props.gameSettings}
                    updateGameSettings={this.props.updateGameSettings}
                    values={Object.keys(Values["Duration"])}
                    type={SettingTypes.select}
                    name={SettingNames.duration}
                />
                <GameSetting
                    gameSettings={this.props.gameSettings}
                    updateGameSettings={this.props.updateGameSettings}
                    values={Object.keys(Values["Sizes"])}
                    type={SettingTypes.select}
                    name={SettingNames.size}
                />
                <GameSetting
                    gameSettings={this.props.gameSettings}
                    updateGameSettings={this.props.updateGameSettings}
                    values={Object.keys(Values["Cursor"])}
                    type={SettingTypes.select}
                    name={SettingNames.cursor}
                />
                <GameSetting
                    gameSettings={this.props.gameSettings}
                    updateGameSettings={this.props.updateGameSettings}
                    type={SettingTypes.colour}
                    name={SettingNames.colour}
                />
                <GameSetting
                    gameSettings={this.props.gameSettings}
                    updateGameSettings={this.props.updateGameSettings}
                    values={Object.keys(Values["Sound"])}
                    type={SettingTypes.toggle}
                    name={SettingNames.sound}
                />
            </div>
        )
    }
}

export default GameSettings;
