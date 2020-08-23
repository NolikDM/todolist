import firebase from "firebase/app";

export default {
  actions: {
    // context, todo
    async addTodo({ dispatch, commit }, { title, taskId }) {
      //context.commit("addTodo", todo);
      try {
        const uid = await dispatch("getUid");
        const todo = await firebase
          .database()
          .ref(`/users/${uid}/tasks/${taskId}/todos/todo`)
          .push({ title, taskId });
        return { title, taskId, id: todo.key };
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    // context, todo
    async updateTodo({ dispatch, commit }, { taskId }) {
      //context.commit("updateTodo", todo);
      try {
        const uid = await dispatch("getUid");
        const todo =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/tasks/${taskId}/todo`)
              .once("value")
          ).val() || {};
        const result = [];
        Object.keys(todo).forEach(item => {
          if (todo[item].taskId == taskId) {
            todo[item].id = item;
            let subtasks = [];
            if (todo[item].subtasks !== undefined) {
              Object.keys(todo[item].subtasks).forEach(sub => {
                todo[item].subtasks[sub].id = sub;
                subtasks.push(todo[item].subtasks[sub]);
              });
            }
            todo[item].subtasks = subtasks;
            result.push(todo[item]);
          }
        });
        return result;
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    //context, id
    async deleteTodo({ dispatch, commit }, { taskId, id }) {
      //context.commit("deleteTodo", id);
      try {
        const uid = await dispatch("getUid");
        firebase
          .database()
          .ref(`/users/${uid}/tasks/${taskId}/todo/${id}`)
          .remove();
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    checkAll(context, checked) {
      context.commit("checkAll", checked);
    },
    updateFilter(context, filter) {
      context.commit("updateFilter", filter);
    },
    clearCompleted(context) {
      context.commit("clearCompleted");
    }
  }
};
