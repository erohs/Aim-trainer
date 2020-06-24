import React from 'react';
import Logo from '../Logo/Logo';
import './style/NavigationBar.css';

interface INavigationBarProps {
    playing: boolean
    endGame: () => void
}

class NavigationBar extends React.Component<INavigationBarProps> {
    render() {
        if (this.props.playing === false) {
            return (
                <div className="navigation-bar">
                    <Logo size={25} />
                    <ul>
                        <li>Home</li>
                        <li>Leaderboard</li>
                    </ul>
                </div>
            )

        } else {
            return (
                <div className="navigation-bar">
                    <Logo size={25} />
                    <button onClick={this.props.endGame} className={"navigation-bar--end-game"}>End Game</button>
                </div>
            )
        }

    }
}

export default NavigationBar;
