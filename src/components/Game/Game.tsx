import React from 'react';
import './style/Game.css';
import Target from '../Target/Target';
import Countdown from '../Countdown/Countdown';
import GameOver from '../GameOver/GameOver';
import { IStateTypes } from '../../App';
import { Values } from '../GameSettings/GameSettings';
import { isNullOrUndefined } from 'util';

interface IGameProps {
    gameSettings: IStateTypes<string>
    user: IStateTypes<any>
};

interface IState {
    targets: IStateTypes<any>
    settings: IStateTypes<any>
    playing: boolean
    gameover: boolean
    targetCount: IStateTypes<number>
    clickCount: IStateTypes<number>
}

class Game extends React.Component<IGameProps> {

    state: IState = {
        targets: {},
        settings: {},
        playing: false,
        gameover: false,
        targetCount: {
            total: 0,
            misses: 0,
            hits: 0
        },
        clickCount: {
            total: 0,
            misses: 0,
            hits: 0
        }
    }

    speed: any;

    tick() {
        const current = this.state.settings.Duration;
        if (current <= 0) {
            this.transition();
        } else if (this.state.playing === true) {
            const settings = { ...this.state.settings };
            settings["Duration"] = current - (0.001 * this.state.settings.Difficulty);
            this.setState({ settings });
            this.addTarget();
        }
    }

    transition() {
        this.setTargetCount("misses");
        this.setClickCount("total")
        clearInterval(this.speed);
        this.setGameState("gameover", true)
    }

    setColour = (colour: string) => {
        let output: string = "#FF0000";
        const re = /[0-9A-Fa-f]{6}/g;
        if (!isNullOrUndefined(colour) && re.test(colour)) output = colour;
        return output;
    }

    manageSettings = () => {
        let settings = { ...this.state.settings }
        Object.keys(this.props.gameSettings).forEach((key) => {
            key === "TargetColour" ? settings[key] = this.setColour(this.props.gameSettings[key].toString()) : settings[key] = Values[key][this.props.gameSettings[key]];
        })
        this.setState({ settings })
        this.speed = setInterval(() => this.tick(), settings.Difficulty);
    }

    componentDidMount() {
        this.manageSettings()
    }

    componentWillUnmount() {
        clearInterval(this.speed);
    }

    setTargetCount = (name: string) => {
        const targetCount = { ...this.state.targetCount }
        targetCount[name] = targetCount[name] + 1;

        if (name === "misses") {
            targetCount[name] = targetCount["total"] - targetCount["hits"]
        }

        this.setState({ targetCount });
    }

    setClickCount = (name: string) => {
        const clickCount = { ...this.state.clickCount }
        clickCount[name] = clickCount[name] + 1;

        if (name === "total") {
            clickCount[name] = clickCount["misses"] + clickCount["hits"]
        }

        this.setState({ clickCount });
    }

    addTarget = () => {
        var key = Date.now();
        var targets = { ...this.state.targets };
        var position = this.randomPosition();
        targets[key] = <Target key={key} index={key} targets={this.state.targets} removeOnClick={this.removeOnClick} position={position} settings={this.state.settings} />;
        this.setTargetCount("total")
        this.setState({ targets }, () => {
            if (Object.keys(this.state.targets).length > 6) {
                this.removeTarget()
            }
        })
    }

    removeTarget = () => {
        var targets = { ...this.state.targets };
        var firstKey = Object.keys(targets)[0]
        delete targets[firstKey];
        this.setState({ targets });
    }

    removeOnClick = (id: number) => {
        const targets = { ...this.state.targets };
        delete targets[id];
        this.setState({ targets });
        this.setTargetCount("hits");
        this.setClickCount("hits");
    }

    randomPosition = () => {
        const area = document.getElementsByClassName('game-area')[0] as HTMLDivElement;
        const offset = this.state.settings.Sizes;
        const rect = area.getBoundingClientRect();
        const minx = rect.left + offset;
        const maxx = rect.right - offset;
        const miny = rect.top;
        const maxy = rect.bottom - offset
        const x = Math.floor(Math.random() * (maxx - minx)) + minx;
        const y = Math.floor(Math.random() * (maxy - miny)) + miny;
        return [x, y]
    }

    setGameState = (name: string, state: boolean) => {
        if (name === "playing") {
            this.setState({ playing: state });
        } else {
            this.setState({ gameover: state });
        }
    }

    render() {
        var gameAreaStyle = {
            cursor: this.state.settings.Cursor
        }

        if (this.state.playing === false && this.state.gameover === false) {
            return (
                <div style={gameAreaStyle} className="game-area">
                    <Countdown setGameState={this.setGameState} />
                </div>
            )
        } else if (this.state.gameover === false) {
            return (
                <div style={gameAreaStyle} onClick={() => this.setClickCount("misses")} className="game-area">
                    {Object.keys(this.state.targets).map(key => (this.state.targets[key]))}
                </div>
            )
        } else {
            return (
                <div className="game-area">
                    <GameOver clickCount={this.state.clickCount} targetCount={this.state.targetCount} />
                </div>
            )
        }
    }
}

export default Game;
