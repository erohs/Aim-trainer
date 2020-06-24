import React from 'react';
import PageContainer from './pages/PageContainer/PageContainer';
import GamePage from './pages/GamePage/GamePage';
import { defaults } from './components/GameSettings/GameSettings';
import { firebaseApp } from './base';
import firebase from 'firebase';

export interface IStateTypes<TValue> {
  [key: string]: TValue
}

interface IState {
  gameSettings: IStateTypes<string>
  user: IStateTypes<any>;
  playing: boolean
}

class App extends React.Component {
  state: IState = {
    gameSettings: {},
    user: {},
    playing: false
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

  updateHighscore = (uid: string, score: string) => {
    let docRef = firebase.firestore().collection('users').doc(uid);

    let user = {
      ...this.state.user,
      "highscore": score
    }

    docRef.set({ ...user }, { merge: true });

    firebase.firestore().collection('users').get().then((snapshot) => {
      snapshot.docs.forEach(doc => {
        if (doc.id === uid) {
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

  startGame = () => {
    this.setState({ playing: true });
  }

  endGame = () => {
    this.setState({ playing: false });
  }

  render() {
    if (this.state.playing === false) {
      return (
        <PageContainer
          gameSettings={this.state.gameSettings}
          updateGameSettings={this.updateGameSettings}
          title={"SETTINGS"}
          authenticate={this.authenticate}
          logout={this.logout}
          user={this.state.user}
          startGame={this.startGame}
          playing={this.state.playing}
          endGame={this.endGame}
        />
      );
    } else {
      return (
        <GamePage
          playing={this.state.playing}
          endGame={this.endGame}
          gameSettings={this.state.gameSettings}
          user={this.state.user}
        />
      )
    }
  }
}

export default App;
