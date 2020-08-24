"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _app = _interopRequireDefault(require("firebase/app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  actions: {
    // context, todo
    addTodo: function addTodo(_ref, _ref2) {
      var dispatch, commit, title, taskId, uid, todo;
      return regeneratorRuntime.async(function addTodo$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              dispatch = _ref.dispatch, commit = _ref.commit;
              title = _ref2.title, taskId = _ref2.taskId;
              _context.prev = 2;
              _context.next = 5;
              return regeneratorRuntime.awrap(dispatch("getUid"));

            case 5:
              uid = _context.sent;
              _context.next = 8;
              return regeneratorRuntime.awrap(_app["default"].database().ref("/users/".concat(uid, "/tasks/").concat(taskId, "/todos")).push({
                title: title,
                taskId: taskId
              }));

            case 8:
              todo = _context.sent;
              return _context.abrupt("return", {
                title: title,
                taskId: taskId,
                id: todo.key
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
    // context, todo
    updateTodo: function updateTodo(_ref3, _ref4) {
      var dispatch, commit, taskId, uid, todo, result;
      return regeneratorRuntime.async(function updateTodo$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              dispatch = _ref3.dispatch, commit = _ref3.commit;
              taskId = _ref4.taskId;
              _context2.prev = 2;
              _context2.next = 5;
              return regeneratorRuntime.awrap(dispatch("getUid"));

            case 5:
              uid = _context2.sent;
              _context2.next = 8;
              return regeneratorRuntime.awrap(_app["default"].database().ref("/users/".concat(uid, "/tasks/").concat(taskId, "/todo")).once("value"));

            case 8:
              _context2.t0 = _context2.sent.val();

              if (_context2.t0) {
                _context2.next = 11;
                break;
              }

              _context2.t0 = {};

            case 11:
              todo = _context2.t0;
              result = [];
              Object.keys(todo).forEach(function (item) {
                if (todo[item].taskId == taskId) {
                  todo[item].id = item;
                  var subtasks = [];

                  if (todo[item].subtasks !== undefined) {
                    Object.keys(todo[item].subtasks).forEach(function (sub) {
                      todo[item].subtasks[sub].id = sub;
                      subtasks.push(todo[item].subtasks[sub]);
                    });
                  }

                  todo[item].subtasks = subtasks;
                  result.push(todo[item]);
                }
              });
              return _context2.abrupt("return", result);

            case 17:
              _context2.prev = 17;
              _context2.t1 = _context2["catch"](2);
              commit("setError", _context2.t1);
              throw _context2.t1;

            case 21:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[2, 17]]);
    },
    //context, id
    deleteTodo: function deleteTodo(_ref5, _ref6) {
      var dispatch, commit, taskId, id, uid;
      return regeneratorRuntime.async(function deleteTodo$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              dispatch = _ref5.dispatch, commit = _ref5.commit;
              taskId = _ref6.taskId, id = _ref6.id;
              _context3.prev = 2;
              _context3.next = 5;
              return regeneratorRuntime.awrap(dispatch("getUid"));

            case 5:
              uid = _context3.sent;

              _app["default"].database().ref("/users/".concat(uid, "/tasks/").concat(taskId, "/todo/").concat(id)).remove();

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
    },
    checkAll: function checkAll(context, checked) {
      context.commit("checkAll", checked);
    },
    updateFilter: function updateFilter(context, filter) {
      context.commit("updateFilter", filter);
    },
    clearCompleted: function clearCompleted(context) {
      context.commit("clearCompleted");
    }
  }
};
exports["default"] = _default;