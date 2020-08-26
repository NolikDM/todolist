"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("firebase/database");

require("firebase/auth");

// import * as firebase from "firebase";
var _default = {
  state: {
    loading: true,
    filter: "all",
    todos: []
  },
  getters: {
    remaining: function remaining(state) {
      return state.todos.filter(function (todo) {
        return !todo.completed;
      }).length;
    },
    anyRemaining: function anyRemaining(state, getters) {
      return getters.remaining != 0;
    },
    todosFiltered: function todosFiltered(state) {
      return function (id) {
        var newTodos = state.todos.filter(function (todo) {
          return todo.id === id;
        });

        if (state.filter == "all") {
          return newTodos;
        } else if (state.filter == "active") {
          return newTodos.filter(function (todo) {
            return !todo.completed;
          });
        } else if (state.filter == "completed") {
          return newTodos.filter(function (todo) {
            return todo.completed;
          });
        }

        return state.todos;
      };
    },
    showClearCompletedButton: function showClearCompletedButton(state) {
      return state.todos.filter(function (todo) {
        return todo.completed;
      }).length > 0;
    }
  },
  mutations: {
    addTodo: function addTodo(state, todo) {
      state.todos.push({
        id: todo.id,
        title: todo.title,
        completed: false,
        editing: false
      });
    },
    updateTodo: function updateTodo(state, todo) {
      var index = state.todos.findIndex(function (item) {
        return item.id == todo.id;
      });
      state.todos.splice(index, 1, {
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
        editing: todo.editing
      });
    },
    deleteTodo: function deleteTodo(state, id) {
      var index = state.todos.findIndex(function (item) {
        return item.id == id;
      });

      if (index >= 0) {
        state.todos.splice(index, 1);
      }
    },
    checkAll: function checkAll(state, checked) {
      state.todos.forEach(function (todo) {
        return todo.completed = checked;
      });
    },
    updateFilter: function updateFilter(state, filter) {
      state.filter = filter;
    },
    clearCompleted: function clearCompleted(state) {
      state.todos = state.todos.filter(function (todo) {
        return !todo.completed;
      });
    },
    retrieveTodos: function retrieveTodos(state, todos) {
      state.todos = todos;
    },
    updateLoading: function updateLoading(state, loading) {
      state.loading = loading;
    }
  },
  actions: {
    // retrieveTodos(context) {
    //   context.commit("updateLoading", true);
    //   firebase
    //     .collection("todos")
    //     .get()
    //     .then(querySnapshot => {
    //       let tempTodos = [];
    //       querySnapshot.forEach(doc => {
    //         const data = {
    //           id: doc.id,
    //           title: doc.data().title,
    //           completed: doc.data().completed,
    //           timestamp: doc.data().timestamp
    //         };
    //         tempTodos.push(data);
    //       });
    //       context.commit("updateLoading", false);
    //       const tempTodosSorted = tempTodos.sort((a, b) => {
    //         return a.timestamp.seconds - b.timestamp.seconds;
    //       });
    //       context.commit("retrieveTodos", tempTodosSorted);
    //     });
    // },
    addTodo: function addTodo(context, todo) {
      context.commit("addTodo", todo); // firebase
      //   .collection("todos")
      //   .add({
      //     title: todo.title,
      //     completed: false,
      //     timestamp: new Date()
      //   })
      //   .then(docRef => {
      //     context.commit("addTodo", {
      //       id: docRef.id,
      //       title: todo.title,
      //       completed: false
      //     });
      //   });
    },
    updateTodo: function updateTodo(context, todo) {
      context.commit("updateTodo", todo); // firebase
      //   .collection("todos")
      //   .doc(todo.id)
      //   .set(
      //     {
      //       id: todo.id,
      //       title: todo.title,
      //       completed: todo.completed,
      //       timestamp: todo.timestamp
      //     },
      //     { merge: true }
      //   )
      //   .then(() => {
      //     context.commit("updateTodo", todo);
      //   });
    },
    deleteTodo: function deleteTodo(context, id) {
      context.commit("deleteTodo", id); // firebase
      //   .collection("todos")
      //   .doc(id)
      //   .delete()
      //   .then(() => {
      //     context.commit("deleteTodo", id);
      //   });
    },
    checkAll: function checkAll(context, checked) {
      context.commit("checkAll", checked); // firebase
      //   .collection("todos")
      //   .get()
      //   .then(querySnapshot => {
      //     querySnapshot.forEach(doc => {
      //       doc.ref
      //         .update({
      //           completed: checked
      //         })
      //         .then(() => {
      //           context.commit("checkAll", checked);
      //         });
      //     });
      //   });
    },
    updateFilter: function updateFilter(context, filter) {
      context.commit("updateFilter", filter);
    },
    clearCompleted: function clearCompleted(context) {
      context.commit("clearCompleted"); //   firebase
      //     .collection("todos")
      //     .where("completed", "==", true)
      //     .get()
      //     .then(querySnapshot => {
      //       querySnapshot.forEach(doc => {
      //         doc.ref.delete().then(() => {
      //           context.commit("clearCompleted");
      //         });
      //       });
      //     });
    }
  }
};
exports["default"] = _default;