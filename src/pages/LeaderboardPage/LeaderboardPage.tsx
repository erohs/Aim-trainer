import React from 'react';
import './style/LeaderBoardPage.css';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import LeaderBoard from '../../components/Leaderboard/Leaderboard';

class LeaderboardPage extends React.Component {
    render() {
        return (
            <>
                <NavigationBar />
                <h2 className="leaderboard-page--title">LEADERBOARD</h2>
                <div className="leaderboard-page--container" >
                    <LeaderBoard />
                </div>
            </>
        )
    }
}

export default LeaderboardPage;
