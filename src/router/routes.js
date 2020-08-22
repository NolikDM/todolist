//import App from "../App";
//import LandingPage from "../components/marketing/LandingPage";
//import About from "../components/marketing/About";
//import Login from "../components/auth/Login";
// import Register from "../components/auth/Register";
// import TestTodosVariable from "../components/marketing/TestTodosVariable";

const routes = [
  {
    path: "/",
    name: "task",
    meta: { layout: "main" },
    component: () => import("../components/TodoTask.vue")
  },
  {
    path: "/todo",
    name: "todo",
    meta: { layout: "main" },
    //component: App
    component: () => import("../components/TodoList.vue")
  },
  {
    path: "/login",
    name: "login",
    meta: { layout: "empty" },
    component: () => import("../components/auth/Login.vue")
  },
  {
    path: "/register",
    name: "register",
    meta: { layout: "empty" },
    component: () => import("../components/auth/Register.vue")
  }
  // {
  //   path: "/",
  //   name: "Home",
  //   meta: { layout: "main" },
  //   component: () => import("../components/marketing/LandingPage.vue")
  // }
  // {
  //   path: "/about",
  //   name: "about",
  //   component: About
  // },
  // {
  //   path: "/todos/:id",
  //   name: "todos",
  //   component: TestTodosVariable
  // }
];

export default routes;
