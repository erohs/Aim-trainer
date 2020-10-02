import React from 'react';
import './style/TrackingGame.css';
import TrackingTarget from '../TrackingTarget/TrackingTarget';
import Countdown from '../Countdown/Countdown';
import { ITrackingGameState } from './interfaces/ITrackingGameState';
import * as ResultsHelper from '../../helpers/ResultsHelper';
import { Redirect } from 'react-router-dom';
import { randomPosition } from '../../helpers/GameHelper';

class TrackingGame extends React.Component {
    state: ITrackingGameState = {
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
    timer: any;

    timeLeft = () => {
        let timer = this.state.timer;
        --timer
        this.setState({ timer })
        if (this.state.timer === 0) {
            this.endGame();
        }
    }

    endGame() {
        clearInterval(this.timer);
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
        this.timer = setInterval(() => this.timeLeft(), 1000);
        this.addTarget()
        this.speed = setInterval(() => this.addTarget(), 5000);
    }

    addTarget = () => {
        const key = Date.now();
        const area = document.getElementsByClassName('game-area')[0] as HTMLDivElement;
        const position = randomPosition(area, this.state.settings.sizes);
        const targets = { ...this.state.targets };

        targets[key] = <TrackingTarget key={key}
            index={key}
            targets={this.state.targets}
            removeOnClick={this.removeOnClick}
            position={position}
            settings={this.state.settings} />;

        this.setState({ results: ResultsHelper.updateTargetsTotal(this.state.results), targets }, () => {
            if (Object.keys(this.state.targets).length > 6) {
                this.removeTarget()
            }
        });
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

export default TrackingGame;
