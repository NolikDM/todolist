import Vue from "vue";
import Vuex from "vuex";
//import firebase from "firebase/app";
import auth from "./auth";
import task from "./task";
import todo from "./todo";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: true,
    filter: "all",
    todos: [],
    tasks: []
  },
  getters: {
    error: s => s.error,
    remaining(state) {
      return state.todos.filter(todo => !todo.completed).length;
    },
    anyRemaining(state, getters) {
      return getters.remaining != 0;
    },
    todosFiltered(state) {
      if (state.filter == "all") {
        return state.todos;
      } else if (state.filter == "active") {
        return state.todos.filter(todo => !todo.completed);
      } else if (state.filter == "completed") {
        return state.todos.filter(todo => todo.completed);
      }

      return state.todos;
    },
    showClearCompletedButton(state) {
      return state.todos.filter(todo => todo.completed).length > 0;
    },
    tasksFiltered(state) {
      return state.tasks;
    }
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    },
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
    // retrieveTasks(state, tasks) {
    //   state.tasks = tasks;
    // },
    addTodo(state, todo) {
      state.todos.push({
        id: todo.id,
        title: todo.title,
        completed: false,
        editing: false
      });
    },
    updateTodo(state, todo) {
      const index = state.todos.findIndex(item => item.id == todo.id);
      state.todos.splice(index, 1, {
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
        editing: todo.editing
      });
    },
    deleteTodo(state, id) {
      const index = state.todos.findIndex(item => item.id == id);
      if (index >= 0) {
        state.todos.splice(index, 1);
      }
    },
    checkAll(state, checked) {
      state.todos.forEach(todo => (todo.completed = checked));
    },
    updateFilter(state, filter) {
      state.filter = filter;
    },
    clearCompleted(state) {
      state.todos = state.todos.filter(todo => !todo.completed);
    },
    retrieveTodos(state, todos) {
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
    addTodo(context, todo) {
      context.commit("addTodo", todo);
      // db.collection('todos').add({
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
    updateTodo(context, todo) {
      context.commit("updateTodo", todo);
      // db.collection('todos').doc(todo.id).set({
      //   id: todo.id,
      //   title: todo.title,
      //   completed: todo.completed,
      //   timestamp: todo.timestamp,
      // }, { merge: true })
      // .then(() => {
      //   context.commit('updateTodo', todo)
      // })
    },
    deleteTodo(context, id) {
      context.commit("deleteTodo", id);
      // db.collection('todos').doc(id).delete()
      //   .then(() => {
      //     context.commit('deleteTodo', id)
      //   })
    },
    checkAll(context, checked) {
      context.commit("checkAll", checked);
      // db.collection('todos').get()
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
    updateFilter(context, filter) {
      context.commit("updateFilter", filter);
    },
    clearCompleted(context) {
      context.commit("clearCompleted");
      // db.collection('todos').where('completed', '==', true).get()
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
    auth,
    task,
    todo
  }
});
