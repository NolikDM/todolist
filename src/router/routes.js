const routes = [
  {
    path: "/",
    name: "task",
    meta: { layout: "main", auth: true },
    component: () => import("../containers/TaskCollection/TodoTask.vue")
  },
  {
    path: "/todo/:id",
    name: "todo",
    meta: { layout: "main", auth: true },
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
];

export default routes;
