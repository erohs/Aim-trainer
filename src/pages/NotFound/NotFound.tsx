import React from 'react';
import './style/NotFound.css';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import { Link } from 'react-router-dom';

class NotFound extends React.Component {
    render() {
        return (
            <div>
                <NavigationBar />
                <div className="not-found">
                    <h2 className="not-found--header">404</h2>
                    <h3 className="not-found--sub-header">Page not found</h3>
                    <p className="not-found--text">The page you are looking for does not exist</p>
                    <Link tabIndex={-1} to="/">
                        <button className="not-found--button">
                            Homepage
                        </button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default NotFound;
