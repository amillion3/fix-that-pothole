import firebase from 'firebase';

const fbRegisterUser = user => {
  return firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
};

const fbLoginUser = user => {
  return firebase.auth().signInWithEmailAndPassword(user.email, user.password);
};

const fbLogoutUser = () => {
  return firebase.auth().signOut();
};

const fbGetUid = () => {
  return firebase.auth().currentUser.uid;
};

export default {fbRegisterUser, fbLoginUser, fbLogoutUser, fbGetUid};
