import React from 'react';
import './style/Game.css';
import Target from '../Target/Target';
import Countdown from '../Countdown/Countdown';
import { IGameState } from './interfaces/IGameState';
import * as ResultsHelper from '../../helpers/ResultsHelper';
import { Redirect } from 'react-router-dom';
import { randomPosition } from '../../helpers/GameHelper';

const values = [1000, 800, 600, 400]

class Game extends React.Component {
    state: IGameState = {
        targets: {},
        settings: {},
        results: {
            score: 0,
            combo: 1,
            targets: {
                total: 0,
                hits: 0,
                missed: 0,
                perSecond: 0,
                efficiency: 0
            },
            clicks: {
                total: 0,
                hits: 0,
                missed: 0,
                perSecond: 0,
                accuracy: 0
            },
            settings: {}
        },
        redirect: false,
        timer: 0
    }

    speed: any;

    tick() {
        if (this.state.timer <= 0) {
            this.transition();
            return;
        }

        this.addTarget();
        this.setState({ timer: this.state.timer - (0.001 * values[this.state.settings.difficulty]) });
    }

    transition() {
        clearInterval(this.speed);
        this.setState({ results: ResultsHelper.sanitizeResults(this.state.results) });
        localStorage.setItem("results", JSON.stringify(this.state.results));
        this.setState({ redirect: true })
    }

    componentDidMount() {
        const settings = JSON.parse(localStorage.getItem("settings") || '{}');
        this.setState({ settings: settings });
        this.setState({ results: ResultsHelper.setDefaultResults(this.state.results, settings) })
        this.setState({ timer: settings.duration })
    }

    componentWillUnmount() {
        clearInterval(this.speed);
    }

    startGame = () => {
        this.speed = setInterval(() => this.tick(), values[this.state.settings.difficulty]);
    }

    addTarget = () => {
        var key = Date.now();
        var targets = { ...this.state.targets };
        const area = document.getElementsByClassName('game-area')[0] as HTMLDivElement;
        var position = randomPosition(area, this.state.settings.sizes);
        targets[key] = <Target key={key} index={key} targets={this.state.targets} removeOnClick={this.removeOnClick} position={position} settings={this.state.settings} />;
        this.setState({ results: ResultsHelper.updateTargetsTotal(this.state.results) });
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
        this.setState({ results: ResultsHelper.updateTargetsMissed(this.state.results) });
    }

    removeOnClick = (id: number) => {
        const targets = { ...this.state.targets };
        delete targets[id];
        this.setState({ targets });
        this.setState({ results: ResultsHelper.updateHits(this.state.timer, this.state.results) });
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

        if (this.state.redirect) return <Redirect to="/results" />

        return (
            <div style={gameAreaStyle} onClick={() => this.setState({ results: ResultsHelper.updateClicksMissed(this.state.timer, this.state.results) })} className="game-area">
                <Countdown startGame={this.startGame} />
                {Object.keys(this.state.targets).map(key => (this.state.targets[key]))}
            </div>
        )

    }
}

export default Game;
