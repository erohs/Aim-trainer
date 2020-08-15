import React from 'react';
import './style/ResultsPage.css';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import { setDefaultSettings } from '../../helpers/SettingsHelper';
import { storeDefaultResults } from '../../helpers/ResultsHelper';
import { IResultsPageState } from './interfaces/IResultsPageState';

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

    render() {
        return (
            <>
                <NavigationBar />
                <div className="results-page">
                    <button onClick={() => console.log(this.state.results)}>clicks</button>
                </div>
            </>
        )
    }
}

export default ResultsPage;
