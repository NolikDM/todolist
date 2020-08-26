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

_vue["default"].use(_vuex["default"]);

var _default = new _vuex["default"].Store({
  state: {
    error: null
  },
  getters: {
    error: function error(s) {
      return s.error;
    }
  },
  mutations: {
    setError: function setError(state, error) {
      state.error = error;
    },
    clearError: function clearError(state) {
      state.error = null;
    }
  },
  actions: {},
  modules: {
    auth: _auth["default"],
    task: _task["default"],
    todo: _todo["default"]
  }
});

exports["default"] = _default;