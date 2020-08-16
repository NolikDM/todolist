<template>
  <div class="container">
    <User />
    <form v-on:submit.prevent="onAuthorization" class="form">
      <label>
        login
        <input v-model:="login" type="email" />
      </label>

      <label>
        password
        <input v-model:="password" type="password" />
      </label>
    </form>
  </div>
</template>

<script>
import * as firebase from "firebase/app";

export default {
  name: "Reg",
  data: () => ({
    login: "",
    password: ""
  }),
  methods: {
    onRegistration() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.login, this.password)
        .then(r => console.log(r))
        .catch(function(err) {
          console.log(err.message);
        });
    }
  }
};
</script>

<style scoped>
.container {
}

.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.form label {
  margin-bottom: 12px;
}

.form button {
  width: 150px;
}
</style>