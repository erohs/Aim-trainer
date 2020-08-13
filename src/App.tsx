import React from 'react';
import SetupPage from './pages/SetupPage/SetupPage';
import GamePage from './pages/GamePage/GamePage';
import LeaderBoardPage from './pages/LeaderboardPage/LeaderboardPage';
import { defaults } from './components/GameSettings/GameSettings';
import { firebaseApp } from './base';
import firebase from 'firebase';
import { Route, Redirect, Switch } from "react-router-dom";
import NotFound from './pages/NotFound/NotFound';
import ResultsPage from './pages/ResultsPage/ResultsPage';

export interface IStateTypes<TValue> {
  [key: string]: TValue
}

interface IState {
  gameSettings: IStateTypes<string>
  user: IStateTypes<any>;
}

class App extends React.Component {
  state: IState = {
    gameSettings: {},
    user: {},
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user });
      }
    })

    this.setState({ gameSettings: defaults });
    const localStorageRef = localStorage.getItem("gameSettings");
    if (localStorageRef) {
      this.setState({ gameSettings: JSON.parse(localStorageRef) })
    }
  }

  componentDidUpdate() {
    localStorage.setItem("gameSettings", JSON.stringify(this.state.gameSettings))
  }

  updateGameSettings = (gameSetting: IStateTypes<string>) => {
    let gameSettings = { ...this.state.gameSettings };
    gameSettings[Object.keys(gameSetting)[0]] = Object.values(gameSetting)[0];
    this.setState({ gameSettings });
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
      <Switch>
        <Route exact path="/" render={() => (
          <SetupPage
            gameSettings={this.state.gameSettings}
            updateGameSettings={this.updateGameSettings}
            title={"SETTINGS"}
            authenticate={this.authenticate}
            logout={this.logout}
            user={this.state.user}
          />
        )} />
        <Route exact path="/play" render={() => (
          <GamePage
            gameSettings={this.state.gameSettings}
            user={this.state.user}
          />
        )} />
        <Route exact path="/leaderboard" component={LeaderBoardPage} />
        <Route exact path="/results" component={ResultsPage} />
        <Route path="/404" component={NotFound} />
        <Redirect to="/404" />
      </Switch>
    )
  }
}

export default App;
