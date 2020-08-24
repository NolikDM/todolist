//import firebase from "firebase/app";

export default {
  actions: {
    // context, task
    //{ dispatch, commit }, { title }
    addTask(context, task) {
      context.commit("addTask", task);
      // try {
      //   const uid = await dispatch("getUid");
      //   const task = await firebase
      //     .database()
      //     .ref(`/users/${uid}/tasks`)
      //     .push({ title });
      //   return { title, id: task.key };
      // } catch (e) {
      //   commit("setError", e);
      //   throw e;
      // }
    },
    // context, task
    //{ dispatch, commit }
    updateTask(context, task) {
      context.commit("updateTask", task);
      // try {
      //   const uid = await dispatch("getUid");
      //   const task =
      //     (
      //       await firebase
      //         .database()
      //         .ref(`/users/${uid}/tasks`)
      //         .once("value")
      //     ).val() || {};
      //   return Object.keys(task).map(key => ({ ...task[key], id: key }));
      // } catch (e) {
      //   commit("setError", e);
      //   throw e;
      // }
    },
    // context, id
    // { dispatch, commit }, { id }
    deleteTask(context, id) {
      context.commit("deleteTask", id);
      //   try {
      //     const uid = await dispatch("getUid");
      //     firebase
      //       .database()
      //       .ref(`/users/${uid}/tasks/${id}`)
      //       .remove();
      //   } catch (e) {
      //     commit("setError", e);
      //     throw e;
      //   }
    }
  }
};
