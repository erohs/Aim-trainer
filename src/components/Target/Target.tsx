import React from 'react';
import './style/Target.css';
import { ITargetProps } from './interfaces/ITargetProps';

class Target extends React.Component<ITargetProps> {
    render() {
        var targetStyle = {
            width: `${this.props.settings.Sizes}px`,
            left: `${this.props.position[0]}px`,
            top: `${this.props.position[1]}px`,
            height: `${this.props.settings.Sizes}px`,
            backgroundColor: this.props.settings.TargetColour
        }

        return <div onMouseDown={() => this.props.removeOnClick(this.props.index)} className="target" style={targetStyle} />
    }
}

export default Target;
