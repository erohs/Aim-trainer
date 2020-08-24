import React from 'react';
import SetupPage from './pages/SetupPage/SetupPage';
import GamePage from './pages/GamePage/GamePage';
import LeaderBoardPage from './pages/LeaderboardPage/LeaderboardPage';
import { firebaseApp } from './base';
import firebase from 'firebase';
import { Route, Redirect, Switch } from "react-router-dom";
import NotFound from './pages/NotFound/NotFound';
import ResultsPage from './pages/ResultsPage/ResultsPage';

export interface IStateTypes<TValue> {
  [key: string]: TValue
}

interface IState {
  user: IStateTypes<any>;
}

class App extends React.Component {
  state: IState = {
    user: {},
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user });
      }
    })
  }


  authHandler = async (authData: any) => {
    let docRef = firebase.firestore().collection('users').doc(authData.user.uid);

    let user = {
      ...this.state.user,
      "uid": authData.user.uid,
      "email": authData.user.email,
      "displayName": authData.user.displayName,
      "photoURL": authData.user.photoURL
    }

    docRef.set({ ...user }, { merge: true });

    firebase.firestore().collection('users').get().then((snapshot) => {
      snapshot.docs.forEach(doc => {
        if (doc.id === authData.user.uid) {
          let items = doc.data();
          this.setState({ user: items })
        }
      });
    });
  }

  authenticate = (provider: firebase.auth.OAuthProvider) => {
    firebaseApp.auth().signInWithPopup(provider).then(this.authHandler);
  }

  logout = async () => {
    await firebase.auth().signOut();
    this.setState({ user: {} })
  }

  render() {
    return (
      <div id='app' className="dark-theme">
        <Switch >
          <Route exact path="/" render={() => (
            <SetupPage
              authenticate={this.authenticate}
              logout={this.logout}
              user={this.state.user}
            />
          )} />
          <Route exact path="/play" render={() => (
            <GamePage user={this.state.user} />
          )} />
          <Route exact path="/leaderboard" component={LeaderBoardPage} />
          <Route exact path="/results" component={ResultsPage} />
          <Route path="/404" component={NotFound} />
          <Redirect to="/404" />
        </Switch>
      </div>
    )
  }
}

export default App;
