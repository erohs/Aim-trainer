import React from 'react';
import './style/ResultsPage.css';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import Results from '../../components/Results/Results';
import { setDefaultSettings } from '../../helpers/SettingsHelper';
import { storeDefaultResults, IResults } from '../../helpers/ResultsHelper';
import { IResultsPageState } from './interfaces/IResultsPageState';
import { Link } from 'react-router-dom';
import firebase from 'firebase';


class ResultsPage extends React.Component {
    state: IResultsPageState = {
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
        name: ""
    }

    componentDidMount() {
        if (localStorage.getItem("results") === null) {
            if (localStorage.getItem("settings") === null) setDefaultSettings();
            const settings = JSON.parse(localStorage.getItem("settings") || '{}');
            storeDefaultResults(settings);
        }

        const results = JSON.parse(localStorage.getItem("results") || '{}');
        this.setState({ results })
    }

    continue = () => {
        this.updateLeaderBoard(this.state.name, this.state.results);
        localStorage.removeItem("results");
    }

    updateLeaderBoard = (name: string, results: IResults) => {
        const collection = `${results.settings.gamemode}Highscores`;
        localStorage.setItem("leaderboard", results.settings.gamemode.toString());
        const docRef = firebase.firestore().collection(collection).doc(); //add users uid here when login is added
        let highscore = {
            "name": name,
            "results": results
        }
        docRef.set({ ...highscore }, { merge: false });
    }

    handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({ name: event.currentTarget.value });
    }

    render() {
        return (
            <>
                <NavigationBar />
                <div className="results-page">
                    <h2 className="results-page--title">RESULTS</h2>
                    <Results results={this.state.results} />
                </div>
                <div className="results-page--options">
                    <Link tabIndex={-1} to="/play" >
                        <button className="results-page--play-again" >Play Again</button>
                    </Link>
                    <Link tabIndex={-1} to="/" >
                        <button className="results-page--setup" >Setup</button>
                    </Link>
                    <div className="results-page--save">
                        <input onChange={this.handleChange} value={this.state.name} placeholder="Enter name..." type="text" className="results-page--save-input" />
                        <Link tabIndex={-1} to="/leaderboard" >
                            <button className="results-page--save-submit" onClick={this.continue} disabled={!this.state.name || this.state.results.targets.total === 0}>Save</button>
                        </Link>
                    </div>
                </div>
            </>
        )
    }
}

export default ResultsPage;
