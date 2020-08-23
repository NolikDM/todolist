"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _app = _interopRequireDefault(require("firebase/app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = {
  actions: {
    // context, task
    addTask: function addTask(_ref, _ref2) {
      var dispatch, commit, title, uid, task;
      return regeneratorRuntime.async(function addTask$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              dispatch = _ref.dispatch, commit = _ref.commit;
              title = _ref2.title;
              _context.prev = 2;
              _context.next = 5;
              return regeneratorRuntime.awrap(dispatch("getUid"));

            case 5:
              uid = _context.sent;
              _context.next = 8;
              return regeneratorRuntime.awrap(_app["default"].database().ref("/users/".concat(uid, "/tasks")).push({
                title: title
              }));

            case 8:
              task = _context.sent;
              return _context.abrupt("return", {
                title: title,
                id: task.key
              });

            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](2);
              commit("setError", _context.t0);
              throw _context.t0;

            case 16:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[2, 12]]);
    },
    // context, task
    updateTask: function updateTask(_ref3) {
      var dispatch, commit, uid, task;
      return regeneratorRuntime.async(function updateTask$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              dispatch = _ref3.dispatch, commit = _ref3.commit;
              _context2.prev = 1;
              _context2.next = 4;
              return regeneratorRuntime.awrap(dispatch("getUid"));

            case 4:
              uid = _context2.sent;
              _context2.next = 7;
              return regeneratorRuntime.awrap(_app["default"].database().ref("/users/".concat(uid, "/tasks")).once("value"));

            case 7:
              _context2.t0 = _context2.sent.val();

              if (_context2.t0) {
                _context2.next = 10;
                break;
              }

              _context2.t0 = {};

            case 10:
              task = _context2.t0;
              return _context2.abrupt("return", Object.keys(task).map(function (key) {
                return _objectSpread({}, task[key], {
                  id: key
                });
              }));

            case 14:
              _context2.prev = 14;
              _context2.t1 = _context2["catch"](1);
              commit("setError", _context2.t1);
              throw _context2.t1;

            case 18:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[1, 14]]);
    },
    // context, id
    deleteTask: function deleteTask(_ref4, _ref5) {
      var dispatch, commit, id, uid;
      return regeneratorRuntime.async(function deleteTask$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              dispatch = _ref4.dispatch, commit = _ref4.commit;
              id = _ref5.id;
              _context3.prev = 2;
              _context3.next = 5;
              return regeneratorRuntime.awrap(dispatch("getUid"));

            case 5:
              uid = _context3.sent;

              _app["default"].database().ref("/users/".concat(uid, "/tasks/").concat(id)).remove();

              _context3.next = 13;
              break;

            case 9:
              _context3.prev = 9;
              _context3.t0 = _context3["catch"](2);
              commit("setError", _context3.t0);
              throw _context3.t0;

            case 13:
            case "end":
              return _context3.stop();
          }
        }
      }, null, null, [[2, 9]]);
    }
  }
};
exports["default"] = _default;