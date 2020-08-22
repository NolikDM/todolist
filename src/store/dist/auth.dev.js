"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _app = _interopRequireDefault(require("firebase/app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  actions: {
    // async login({ dispatch, commit }, { email, password }) {
    //   try {
    //     await firebase.auth().signInWithEmailAndPassword(email, password);
    //   } catch (e) {
    //     console.log(e);
    //     throw e;
    //   }
    // },
    // async register({}, { email, password, name }) {
    //   try {
    //     await firebase.auth().createUserWithEmailAndPassword(email, password);
    //   } catch (e) {
    //     console.log(e);
    //     throw e;
    //   }
    // },
    logout: function logout() {
      return regeneratorRuntime.async(function logout$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(_app["default"].auth().signOut());

            case 2:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }
};
exports["default"] = _default;