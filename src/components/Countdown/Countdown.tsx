import React from 'react';
import './style/Countdown.css';
import { ICountdownProps } from './interfaces/ICountdownProps';
import { ICountdownState } from './interfaces/ICountdownState';

class Countdown extends React.Component<ICountdownProps> {

    state: ICountdownState = {
        countdown: 3,
        display: "block"
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
        this.props.startGame();
    }

    render() {
        const style = {
            display: this.state.display
        }

        return (
            <p style={style} className="countdown">
                {this.state.countdown}
            </p>
        )
    }
}

export default Countdown;
