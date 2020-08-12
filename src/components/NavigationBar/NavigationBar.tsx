import React from 'react';
import Logo from '../Logo/Logo';
import './style/NavigationBar.css';
import { Link } from 'react-router-dom';

class NavigationBar extends React.Component {
    render() {
        var currentLocation = window.location.pathname;
        if (currentLocation === "/play") {
            return (
                <div className="navigation-bar">
                    <Logo size={25} />
                    <Link to="/" >
                        <button className="navigation-bar--end-game" >End Game</button>
                    </Link>
                </div>
            )
        }

        return (
            <div className="navigation-bar">
                <Logo size={25} />
                <ul>
                    <li ><Link className="navigation-bar--link" to="/" >Home</Link></li>
                    <li ><Link className="navigation-bar--link" to="/leaderboard" >Leaderboard</Link></li>
                </ul>
            </div>
        )
    }
}

export default NavigationBar;
