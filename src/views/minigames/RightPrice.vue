<script>
import axios from "axios";
import Field from "@/components/display/Field.vue";

export default {
  name: "RightPrice",
  components: {Field},
  data: () => ({
    timeout: false,
    tries: 10,
    dir: undefined
  }),
  computed: {
    lang () {
      return this.$store.state.lang.game
    },
    round () {
      return this.$store.state.game?.round
    },
    context () {
      return this.round?.question
    },
    thumbnail () {
      return this.round?.image
    },
    order_of_magnitude () {
      return this.round?.order_of_magnitude
    }
  },
  methods: {
    async sendTry () {
      const answer = this.$refs.number.value
      if (!answer) return

      try {
        console.log(this.round)
        const { data } = await axios.post(`/round/answer/right_price/${this.round.round_id}`, {
          answer
        })
        if (data.is_correct) {
          this.timeout = true
          this.tries = 0
          alert('Bien joué')
          return
        }

        --this.tries
        this.dir = !data.is_lower ? 'moins' : 'plus'
        this.$store.commit('incrementScore')
      } catch (e) {
        console.log(e)
      }
    },
    async next () {
      try {
        const round = await axios.post('/round/next')
        if (round.status === 205) return this.$router.push('/recap')
        this.$store.commit('updateRoundInfo', round.data)

        this.$router.push(`/game/${round.data.round_type.replaceAll('_', '-')}`)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<template>
  <div class="game">
    <span class="game--thumb" :style="`--_bg-url: url('${thumbnail}')`"></span>
    <p class="game--ctx">{{ context }}</p>
    <p class="game--indication" v-if="tries > 0">{{ tries < 10 ? lang.right_price.steps_left.replace('%dir', dir).replace('%tries', tries) : lang.right_price.first_step }}</p>

    <form @submit.prevent="sendTry" class="game__line">
      <div class="game__line--field">
        <Field name="number" ref="number" type="number" :placeholder="lang.right_price.placeholder" />
        <span class="game__line--field-unit">{{ order_of_magnitude }}</span>
      </div>
      <button class="game__line--send" @click="" :disabled="tries <= 0">›</button>
    </form>

    <button class="game--next" @click="next" v-if="tries < 10">{{ tries === 0 ? lang.next_btn : lang.right_price.skip }}</button>
  </div>
</template>

<style scoped lang="scss">
@use '../../assets/css/variables';
@forward '../../assets/css/modules/game';

.game {
  &__line {
    gap: .5em;
    width: 100%;
    display: flex;

    &--field {
      flex: 1 1 100%;
      position: relative;

      &-unit {
        top: 50%;
        opacity: .4;
        right: 1.5em;
        translate: 0 -50%;
        position: absolute;
      }
    }

    &--send {
      width: 3em;
      padding: .75em;
      line-height: 1;
      flex: 0 0 auto;
      transition: background-color 80ms ease-in-out;
      background-color: var(--_bg, variables.$bg-accent);

      &:hover {
        --_bg: #{variables.$gray-btn-bg};
      }
    }
  }
}
</style>
