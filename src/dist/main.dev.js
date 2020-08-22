"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _vuelidate = _interopRequireDefault(require("vuelidate"));

var _App = _interopRequireDefault(require("./App.vue"));

var _router = _interopRequireDefault(require("./router"));

require("./registerServiceWorker");

var _store = _interopRequireDefault(require("./store"));

var _messagePlugin = _interopRequireDefault(require("@/utils/dist/message.plugin.dev"));

require("materialize-css/dist/js/materialize.min");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import Master from "./components/layouts/Master";
//import LandingPage from "./components/marketing/LandingPage";

/* Firebase */
// import firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/database";
//import firebaseConfig from "@/config/firebase-config"
_vue["default"].prototype.$eventBus = new _vue["default"]();
_vue["default"].config.productionTip = false;

_vue["default"].use(_messagePlugin["default"]);

_vue["default"].use(_vuelidate["default"]);
/* Include Firebase to project */
// firebase.initializeApp(firebaseConfig());

/* Initialization application */
// let app;
// firebase.auth().onAuthStateChanged(() => {
//   if(!app) {
//     app = new Vue({
//       router,
//       store,
//       render: h => h(Master)
//     }).$mount("#app");
//   }
// });


new _vue["default"]({
  router: _router["default"],
  store: _store["default"],
  render: function render(h) {
    return h(_App["default"]);
  }
}).$mount("#app");