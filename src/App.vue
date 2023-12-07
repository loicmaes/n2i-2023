<template>
  <RouterView />
</template>

<style lang="scss">
@use './assets/css/variables';

html {
  color: variables.$text;
  background-color: variables.$background;
}
</style>
