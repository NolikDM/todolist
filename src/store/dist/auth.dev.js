"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _app = _interopRequireDefault(require("firebase/app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  actions: {
    login: function login(_ref) {
      var email, password;
      return regeneratorRuntime.async(function login$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              email = _ref.email, password = _ref.password;
              _context.prev = 1;
              _context.next = 4;
              return regeneratorRuntime.awrap(_app["default"].auth().signInWithEmailAndPassword(email, password));

            case 4:
              _context.next = 10;
              break;

            case 6:
              _context.prev = 6;
              _context.t0 = _context["catch"](1);
              // console.log(e.message);
              console.log();
              throw _context.t0;

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[1, 6]]);
    },
    register: function register(_ref2, _ref3) {
      var dispatch, email, password, name, uid;
      return regeneratorRuntime.async(function register$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              dispatch = _ref2.dispatch;
              email = _ref3.email, password = _ref3.password, name = _ref3.name;
              _context2.prev = 2;
              _context2.next = 5;
              return regeneratorRuntime.awrap(_app["default"].auth().createUserWithEmailAndPassword(email, password));

            case 5:
              _context2.next = 7;
              return regeneratorRuntime.awrap(dispatch("getUid"));

            case 7:
              uid = _context2.sent;
              _context2.next = 10;
              return regeneratorRuntime.awrap(_app["default"].database().ref("/users/".concat(uid, "/info")).set({
                name: name
              }));

            case 10:
              _context2.next = 16;
              break;

            case 12:
              _context2.prev = 12;
              _context2.t0 = _context2["catch"](2);
              console.log();
              throw _context2.t0;

            case 16:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[2, 12]]);
    },
    getUid: function getUid() {
      var user = _app["default"].auth().currentUser;

      return user ? user.uid : null;
    },
    logout: function logout() {
      return regeneratorRuntime.async(function logout$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(_app["default"].auth().signOut());

            case 2:
            case "end":
              return _context3.stop();
          }
        }
      });
    }
  }
};
exports["default"] = _default;