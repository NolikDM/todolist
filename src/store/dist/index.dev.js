"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

var _auth = _interopRequireDefault(require("./auth"));

var _task = _interopRequireDefault(require("./task"));

var _todo = _interopRequireDefault(require("./todo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//import firebase from "firebase/app";
_vue["default"].use(_vuex["default"]);

var _default = new _vuex["default"].Store({
  state: {
    loading: true,
    filter: "all",
    todos: [],
    tasks: []
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
      if (state.filter == "all") {
        return state.todos;
      } else if (state.filter == "active") {
        return state.todos.filter(function (todo) {
          return !todo.completed;
        });
      } else if (state.filter == "completed") {
        return state.todos.filter(function (todo) {
          return todo.completed;
        });
      }

      return state.todos;
    },
    showClearCompletedButton: function showClearCompletedButton(state) {
      return state.todos.filter(function (todo) {
        return todo.completed;
      }).length > 0;
    },
    tasksFiltered: function tasksFiltered(state) {
      return state.tasks;
    }
  },
  mutations: {
    addTask: function addTask(state, task) {
      state.tasks.push({
        id: task.id,
        title: task.title,
        editing: false
      });
    },
    updateTask: function updateTask(state, task) {
      var index = state.tasks.findIndex(function (item) {
        return item.id == task.id;
      });
      state.tasks.splice(index, 1, {
        id: task.id,
        title: task.title,
        editing: task.editing
      });
    },
    deleteTask: function deleteTask(state, id) {
      var index = state.tasks.findIndex(function (item) {
        return item.id == id;
      });

      if (index >= 0) {
        state.tasks.splice(index, 1);
      }
    },
    // retrieveTasks(state, tasks) {
    //   state.tasks = tasks;
    // },
    addTodo: function addTodo(state, todo) {
      state.todos.push({
        id: todo.id,
        title: todo.title,
        completed: false,
        //timestamp: new Date(),
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
    }
  },
  actions: {
    // --------------------Task--------------------------------
    // addTask(context, task) {
    //   context.commit("addTask", task);
    // },
    // updateTask(context, task) {
    //   context.commit("updateTask", task);
    // },
    // deleteTask(context, id) {
    //   context.commit("deleteTask", id);
    // },
    // --------------------Todo--------------------------------
    //initRealtimeListeners(context) {
    //   db.collection('todos').onSnapshot(snapshot => {
    //       snapshot.docChanges.forEach(change => {
    //         if (change.type === 'added') {
    //           const source = change.doc.metadata.hasPendingWrites ? 'Local' : 'Server'
    //           if (source === 'Server') {
    //             context.commit('addTodo', {
    //               id: change.doc.id,
    //               title: change.doc.data().title,
    //               completed: false,
    //             })
    //           }
    //         }
    //         if (change.type === 'modified') {
    //           context.commit('updateTodo', {
    //             id: change.doc.id,
    //             title: change.doc.data().title,
    //             completed: change.doc.data().completed,
    //           })
    //         }
    //         if (change.type === 'removed') {
    //           context.commit('deleteTodo', change.doc.id)
    //         }
    //       })
    //     })
    // },
    // retrieveTodos(context) {
    //   context.commit('updateLoading', true)
    //   db.collection('todos').get()
    //   .then(querySnapshot => {
    //     let tempTodos = []
    //     querySnapshot.forEach(doc => {
    //       const data = {
    //         id: doc.id,
    //         title: doc.data().title,
    //         completed: doc.data().completed,
    //         timestamp: doc.data().timestamp,
    //       }
    //       tempTodos.push(data)
    //     })
    //     context.commit('updateLoading', false)
    //     const tempTodosSorted = tempTodos.sort((a, b) => {
    //       return a.timestamp.seconds - b.timestamp.seconds
    //     })
    //     context.commit('retrieveTodos', tempTodosSorted)
    //   })
    // },
    addTodo: function addTodo(context, todo) {
      context.commit("addTodo", todo); // db.collection('todos').add({
      //   title: todo.title,
      //   completed: false,
      //   timestamp: new Date(),
      // })
      // .then(docRef => {
      //   context.commit('addTodo', {
      //     id: docRef.id,
      //     title: todo.title,
      //     completed: false,
      //   })
      // })
    },
    updateTodo: function updateTodo(context, todo) {
      context.commit("updateTodo", todo); // db.collection('todos').doc(todo.id).set({
      //   id: todo.id,
      //   title: todo.title,
      //   completed: todo.completed,
      //   timestamp: todo.timestamp,
      // }, { merge: true })
      // .then(() => {
      //   context.commit('updateTodo', todo)
      // })
    },
    deleteTodo: function deleteTodo(context, id) {
      context.commit("deleteTodo", id); // db.collection('todos').doc(id).delete()
      //   .then(() => {
      //     context.commit('deleteTodo', id)
      //   })
    },
    checkAll: function checkAll(context, checked) {
      context.commit("checkAll", checked); // db.collection('todos').get()
      // .then(querySnapshot => {
      //   querySnapshot.forEach(doc => {
      //     doc.ref.update({
      //       completed: checked
      //     })
      //     .then(() => {
      //       context.commit('checkAll', checked)
      //     })
      //   })
      // })
    },
    updateFilter: function updateFilter(context, filter) {
      context.commit("updateFilter", filter);
    },
    clearCompleted: function clearCompleted(context) {
      context.commit("clearCompleted"); // db.collection('todos').where('completed', '==', true).get()
      //   .then(querySnapshot => {
      //     querySnapshot.forEach(doc => {
      //       doc.ref.delete()
      //       .then(() => {
      //         context.commit('clearCompleted')
      //       })
      //     })
      //   })
    }
  },
  modules: {
    auth: _auth["default"],
    task: _task["default"],
    todo: _todo["default"]
  }
});

exports["default"] = _default;