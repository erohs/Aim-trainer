import React from 'react';
import './style/DynamicDropdown.css';
import { IDynamicDropdownProps } from './interfaces/IDynamicDropdownProps';

class DynamicDropdown extends React.Component<IDynamicDropdownProps> {
    render() {
        return (
            <div className="dynamic-dropdown">
                <select onClick={(event: React.FormEvent<HTMLSelectElement>) => this.props.onSelect(event)} defaultValue={this.props.default}>
                    {this.props.values.map(item => (
                        <option className="dynamic-dropdown--object" key={item as string} value={item as string}>{item}</option>
                    ))}
                </select>
            </div>

        )
    }
}

export default DynamicDropdown;
