"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
//import firebase from "firebase/app";
var _default = {
  actions: {
    // context, task
    //{ dispatch, commit }, { title }
    addTask: function addTask(context, task) {
      context.commit("addTask", task); // try {
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
    updateTask: function updateTask(context, task) {
      context.commit("updateTask", task); // try {
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
    deleteTask: function deleteTask(context, id) {
      context.commit("deleteTask", id); //   try {
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
exports["default"] = _default;