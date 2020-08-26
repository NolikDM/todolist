<template>
  <div class="user">
    <div class="user-name">
      {{ this.$data.isLogged ? this.$data.user.email : "пуста" }}
    </div>
    <button v-on:click="onLogOut">logout</button>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "User",
  data: () => ({
    isLogged: false,
    user: null
  }),
  mounted() {
    let me = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        me.$set(me, "user", user);
        me.$set(me, "isLogged", true);
      } else {
        me.$set(me, "isLogged", false);
      }
    });
  },
  methods: {
    onLogOut() {
      firebase
        .auth()
        .signOut()
        .then(function() {
          console.log("out");
        })
        .catch(function(er) {
          console.log(er.message());
        });
    },
    dataChange(user) {
      this.$data.user = user;
      this.$data.isLogger = true;
    }
  }
};
</script>

<style scoped>
.user {
  position: absolute;
  top: 24px;
  right: 24px;
}
</style>
