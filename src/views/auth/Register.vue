<script>
import Field from "@/components/display/Field.vue";
import axios from 'axios'
import { login } from '@/assets/functions/authentication.js'

export default {
  name: "Register",
  components: {Field},
  computed: {
    lang () {
      return this.$store.state.lang.register
    }
  },
  data: () => ({
    loading: false
  }),
  methods: {
    submit () {
      this.loading = true
      const username = this.$refs.username.value
      const password = this.$refs.password.value
      const confirm  = this.$refs.confirm.value

      if (!username || !password || !confirm) return
      if (password !== confirm) return

      this.loading = true
      axios.post('/user', {
        username,
        password
      })
          .then(res => {
            const { token } = res.data
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
    <form @submit.prevent class="page">
      <h1 class="page--title">{{ lang.title }}</h1>

      <Field name="username" ref="username" :placeholder="lang.placeholders.username" />
      <Field name="password" ref="password" type="password" :placeholder="lang.placeholders.password" />
      <Field name="confirm_password" ref="confirm" type="password" :placeholder="lang.placeholders.confirm" />

      <button @click.prevent="submit" class="page--cta" :disabled="loading">{{ loading ? lang.creating :  lang.btn }}</button>
      <RouterLink to="/auth/login" class="page--action">{{ lang.secondary_action }}</RouterLink>
    </form>
  </div>
</template>

<style scoped lang="scss">
@forward '../../assets/css/modules/auth';
</style>
