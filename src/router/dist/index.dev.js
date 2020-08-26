"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _routes = _interopRequireDefault(require("./routes"));

var _app = _interopRequireDefault(require("firebase/app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vueRouter["default"]);

var router = new _vueRouter["default"]({
  mode: "history",
  routes: _routes["default"]
});
router.beforeEach(function (to, from, next) {
  var currentUser = _app["default"].auth().currentUser;

  var requireAuth = to.matched.some(function (record) {
    return record.meta.auth;
  });

  if (requireAuth && !currentUser) {
    next("/login?message=login");
  } else {
    next();
  }
});
var _default = router;
exports["default"] = _default;