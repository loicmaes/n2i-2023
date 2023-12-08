<script>
import axios from "axios";

export default {
  name: "Quiz",
  data: () => ({
    completed: false,
    tries: 3
  }),
  computed: {
    lang () {
      return this.$store.state.lang.game
    },
    round () {
      return this.$store.state.game?.round
    },
    thumbnail () {
      return this.round?.image
    },
    context () {
      return this.round?.question
    },
    answers () {
      return this.round?.answers
    }
  },
  methods: {
    async answer (answer) {
      if (this.tries <= 0) return

      try {
        const { data } = await axios.post(`/round/answer/quiz/${this.round.round_id}`, {
          answer
        })
        if (data.is_correct) {
          this.completed = true
          this.tries = 0
          alert('Bien joué !')
          return
        }

        --this.tries
        this.$store.commit('incrementScore')
        alert('Faux !')
      } catch (e) {
        console.log(e)
      }
    },
    async next () {
      try {
        const { data, status } = await axios.post('/round/next')
        if (status === 205) return this.$router.push('/recap')
        this.$store.commit('updateRoundInfo', data)
        this.$router.push(`/game/${data.round_type.replaceAll('_', '-')}`)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<template>
  <div class="game" v-if="round">
    <span class="game--thumb" :style="`--_bg-url: url('${thumbnail}')`"></span>

    <p class="game--ctx">{{ context }}</p>

    <div class="game__answers">
      <button @click="answer(a)" class="game__answers--item" data-answer-id="" :key="a" v-for="(a, index) in answers"><span class="game__answers--item-high">{{ index + 1 }}.</span> {{ a }}</button>
    </div>

    <button class="game--next" @click.prevent="next" v-if="completed || tries === 0">{{ lang.next_btn }}</button>
  </div>
</template>

<style scoped lang="scss">
@use '../../assets/css/variables';
@forward '../../assets/css/modules/game';

$gap: 1.5em;

.game {
  &__answers {
    gap: $gap;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));

    &--item {
      text-align: left;
      padding: .75em 1.5em;
      transition: background-color 80ms ease-in-out;
      background-color: var(--_bg, variables.$bg-accent);

      &-high {
        width: 2ch;
        opacity: .35;
        display: inline-block;
      }

      &:hover {
        --_bg: #{variables.$gray-btn-bg};
      }
    }
  }
}
</style>
