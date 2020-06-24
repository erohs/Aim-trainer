import React from 'react';
import './style/GameSetting.css';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import { SettingNames } from '../GameSettings/GameSettings';
import { IStateTypes } from '../../App';
import { isNullOrUndefined } from 'util';

enum SettingType {
    "select",
    "colour",
    "toggle"
}

interface IGameSettingProps {
    type: SettingType,
    name: SettingNames,
    values?: Array<string>,
    gameSettings: IStateTypes<string>,
    updateGameSettings: Function
};

class GameSetting extends React.Component<IGameSettingProps> {
    nextValue = () => {
        var index = this.props.values!.indexOf(this.props.gameSettings[this.props.name])
        var nextIndex = index! + 1;
        var nextArrayLength = this.props.values!.length - 1;
        var nextValue = "";
        if (nextIndex > nextArrayLength) {
            nextValue = this.props.values![0]
        } else {
            nextValue = this.props.values![nextIndex];
        }
        const updatedGameSettings = {
            [this.props.name]: nextValue
        };
        this.props.updateGameSettings(updatedGameSettings);
    }

    prevValue = () => {
        var index = this.props.values!.indexOf(this.props.gameSettings[this.props.name])
        var prevIndex = index! - 1;
        var prevValue = "";
        if (prevIndex < 0) {
            var prevArrayLength = this.props.values!.length
            prevValue = this.props.values![prevArrayLength - 1];
        } else {
            prevValue = this.props.values![prevIndex];
        }
        const updatedGameSettings = {
            [this.props.name]: prevValue
        };
        this.props.updateGameSettings(updatedGameSettings);
    }

    handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        const updatedGameSettings = {
            [this.props.name]: event.currentTarget.value
        };
        this.props.updateGameSettings(updatedGameSettings);
    }

    handleChangeCheckbox = (event: React.FormEvent<HTMLInputElement>) => {
        let checked = "";
        event.currentTarget.checked === true ? checked = "On" : checked = "Off";
        const updatedGameSettings = {
            [this.props.name]: checked
        };
        this.props.updateGameSettings(updatedGameSettings);
    }

    render() {
        let colour: string = "#FF0000";
        let userColour: string = this.props.gameSettings[this.props.name];
        const re = /[0-9A-Fa-f]{6}/g;
        if (!isNullOrUndefined(userColour) && re.test(userColour)) colour = userColour;

        let viewColour = {
            backgroundColor: colour
        }

        switch (this.props.type) {
            case SettingType.select:
                return (
                    <div className="game-setting--container">
                        <p className="game-setting--name">{this.props.name}</p>
                        <div className="game-setting--selector">
                            <p>{this.props.gameSettings[this.props.name] || this.props.values![0]}</p>
                            <div className="game-setting--arrows">
                                <button onClick={this.nextValue} className="game-setting--arrow">&#x25B2;</button>
                                <button onClick={this.prevValue} className="game-setting--arrow">&#x25BC;</button>
                            </div>
                        </div>
                    </div>
                )
            case SettingType.colour:
                return (
                    <div className="game-setting--container">
                        <p className="game-setting--name">{this.props.name}</p>
                        <div className="game-setting--selector">
                            <input
                                className="game-setting--input"
                                type="text"
                                value={this.props.gameSettings[this.props.name] || "#FF0000"}
                                onChange={this.handleChange}
                            />
                            <div style={viewColour} className="game-setting--colour"></div>
                        </div>
                    </div>
                )
            case SettingType.toggle:
                return (
                    <div className="game-setting--container">
                        <p className="game-setting--name">{this.props.name}</p>
                        <div className="game-setting--selector">
                            <p>{this.props.gameSettings[this.props.name] || this.props.values![0]}</p>
                            <ToggleSwitch
                                value={this.props.gameSettings[this.props.name] || this.props.values![0]}
                                handleChangeCheckbox={this.handleChangeCheckbox}
                            />
                        </div>
                    </div>
                )
        }
    }
}

export default GameSetting;
export { SettingType };
