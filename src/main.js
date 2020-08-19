import Vue from "vue";
//import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
import store from "./store";
import Master from "./components/layouts/Master";

Vue.prototype.$eventBus = new Vue();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(Master)
}).$mount("#app");
