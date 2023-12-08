<script>
export default {
  name: "Game",
  methods: {
    checkRound () {
      if (this.$store.state.game && this.$store.state.game.round) return
      this.$router.push('/')
    }
  },
  computed: {
    score () {
      return this.$store.state.game?.score
    }
  },
  created () {
    this.checkRound()
  },
  updated () {
    this.checkRound()
  }
}
</script>

<template>
  <span class="score">{{ score }}</span>
  <RouterView />
</template>

<style scoped lang="scss">
.score {
  top: 3.5em;
  left: 3.5em;
  position: fixed;
}
</style>
