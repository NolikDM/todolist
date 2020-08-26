import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
import task from "./task";
import todo from "./todo";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    error: null
  },
  getters: {
    error: s => s.error
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    }
  },
  actions: {},
  modules: {
    auth,
    task,
    todo
  }
});
