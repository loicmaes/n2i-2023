<script>
import { logout } from "@/assets/functions/authentication.js";
import axios from 'axios'

export default {
  name: "Home",
  computed: {
    lang () {
      return this.$store.state.lang.game.menu
    },
    alreadyPlaying () {
      return this.$store.state.game !== undefined
    },
    leaderboard () {
      return this.$store.state.leaderBoard
    }
  },
  methods: {
    logout () {
      logout()
      this.$router.push('/auth')
    },
    async newGame () {
      try {
        const game = await axios.post('/game')
        this.$store.commit('storeGame', game.data)

        const round = await axios.post('/round/next')
        this.$store.commit('updateRoundInfo', round.data)

        this.$router.push(`/game/${round.data.round_type.replaceAll('_', '-')}`)
      } catch (e) {
        console.log(e)
      }
    },
    async recoverRound () {
      try {
        const game = await axios.get('/game')
        this.$store.commit('storeGame', game.data)

        const round = await axios.get('/round/current')
        this.$store.commit('updateRoundInfo', round.data)

        this.$router.push(`/game/${round.data.round_type.replaceAll('_', '-')}`)
      } catch (e) {
        console.log(e)
      }
    }
  },
  async created () {
    try {
      const { data } = await axios.get('/leaderboard')
      this.$store.commit('storeLeader', data.leaderboard)
    } catch (e) {
      console.log(e)
    }
  }
}
</script>

<template>
  <div class="home">
    <div class="home__leaderboard">
      <h1 class="home__leaderboard--title">Leaderboard</h1>
      <div class="home__leaderboard__player" :key="p" v-for="p in leaderboard">
        <p class="home__leaderboard__player--name">{{ p.username }}</p>
        <span class="home__leaderboard__player--score">{{ p.score }}</span>
      </div>
    </div>
    <nav class="home__menu">
      <h1 class="home__menu--title">{{ lang.title }}</h1>
      <button @click="newGame" class="home__menu--link">{{ alreadyPlaying ? lang.new_btn : lang.play_btn }}</button>
      <button @click="recoverRound" class="home__menu--link" v-if="alreadyPlaying">{{ lang.continue_btn }}</button>
      <RouterLink to="/credits" class="home__menu--link">Crédits</RouterLink>
      <button @click="logout" class="home__menu--link quit">{{ lang.quit_btn }}</button>
    </nav>
  </div>
</template>

<style scoped lang="scss">
@use '../assets/css/variables';

.home {
  display: grid;
  min-height: 100vh;
  position: relative;
  place-items: center;

  &__leaderboard {
    top: 1em;
    right: 1em;
    display: flex;
    padding: 1em 1.5em;
    position: absolute;
    flex-direction: column;
    background-color: variables.$bg-accent;

    &--title {
      font-size: 1.2em;
      font-weight: 700;
      margin-bottom: 1rem;
    }

    &__player {
      gap: 3em;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  &__menu {
    gap: 1em;
    width: 45%;
    display: flex;
    min-width: 10em;
    padding: 4em 3em 3em;
    flex-direction: column;
    background-color: variables.$bg-accent;

    &--title {
      font-size: 1.5em;
      font-weight: 800;
      text-align: center;
      margin-bottom: 1.5em;
      text-transform: uppercase;
    }

    &--link {
      text-align: center;
      align-items: center;
      padding: .75em 1.5em;
      transition: background-color 80ms ease-in-out;
      color: var(--_color, variables.$gray-btn-color);
      background-color: var(--_bg, variables.$gray-btn-bg);

      &:hover {
        --_bg: #{variables.$gray-btn-bg-hover};
      }

      &.quit {
        --_bg: #{variables.$danger-btn-bg};
        --_color: #{variables.$danger-btn-color};

        &:hover {
          --_bg: #{variables.$danger-btn-bg-hover};
        }
      }
    }
  }
}
</style>
