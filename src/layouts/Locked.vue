<script>
import { isAuthenticated } from '@/assets/functions/authentication.js'
import axios from "axios";

export default {
  name: "Locked",
  async created () {
    if (!await isAuthenticated(this.$store, true)) return this.$router.push('/auth')

    if (!this.$store.state.game) return this.$router.push('/')
    try {
      const game = await axios.get('/game')
      this.$store.commit('storeGame', game.data)
    } catch (e) {
      console.log(e)
    }
  },
  async updated () {
    if (!await isAuthenticated()) return this.$router.push('/auth')
  }
}
</script>

<template>
  <RouterView />
</template>

<style scoped lang="scss">

</style>
