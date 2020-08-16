import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import { firebaseConfig } from "./firebase_config.js";
import * as firebase from "firebase/app";

// Initialize Firebase
//firebase.config.initializeApp(firebaseConfig);

Vue.config.productionTip = false;

//let app;

// firebase.auth().onAuthStateChanged(() => {
//   if (!app) {
//     app = new Vue({
//       router,
//       store,
//       render: (h) => h(App),
//     }).$mount("#app");
//   }
// });

new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  )};
