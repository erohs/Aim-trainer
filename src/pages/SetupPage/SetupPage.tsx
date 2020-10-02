import React from 'react';
import './style/SetupPage.css';
import GameSettings from '../../components/GameSettings/GameSettings';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import GameStart from '../../components/GameStart/GameStart';
import { ISetupPageProps } from './interfaces/ISetupPageProps'

class SetupPage extends React.Component<ISetupPageProps> {
    render() {
        return (
            <div className="page">
                <NavigationBar />
                <div className="setup-page" >
                    <h2 className="setup-page--title">SETTINGS</h2>
                    <GameSettings />
                    <GameStart
                        logout={this.props.logout}
                        authenticate={this.props.authenticate}
                        user={this.props.user}
                    />
                </div>
            </div>
        )
    }
}

export default SetupPage;
