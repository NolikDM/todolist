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
          </div>
          <div class="card-action">
            <div>
              <button
                class="btn waves-effect waves-light auth-submit"
                type="submit"
              >
                Войти
                <!-- <i class="material-icons right">send</i> -->
              </button>
            </div>

            <p class="center">
              Нет аккаунта?
              <router-link to="/register">Зарегистрироваться</router-link>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { email, required, minLength } from "vuelidate/lib/validators";

export default {
  name: "login",
  data: () => ({
    email: "",
    password: ""
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) }
  },
  mounted() {
    this.$message("Test");
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      const formData = {
        email: this.email,
        password: this.password
      };

      try {
        await this.$store.dispatch("login", formData);
        this.$router.push("/");
      } catch (e) {
        console.log();
      }
    }
  }
};
</script>

<style></style>
