import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import firebase from "firebase/app";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requireAuth = to.matched.some(record => record.meta.auth);

  if (requireAuth && !currentUser) {
    next(`/login?message=login`);
  } else {
    next();
  }
});

export default router;
