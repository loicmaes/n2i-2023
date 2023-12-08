<script>
import axios from "axios";

export default {
  name: "Info",
  data: () => ({
    timer: 5,
    completed: false,
    interval: undefined
  }),
  computed: {
    lang () {
      return this.$store.state.lang.game
    },
    round () {
      return this.$store.state.game?.round
    },
    title () {
      return this.round?.title
    },
    context () {
      return this.round?.content || 'Pourquoi ?'
    },
    thumbnail () {
      return this.round?.url || 'https://images.unsplash.com/photo-1701725313832-d8f7fadb3006?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }
  },
  methods: {
    async next () {
      if (!this.completed) return

      try {
        const round = await axios.post('/round/next')
        if (round.status === 205) return this.$router.push('/recap')
        this.$store.commit('updateRoundInfo', round.data)

        this.$router.push(`/game/${round.data.round_type.replaceAll('_', '-')}`)
      } catch (e) {
        console.log(e)
      }
    }
  },
  mounted () {
    this.interval = setInterval(() => {
      if (--this.timer > 0) return

      this.completed = true
      clearInterval(this.interval)
      this.interval = undefined
    }, 1000)
  }
}
</script>

<template>
  <div class="game">
    <p class="game--ctx"><span class="game--ctx-title">{{ title }}</span><br>{{ context }}</p>
    <span class="game--thumb" :style="`--_bg-url: url('${thumbnail}')`"></span>
    <button class="game--next" :disabled="!completed" @click="next">{{ completed ? lang.next_btn : `Jeu suivant dans : ${timer}` }}</button>
  </div>
</template>

<style scoped lang="scss">
@use '../../assets/css/variables';
@forward '../../assets/css/modules/game';

.game {
  &--ctx {
    &-title {
      opacity: .5;
      font-size: 1rem;
      font-style: normal;
      font-weight: normal;
    }
  }
  &--next {
    &:disabled {
      opacity: .6;
      cursor: not-allowed;
    }

    &:not(:disabled):hover {
      --_bg: #{variables.$gray-btn-bg};
    }
  }
}
</style>
