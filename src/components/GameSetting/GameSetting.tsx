import React from 'react';
import './style/GameSetting.css';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import { IGameSettingProps } from './interfaces/IGameSettingProps';
import { SettingTypes } from '../../enums';


class GameSetting extends React.Component<IGameSettingProps> {
    nextValue = () => {
        const index = this.props.values.indexOf(this.props.currentValue)
        const nextIndex = index + 1;
        const nextArrayLength = this.props.values.length - 1;
        const nextValue = nextIndex > nextArrayLength ? this.props.values[0] : this.props.values[nextIndex];

        this.props.updateSettings(this.props.name, nextValue);
    }

    prevValue = () => {
        const index = this.props.values.indexOf(this.props.currentValue)
        const prevIndex = index - 1;
        const prevArrayLength = this.props.values.length
        const prevValue = prevIndex < 0 ? this.props.values[prevArrayLength - 1] : this.props.values[prevIndex];

        this.props.updateSettings(this.props.name, prevValue);
    }

    handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.props.updateSettings(this.props.name, event.currentTarget.value);
    }

    handleChangeCheckbox = (event: React.FormEvent<HTMLInputElement>) => {
        this.props.updateSettings(this.props.name, event.currentTarget.checked);
    }

    render() {
        switch (this.props.type) {
            case SettingTypes.select:
                return (
                    <div className="game-setting--container">
                        <p className="game-setting--name">{this.props.name}</p>
                        <div className="game-setting--selector">
                            <p>{this.props.types[this.props.values.indexOf(this.props.currentValue)]}</p>
                            <div className="game-setting--arrows">
                                <button onClick={this.prevValue} className="game-setting--arrow left">&#x25C0;</button>
                                <button onClick={this.nextValue} className="game-setting--arrow right">&#x25B6;</button>
                            </div>
                        </div>
                    </div>
                )
            case SettingTypes.colour:
                return (
                    <div className="game-setting--container">
                        <p className="game-setting--name">{this.props.name}</p>
                        <div className="game-setting--selector">
                            <input
                                className="game-setting--input"
                                type="text"
                                value={this.props.currentValue as string}
                                onChange={this.handleChange}
                            />
                            <div style={{ background: this.props.currentValue as string }} className="game-setting--colour"></div>
                        </div>
                    </div>
                )
            case SettingTypes.toggle:
                return (
                    <div className="game-setting--container">
                        <p className="game-setting--name">{this.props.name}</p>
                        <div className="game-setting--selector">
                            <p>{this.props.types[this.props.values.indexOf(this.props.currentValue)]}</p>
                            <ToggleSwitch
                                value={this.props.currentValue as boolean}
                                handleChangeCheckbox={this.handleChangeCheckbox}
                            />
                        </div>
                    </div>
                )
        }
    }
}

export default GameSetting;
