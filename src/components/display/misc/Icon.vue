<script>
export default {
  name: "Icon",
  props: {
    icon: {
      type: String,
      required: true
    }
  }
}
</script>

<template>
  <span class="icon" v-if="icon">
    <!-- TODO: Setup your icon library -->
  </span>
</template>

<style scoped lang="scss">
.icon {
  height: 1em;
  line-height: 1;
  display: inline-block;

  > svg {
    height: 100%;
  }
}
</style>
