import firebase from "firebase/app";

export default {
  actions: {
    // context, task
    async addTask({ dispatch, commit }, { title }) {
      //context.commit("addTask", task);
      try {
        const uid = await dispatch("getUid");
        const task = await firebase
          .database()
          .ref(`/users/${uid}/tasks`)
          .push({ title });
        return { title, id: task.key };
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    // context, task
    async updateTask({ dispatch, commit }) {
      //context.commit("updateTask", task);
      try {
        const uid = await dispatch("getUid");
        const task =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/tasks`)
              .once("value")
          ).val() || {};
        return Object.keys(task).map(key => ({ ...task[key], id: key }));
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    // context, id
    async deleteTask({ dispatch, commit }, { id }) {
      //context.commit("deleteTask", id);
      try {
        const uid = await dispatch("getUid");
        firebase
          .database()
          .ref(`/users/${uid}/tasks/${id}`)
          .remove();
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    }
  }
};
