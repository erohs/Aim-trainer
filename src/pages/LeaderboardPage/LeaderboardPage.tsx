import React from 'react';
import './style/LeaderBoardPage.css';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import LeaderBoard from '../../components/Leaderboard/Leaderboard';
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
        this.setState({ leaderboard: event.currentTarget.value })
        localStorage.setItem("leaderboard", event.currentTarget.value);
    }

    render() {
        return (
            <>
                <NavigationBar />
                <h2 className="leaderboard-page--title">LEADERBOARD</h2>

                <div className="leaderboard-page--container" >
                    <select onChange={this.onDropdownSelected} defaultValue={this.state.leaderboard}>
                        {Settings.gamemode.values.map(item => (
                            <option key={item as string} value={item as string}>{item}</option>
                        ))}
                    </select>
                    <LeaderBoard leaderboard={this.state.leaderboard} />
                </div>
            </>
        )
    }
}

export default LeaderboardPage;
