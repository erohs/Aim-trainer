import React from 'react';
import './style/ToggleSwitch.css';
import { IToggleSwitchProps } from './interfaces/IToggleSwitchProps';

class ToggleSwitch extends React.Component<IToggleSwitchProps> {
    render() {
        let checked: boolean = true;
        if (this.props.value === "Off") checked = false;

        return (
            <label className="toggle-switch">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={this.props.handleChangeCheckbox} />
                <span className="toggle-switch--slider round"></span>
            </label>
        )
    }
}

export default ToggleSwitch;
