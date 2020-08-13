import React from 'react';
import './style/Login.css';
import firebase from 'firebase';
import { authenticate } from '../FirebaseHelper/FirebaseHelper';

class Login extends React.Component {
    render() {
        return (
            <nav className="login--container">
                <button
                    className="login google"
                    onClick={() => authenticate(new firebase.auth.GoogleAuthProvider())}
                >
                    Log in with Google
                </button>
                <button
                    className="login github"
                    onClick={() => authenticate(new firebase.auth.GithubAuthProvider())}
                >
                    Log in with Github
                </button>
                <button
                    className="login twitter"
                    onClick={() => authenticate(new firebase.auth.TwitterAuthProvider())}
                >
                    Log in with Twitter
                </button>
                <button
                    className="login facebook"
                    onClick={() => authenticate(new firebase.auth.FacebookAuthProvider())}
                >
                    Log in with Facebook
                </button>
            </nav>
        )
    }
}

export default Login;
