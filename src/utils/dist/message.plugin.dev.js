"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _materializeCss = _interopRequireDefault(require("materialize-css"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  install: function install(Vue) {
    Vue.prototype.$message = function (html) {
      _materializeCss["default"].toast({
        html: html
      });
    };

    Vue.prototype.$error = function (html) {
      _materializeCss["default"].toast({
        html: "[Error]: ".concat(html)
      });
    };
  }
};
exports["default"] = _default;