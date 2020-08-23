"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _vuelidate = _interopRequireDefault(require("vuelidate"));

var _App = _interopRequireDefault(require("./App.vue"));

var _router = _interopRequireDefault(require("./router"));

require("./registerServiceWorker");

var _index = _interopRequireDefault(require("./store/index.js"));

require("materialize-css/dist/js/materialize.min");

var _app = _interopRequireDefault(require("firebase/app"));

require("firebase/auth");

require("firebase/database");

var _firebase_config = require("./firebase_config.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//import messagePlugin from "@/utils/dist/message.plugin.dev";

/* Firebase */
_vue["default"].prototype.$eventBus = new _vue["default"]();
_vue["default"].config.productionTip = false; //Vue.use(messagePlugin);

_vue["default"].use(_vuelidate["default"]);
/* Include Firebase to project */


_app["default"].initializeApp(_firebase_config.firebaseConfig);
/* Initialization application */


var app;

_app["default"].auth().onAuthStateChanged(function () {
  if (!app) {
    app = new _vue["default"]({
      router: _router["default"],
      store: _index["default"],
      render: function render(h) {
        return h(_App["default"]);
      }
    }).$mount("#app");
  }
}); // new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount("#app");