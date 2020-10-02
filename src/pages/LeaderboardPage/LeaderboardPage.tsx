import React from 'react';
import './style/LeaderBoardPage.css';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import LeaderBoard from '../../components/Leaderboard/Leaderboard';
import DynamicDropdown from '../../components/DynamicDropdown/DynamicDropdown';
import { Settings } from '../../components/GameSettings/Settings';
import { ILeaderboardPageState } from './interfaces/ILeaderboardPageState';


class LeaderboardPage extends React.Component {
    state: ILeaderboardPageState = {
        leaderboard: Settings.gamemode.default.toString()
    }

    componentDidMount() {
        if (localStorage.getItem("leaderboard") != null) this.setState({ leaderboard: localStorage.getItem("leaderboard") });
    }

    onDropdownSelected = (event: React.FormEvent<HTMLSelectElement>) => {
        if (this.state.leaderboard !== event.currentTarget.value) {
            this.setState({ leaderboard: event.currentTarget.value })
            localStorage.setItem("leaderboard", event.currentTarget.value);
        }
    }

    render() {
        return (
            <div className="page">
                <NavigationBar />
                <h2 className="leaderboard-page--title">LEADERBOARD</h2>
                <div className="leaderboard-page--container" >
                    <div className="leaderboard-page--options">
                        <div className="leaderboard-page--options-text">
                            <h3>Selected gamemode: </h3>
                        </div>
                        <DynamicDropdown onSelect={this.onDropdownSelected} default={this.state.leaderboard} values={Settings.gamemode.values} />
                    </div>

                    <LeaderBoard leaderboard={this.state.leaderboard} />
                </div>
            </div>
        )
    }
}

export default LeaderboardPage;
