
import { firebaseApp } from '../../base';
import firebase from 'firebase';
import { AuthProvider } from '@firebase/auth-types';

const authHandler = async (authData: any) => {
    let docRef = firebase.firestore().collection('users').doc(authData.user.uid);

    let user = {
        "uid": authData.user.uid,
        "email": authData.user.email,
        "displayName": authData.user.displayName,
        "photoURL": authData.user.photoURL
    }

    docRef.set({ ...user }, { merge: true });
}

export const getLeaderBoard = async () => {
    const events = await firebase.firestore().collection('highscores').orderBy("highscore", "desc")
    // .limit(10); an add to limit it
    events.get().then((querySnapshot) => {
        const tempDoc = querySnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() }
        });
        return tempDoc;
    });
}

export const syncUser = () => {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            authHandler({ user });
        }
    });
}

export const currentUserId = () => {
    return firebase.auth().currentUser?.uid;
}

export const logout = () => {
    firebase.auth().signOut();
}

export const authenticate = (provider: AuthProvider) => {
    firebaseApp.auth().signInWithPopup(provider).then(authHandler);
}
