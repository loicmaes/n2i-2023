<script>
import Field from "@/components/display/Field.vue";
import axios from "axios";
import {login} from "@/assets/functions/authentication.js";

export default {
  name: "Login",
  components: {Field},
  computed: {
    lang () {
      return this.$store.state.lang.login
    }
  },
  data: () => ({
    loading: false
  }),
  methods: {
    submit () {
      const username = this.$refs.username.value
      const password = this.$refs.password.value

      if (!username || !password) return

      this.loading = true
      axios.post('/login', {
        username,
        password
      })
          .then(res => {
            const { token, username } = res.data
            login(token)
            this.loading = false
            this.$router.push('/')
          })
          .catch(console.log)
    }
  }
}
</script>

<template>
  <div class="wrapper">
    <form @submit.prevent="submit" class="page">
      <h1 class="page--title">{{ lang.title }}</h1>

      <Field name="username" ref="username" :placeholder="lang.placeholders.username" />
      <Field name="password" ref="password" type="password" :placeholder="lang.placeholders.password" />

      <button class="page--cta" :disabled="loading">{{ loading ? lang.signing :  lang.btn }}</button>
      <RouterLink to="/auth/register" class="page--action">{{ lang.secondary_action }}</RouterLink>
    </form>
  </div>
</template>

<style scoped lang="scss">
@forward '../../assets/css/modules/auth';
</style>
