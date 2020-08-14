import React from 'react';
import './style/Logo.css';
import { ILogoProps } from './interfaces/ILogoProps';

class Logo extends React.Component<ILogoProps> {
    render() {
        var logoStyle = {
            fontSize: `${this.props.size}px`
        }

        return (
            <div >
                <p className="logo" style={logoStyle}>Aim Trainer <span className="accent-colour">2.0</span></p>
            </div>
        )
    }
}

export default Logo;
