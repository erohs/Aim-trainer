import React from 'react';
import './style/Target.css';
import { IStateTypes } from '../../App';

interface ITargetProps {
    index: number
    targets: IStateTypes<any>
    removeOnClick: (id: number) => void
    position: Array<number>
    settings: IStateTypes<any>
};

class Target extends React.Component<ITargetProps> {

    removeThis = (event: React.FormEvent<HTMLDivElement>) => {
        this.props.removeOnClick(this.props.index)
    }

    render() {
        var targetStyle = {
            width: `${this.props.settings.Size}px`,
            left: `${this.props.position[0]}px`,
            top: `${this.props.position[1]}px`,
            height: `${this.props.settings.Size}px`,
            backgroundColor: this.props.settings.Colour
        }

        return <div onMouseDown={this.removeThis} className="target" style={targetStyle} />
    }
}

export default Target;
