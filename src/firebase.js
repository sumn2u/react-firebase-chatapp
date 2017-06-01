import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyB6T2pX4E1BXga0pawfRbfkP2iEDSnqVXY",
    authDomain: "chat-apps-d5c48.firebaseapp.com",
    databaseURL: "https://chat-apps-d5c48.firebaseio.com",
    projectId: "chat-apps-d5c48",
    storageBucket: "chat-apps-d5c48.appspot.com",
    messagingSenderId: "643102948803"
};

firebase.initializeApp(config);

export default firebase;

export const database = firebase.database();
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const messaging = firebase.messaging();
