<script>
import axios from "axios";

export default {
  name: "Recap",
  computed: {
    recap () {
      return this.$store.state.recap
    }
  },
  async created () {
    try {
      const { data } = await axios.get('/game/end')
      this.$store.commit('storeRecap', data)
    } catch (e) {
      console.log(e)
    }
  }
}
</script>

<template>
  <div class="recap" v-if="recap">
    <RouterLink to="/" class="recap--back">Accueil</RouterLink>
    <h1 class="recap--total">Total : {{ recap.score }}</h1>
    <div class="recap__box" v-for="r in recap.recap" :key="r">
      <p class="recap__box--title">{{ r.gameType }}</p>
      <span class="recap__box--score">{{ r.score }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../assets/css/variables';

.recap {
  padding: 3.5em;

  &--back {
    margin-bottom: 1em;
    display: inline-flex;
    padding: .75em 1.5em;
    transition: background-color 80ms ease-in-out;
    background-color: var(--_bg, variables.$bg-accent);

    &:hover {
      --_bg: #{variables.$gray-btn-bg};
    }
  }

  &--total {
    margin-bottom: 2.5em;
  }

  &__box {
    display: flex;
    line-height: 1;
    padding: 1.5em 2em;
    align-items: center;
    justify-content: space-between;
    background-color: variables.$bg-accent;
    border: 2px solid rgba(variables.$text, .1);

    &:not(:last-child) {
      margin-bottom: 1em;
    }

    &--score {
      font-size: 1.2em;
      font-weight: 700;
    }
  }
}
</style>
