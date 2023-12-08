<script>
export default {
  name: "Authentication",
  methods: {
    clearGame () {
      this.$store.commit('clearGame')
    }
  },
  created () {
    this.clearGame()
  },
  updated () {
    this.clearGame()
  }
}
</script>

<template>
  <RouterView />
</template>

<style scoped lang="scss">

</style>
