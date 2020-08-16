<template>
  <div>
    <User />
    <form v-on:submit.prevent="onSubmit">
      <label>
        text
        <input v-nodel="text" type="text" />
      </label>
      <button>Добавить</button>
    </form>
  </div>
</template>

<script>
import User from "@/components/User";
import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

export default {
  name: "POST",
  components: { User },
  data: () => ({
    text: ""
  }),
  methods: {
    onSubmit() {}
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