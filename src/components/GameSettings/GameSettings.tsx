import React from 'react';
import './style/GameSettings.css';
import GameSetting, { SettingType } from '../GameSetting/GameSetting';
import { IStateTypes } from '../../App';

enum SettingNames {
    "difficulty" = "Difficulty",
    "duration" = "Duration",
    "size" = "Sizes",
    "cursor" = "Cursor",
    "colour" = "TargetColour",
    "sound" = "Sound"
}

interface IValues {
    [key: string]: IStateTypes<string | number | boolean>
}

interface ISettingsProps {
    gameSettings: IStateTypes<string>
    updateGameSettings: Function
}

export var defaults: IStateTypes<string> = {
    "Difficulty": "Medium",
    "Duration": "30 seconds",
    "Sizes": "Medium",
    "Cursor": "Crosshair",
    "TargetColour": "#FF0000",
    "Sound": "On"
}

export var Values: IValues = {
    "Difficulty": { "Easy": 1000, "Medium": 800, "Hard": 600, "Very Hard": 400 },
    "Duration": { "15 seconds": 15, "30 seconds": 30, "60 seconds": 60, "90 seconds": 90, "120 seconds": 120 },
    "Sizes": { "Tiny": 10, "Small": 20, "Medium": 40, "Large": 80 },
    "Cursor": { "Default": "default", "Crosshair": "crosshair" },
    "Sound": { "On": true, "Off": false }
}

class GameSettings extends React.Component<ISettingsProps> {
    render() {
        return (
            <div className="game-settings">
                <GameSetting
                    gameSettings={this.props.gameSettings}
                    updateGameSettings={this.props.updateGameSettings}
                    values={Object.keys(Values["Difficulty"])}
                    type={SettingType.select}
                    name={SettingNames.difficulty}
                />
                <GameSetting
                    gameSettings={this.props.gameSettings}
                    updateGameSettings={this.props.updateGameSettings}
                    values={Object.keys(Values["Duration"])}
                    type={SettingType.select}
                    name={SettingNames.duration}
                />
                <GameSetting
                    gameSettings={this.props.gameSettings}
                    updateGameSettings={this.props.updateGameSettings}
                    values={Object.keys(Values["Sizes"])}
                    type={SettingType.select}
                    name={SettingNames.size}
                />
                <GameSetting
                    gameSettings={this.props.gameSettings}
                    updateGameSettings={this.props.updateGameSettings}
                    values={Object.keys(Values["Cursor"])}
                    type={SettingType.select}
                    name={SettingNames.cursor}
                />
                <GameSetting
                    gameSettings={this.props.gameSettings}
                    updateGameSettings={this.props.updateGameSettings}
                    type={SettingType.colour}
                    name={SettingNames.colour}
                />
                <GameSetting
                    gameSettings={this.props.gameSettings}
                    updateGameSettings={this.props.updateGameSettings}
                    values={Object.keys(Values["Sound"])}
                    type={SettingType.toggle}
                    name={SettingNames.sound}
                />
            </div>
        )
    }
}

export { SettingNames };
export default GameSettings;
