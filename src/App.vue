<template>
  <!-- class="container" -->
  <div id="app">
    <!-- <todo-list></todo-list> -->
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
//import TodoList from "./components/TodoList";
import EmptyLayout from "./components/layouts/EmptyLayout";
import MainLayout from "./components/layouts/MainLayout";

export default {
  name: "App",
  components: {
    //TodoList,
    EmptyLayout,
    MainLayout
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || "empty") + "-layout";
    }
  }
};
</script>

<style lang="scss">
@import "~materialize-css/dist/css/materialize.min.css";
@import "assets/css/index.css";

* {
  box-sizing: border-box;
}

.container {
  max-width: 600px;
  margin: 0 auto;
}

// #app {
//   font-family: "Avenir", Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   color: #2c3e50;
//   margin-top: 60px;
//   font-size: 24px;
// }
</style>
