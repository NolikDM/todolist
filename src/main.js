import Vue from "vue";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
import store from "./store/index.js";
import messagePlugin from "@/utils/message.plugin";
import "materialize-css/dist/js/materialize.min";

/* Firebase */
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { firebaseConfig } from "./firebase_config.js";

Vue.prototype.$eventBus = new Vue();

Vue.config.productionTip = false;

Vue.use(messagePlugin);
Vue.use(Vuelidate);

/* Include Firebase to project */
firebase.initializeApp(firebaseConfig);

/* Initialization application */
let app;
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
