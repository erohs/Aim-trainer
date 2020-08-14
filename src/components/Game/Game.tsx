import React from 'react';
import './style/Game.css';
import Target from '../Target/Target';
import Countdown from '../Countdown/Countdown';
import GameOver from '../GameOver/GameOver';
import { IGameState } from './interfaces/IGameState';
import { setDefaultSettings } from '../../helpers/SettingsHelper';

class Game extends React.Component {

    state: IGameState = {
        targets: {},
        settings: {},
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
        },
        score: 0
    }

    speed: any;

    tick() {
        if (this.state.settings.duration <= 0) {
            this.transition();
            return;
        }
        this.addTarget();
        const settings = { ...this.state.settings };
        settings.duration = this.state.settings.duration - (0.001 * this.state.settings.difficulty);
        this.setState({ settings });

    }

    transition() {
        this.setGameState("gameover", true)
        this.setTargetCount("misses");
        this.setClickCount("total")
        clearInterval(this.speed);
        this.calculateScore()
    }

    calculateScore = () => {
        let calculatedScore = this.state.targetCount.hits - this.state.clickCount.misses;
        calculatedScore = (calculatedScore * 1000) / this.state.settings.difficulty;
        calculatedScore = calculatedScore * + this.state.settings.duration;
        calculatedScore = calculatedScore * this.state.settings.sizes;
        this.setState({ score: calculatedScore });
    }

    componentDidMount() {
        if (localStorage.getItem("settings") === null) {
            setDefaultSettings();
        }
        const settings = JSON.parse(localStorage.getItem("settings") || '{}');
        this.setState({ settings: settings });
    }

    componentWillUnmount() {
        clearInterval(this.speed);
    }

    startGame = () => {
        this.speed = setInterval(() => this.tick(), this.state.settings.difficulty);
    }

    setTargetCount = (name: string) => {
        const targetCount = { ...this.state.targetCount }
        targetCount[name] = targetCount[name] + 1;
        if (name === "misses") targetCount[name] = targetCount["total"] - targetCount["hits"];
        this.setState({ targetCount });
    }

    setClickCount = (name: string) => {
        const clickCount = { ...this.state.clickCount }
        if (this.state.targetCount.total > 0) clickCount[name] = clickCount[name] + 1;
        if (name === "total") clickCount[name] = clickCount["misses"] + clickCount["hits"]
        this.setState({ clickCount });
    }

    addTarget = () => {
        var key = Date.now();
        var targets = { ...this.state.targets };
        const area = document.getElementsByClassName('game-area')[0] as HTMLDivElement;
        var position = this.randomPosition(area);
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

    randomPosition = (area: HTMLDivElement) => {
        const offset = this.state.settings.sizes;
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
        const gameAreaStyle = {
            cursor: this.state.settings.cursor
        }

        if (this.state.gameover === false) {
            return (
                <div style={gameAreaStyle} onClick={() => this.setClickCount("misses")} className="game-area">
                    <Countdown startGame={this.startGame} />
                    {Object.keys(this.state.targets).map(key => (this.state.targets[key]))}
                </div>
            )
        } else {
            return (
                <div className="game-area">
                    <GameOver
                        clickCount={this.state.clickCount}
                        targetCount={this.state.targetCount}
                        score={this.state.score}
                    />
                </div>
            )
        }
    }
}

export default Game;
