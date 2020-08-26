<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-6">
        <form class="card auth-card" @submit.prevent="submitHandler">
          <div class="card-content">
            <span class="card-title">Todo App</span>
            <div class="input-field">
              <input
                id="email"
                type="text"
                v-model.trim="email"
                :class="{
                  invalid:
                    ($v.email.$dirty && !$v.email.required) ||
                    ($v.email.$dirty && !$v.email.email)
                }"
              />
              <label for="email">Email</label>
              <small
                class="helper-text invalid"
                v-if="$v.email.$dirty && !$v.email.required"
                >The email field should not be empty
              </small>
              <small
                class="helper-text invalid"
                v-else-if="$v.email.$dirty && !$v.email.email"
                >Enter the correct email
              </small>
            </div>
            <div class="input-field">
              <input
                id="password"
                type="password"
                v-model.trim="password"
                :class="{
                  invalid:
                    ($v.password.$dirty && !$v.password.required) ||
                    ($v.password.$dirty && !$v.password.minLength)
                }"
              />
              <label for="password">Пароль</label>
              <small
                class="helper-text invalid"
                v-if="$v.password.$dirty && !$v.password.required"
                >Enter the password</small
              >
              <small
                class="helper-text invalid"
                v-else-if="$v.password.$dirty && !$v.password.minLength"
                >the password must be
                {{ $v.password.$params.minLength.min }} characters. Now it's
                {{ password.length }} characters</small
              >
            </div>
            <div class="input-field">
              <input
                id="name"
                type="text"
                v-model.trim="name"
                :class="{ invalid: $v.name.$dirty && !$v.name.required }"
              />
              <label for="name">Имя</label>
              <small
                class="helper-text invalid"
                v-if="$v.name.$dirty && !$v.name.required"
                >Enter your username</small
              >
            </div>
            <p>
              <label>
                <input type="checkbox" v-model="agree" />
                <span>С правилами согласен</span>
              </label>
            </p>
          </div>
          <div class="card-action">
            <div>
              <button
                class="btn waves-effect waves-light auth-submit"
                type="submit"
              >
                Зарегистрироваться
              </button>
            </div>

            <p class="center">
              Уже есть аккаунт?
              <router-link to="/login">Войти!</router-link>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { email, required, minLength } from "vuelidate/lib/validators";
import messages from "@/utils/messages";

export default {
  name: "register",
  data: () => ({
    email: "",
    password: "",
    name: "",
    agree: false
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
    name: { required },
    agree: { checked: v => v }
  },
  mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message]);
    }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      const formData = {
        email: this.email,
        password: this.password,
        name: this.name
      };

      try {
        await this.$store.dispatch("register", formData);
        this.$router.push("/");
      } catch (e) {
        console.log();
      }
    }
  }
};
</script>

<style></style>
