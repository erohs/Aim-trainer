import React from 'react';
import './style/MovingTarget.css';
import { IMovingTargetProps } from './interfaces/IMovingTargetProps';
import { IMovingTargetState } from './interfaces/IMovingTargetState';
import { calculateNewPosition, calculateAngle } from '../../helpers/GameHelper';

class MovingTarget extends React.Component<IMovingTargetProps> {
    speeds: Array<number> = [2, 4, 6, 8];
    chance: Array<number> = [20, 40, 60, 80];
    count: number = 0;
    position: any;

    state: IMovingTargetState = {
        currentXPosition: 0,
        currentYPosition: 0,
        angle: 0
    }

    componentDidMount() {
        this.setState({
            currentXPosition: this.props.position[0],
            currentYPosition: this.props.position[1],
            angle: calculateAngle(1, 360)
        });

        this.position = setInterval(() => this.updatePosition(), 1000 / 60);
    }

    updatePosition = () => {
        ++this.count
        if (this.count === 60) {
            this.count = 0;

            if (Math.random() * 100 < this.chance[this.props.settings.difficulty]) {
                this.setState({
                    angle: calculateAngle(1, 360)
                });
            }
        }

        const x = this.state.currentXPosition;
        const y = this.state.currentYPosition;
        const angle = this.state.angle
        const speed = this.speeds[this.props.settings.difficulty];
        const area = document.getElementsByClassName('game-area')[0] as HTMLDivElement;
        const size = this.props.settings.sizes;

        const position: Array<number> = calculateNewPosition(x, y, angle, speed, area, size);

        this.setState({
            currentXPosition: position[0],
            currentYPosition: position[1],
            angle: position[2]
        });
    }

    componentWillUnmount() {
        clearInterval(this.position);
    }

    render() {
        let targetStyle = {
            width: `${this.props.settings.sizes}px`,
            left: `${this.state.currentXPosition}px`,
            top: `${this.state.currentYPosition}px`,
            height: `${this.props.settings.sizes}px`,
            backgroundColor: this.props.settings.colour
        }

        return <div id={this.props.index.toString()} onMouseDown={() => this.props.removeOnClick(this.props.index)} className="target" style={targetStyle} />
    }
}

export default MovingTarget;
