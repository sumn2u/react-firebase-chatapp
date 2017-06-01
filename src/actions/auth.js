
import { auth, database, googleAuthProvider } from '../firebase';
// import { addUser } from './users';
import registerMessaging from '../request-messeging-permission'


import pick from 'lodash/pick';


const usersRef = database.ref('users');

export const signIn = () => {
  return (dispatch) => {
    dispatch({ type: 'ATTEMPTING_LOGIN'})
      auth.signInWithPopup(googleAuthProvider);
    //  setTimeout(() => {
    //   dispatch(signedIn({
    //     type: 'SIGN_IN',
    //     email: 'bill@example.com',
    //     displayName: 'Bill Murray',
    //     photoURL: 'http://www.fillmurray.com/200/200',
    //     uid: 'firstUser'
    //   }));
    // }, 2000)
  }
  // return {
  //   type: 'SIGN_IN',
  //   email: 'bill@example.com',
  //   displayName: 'Bill Murray',
  //   photoURL: 'http://www.fillmurray.com/200/200',
  //   uid: 'firstUser'
  // };
};

export const signOut = () => {
  // return {
  //   type: 'SIGN_OUT'
  // };
  return (dispatch) => {
    dispatch({ type: 'ATTEMPTING_LOGIN'})
    auth.signOut();
    // setTimeout(() => {
    //   dispatch(signedOut());
    // }, 2000)
  }
};

const signedIn = (user) => {
  return {
        type: 'SIGN_IN',
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        uid: user.uid
      }
}


const signedOut = () => {
  return {
        type: 'SIGN_OUT'
      };
};

export const startListeningToAuthChanges = () =>{
  return (dispatch) => {
    auth.onAuthStateChanged((user) => {
      if(user){
        dispatch(signedIn(user));
        usersRef.child(user.uid).set(pick(user, ['displayName', 'photoURL', 'email', 'uid']));
        // dispatch(addUser(user));
        registerMessaging(user);
      }else{
         dispatch(signedOut());
      }
    })
  }
}

