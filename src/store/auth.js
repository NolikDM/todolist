import firebase from "firebase/app";

export default {
  actions: {
    async login({ email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (e) {
        // console.log(e.message);
        console.log();
        throw e;
      }
    },
    async register({ dispatch }, { email, password, name }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const uid = await dispatch("getUid");
        await firebase
          .database()
          .ref(`/users/${uid}/info`)
          .set({
            name
          });
      } catch (e) {
        console.log();
        throw e;
      }
    },
    getUid() {
      const user = firebase.auth().currentUser;
      return user ? user.uid : null;
    },
    async logout() {
      await firebase.auth().signOut();
    }
  }
};
