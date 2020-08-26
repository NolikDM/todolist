//import * as firebase from "firebase";
import "firebase/database";
import "firebase/auth";

export default {
  state: {
    loading: true,
    tasks: []
  },
  getters: {
    tasksFiltered(state) {
      return state.tasks;
    }
  },
  mutations: {
    addTask(state, task) {
      state.tasks.push({
        id: task.id,
        title: task.title,
        editing: false
      });
    },
    updateTask(state, task) {
      const index = state.tasks.findIndex(item => item.id == task.id);
      state.tasks.splice(index, 1, {
        id: task.id,
        title: task.title,
        editing: task.editing
      });
    },
    deleteTask(state, id) {
      const index = state.tasks.findIndex(item => item.id == id);
      if (index >= 0) {
        state.tasks.splice(index, 1);
      }
    },
    retrieveTasks(state, tasks) {
      state.tasks = tasks;
    },
    updateLoading(state, loading) {
      state.loading = loading;
    }
  },
  actions: {
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

      // let db = firebase.database();
      // const uid = await dispatch("getUid");
      // db.ref(`/users/${uid}/tasks/` + Date.now()).set(
      //   {
      //     title: title
      //   },
      //   er => {
      //     if (er) {
      //       console.log(er.message);
      //     } else {
      //       console.log("created");
      //     }
      //   }
      // );
    },
    //{ dispatch, commit }, { id, title }
    updateTask(context, task) {
      context.commit("updateTask", task);
      // try {
      //   const uid = await dispatch("getUid");
      //   firebase
      //     .database()
      //     .ref(`/users/${uid}/tasks`)
      //     .child(`${id}`)
      //     .update({ title });
      // } catch (e) {
      //   commit("setError", e);
      //   throw e;
      // }
    },
    deleteTask(context, id) {
      context.commit("deleteTask", id);
      // try {
      //   const uid = await dispatch("getUid");
      //   firebase
      //     .database()
      //     .ref(`/users/${uid}/tasks/${id}`)
      //     .remove();
      // } catch (e) {
      //   commit("setError", e);
      //   throw e;
      // }
    }
  }
};
