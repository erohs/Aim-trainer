import React from 'react';
import './style/Countdown.css';

interface ICountdownProps {
    setGameState: Function
};

interface IState {
    countdown: number
    display: string
}

class Countdown extends React.Component<ICountdownProps> {

    state: IState = {
        countdown: 3,
        display: "block"
    }
    timer = setInterval(() => this.tick(), 1000);

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
        this.setState({ display: "none" })
        this.props.setGameState("playing", true)
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
