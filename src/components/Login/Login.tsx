import React from 'react';
import './style/Login.css';
import firebase from 'firebase';

type LoginProps = {
    authenticate: Function
};

class Login extends React.Component<LoginProps> {
    render() {
        return (
            <nav className="login--container">
                <button
                    className="login google"
                    onClick={() => this.props.authenticate(new firebase.auth.GoogleAuthProvider())}
                >
                    Log in with Google
                </button>
                <button
                    className="login github"
                    onClick={() => this.props.authenticate(new firebase.auth.GithubAuthProvider())}
                >
                    Log in with Github
                </button>
                <button
                    className="login twitter"
                    onClick={() => this.props.authenticate(new firebase.auth.TwitterAuthProvider())}
                >
                    Log in with Twitter
                </button>
                <button
                    className="login facebook"
                    onClick={() => this.props.authenticate(new firebase.auth.FacebookAuthProvider())}
                >
                    Log in with Facebook
                </button>
            </nav>
        )
    }
}

export default Login;
