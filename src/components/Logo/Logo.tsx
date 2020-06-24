import React from 'react';
import './style/Logo.css';

type LogoProps = {
    size: number
};

class Logo extends React.Component<LogoProps> {
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
