import React from 'react';
import './style/GameOver.css';
import { IGameOverProps } from './interfaces/IGameOverProps';
import { IGameOverState } from './interfaces/IGameOverState';

class GameOver extends React.Component<IGameOverProps> {

    state: IGameOverState = {
        countdown: 2
    }

    timer: any;

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    componentDidMount() {
        this.timer = setInterval(() => this.tick(), 1000);
    }

    tick() {
        const current = this.state.countdown;
        if (current === 1) {
            this.transition();
        } else {
            this.setState({ countdown: current - 1 });
        }
    }

    transition() {
        clearInterval(this.timer);
        this.setState({ display: "none" });
        this.props.onLoad();
    }
    render() {
        return (
            <div className="game-over">
                GAME OVER
            </div>
        )
    }
}

export default GameOver;
