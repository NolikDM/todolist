// import * as firebase from "firebase";
import "firebase/database";
import "firebase/auth";

export default {
  state: {
    loading: true,
    filter: "all",
    todos: []
  },
  getters: {
    remaining(state) {
      return state.todos.filter(todo => !todo.completed).length;
    },
    anyRemaining(state, getters) {
      return getters.remaining != 0;
    },
    todosFiltered: state => id => {
      let newTodos = state.todos.filter(todo => todo.id === id);
      if (state.filter == "all") {
        return newTodos;
      } else if (state.filter == "active") {
        return newTodos.filter(todo => !todo.completed);
      } else if (state.filter == "completed") {
        return newTodos.filter(todo => todo.completed);
      }

      return state.todos;
    },
    showClearCompletedButton(state) {
      return state.todos.filter(todo => todo.completed).length > 0;
    }
  },
  mutations: {
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
    },
    updateLoading(state, loading) {
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
    addTodo(context, todo) {
      context.commit("addTodo", todo);
      // firebase
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
    updateTodo(context, todo) {
      context.commit("updateTodo", todo);
      // firebase
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
    deleteTodo(context, id) {
      context.commit("deleteTodo", id);
      // firebase
      //   .collection("todos")
      //   .doc(id)
      //   .delete()
      //   .then(() => {
      //     context.commit("deleteTodo", id);
      //   });
    },
    checkAll(context, checked) {
      context.commit("checkAll", checked);
      // firebase
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
    updateFilter(context, filter) {
      context.commit("updateFilter", filter);
    },
    clearCompleted(context) {
      context.commit("clearCompleted");
      //   firebase
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
