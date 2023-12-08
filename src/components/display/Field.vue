<script>
export default {
  name: "Field",
  data: () => ({
    value: undefined
  }),
  props: {
    fill: String,
    placeholder: {
      type: String,
      defaultValue: () => this.$store.state.lang.default_placeholder
    },
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      defaultValue: () => 'text'
    },
    pattern: String,
    inputmode: String
  },
  created () {
    this.value = this.fill
  }
}
</script>

<template>
  <div class="input">
    <input :type="type" :pattern="pattern" :inputmode="inputmode" :id="name" :name="name" class="input--field" v-model="value" :placeholder="placeholder" v-if="name" />
  </div>
</template>

<style scoped lang="scss">
@use '../../assets/css/variables';

.input {
  width: 100%;
  min-width: 10em;
  background-color: variables.$input-bg;

  &--field {
    width: 100%;
    line-height: 1;
    appearance: none;
    padding: .75em 1em;
    color: currentColor;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    &[type=number] {
      -moz-appearance: textfield;
    }
  }
}
</style>
