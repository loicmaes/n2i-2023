<script>
export default {
  name: "Credits"
}
</script>

<template>
  <div class="credits">
    <div class="credits__box">
      <img src="/assets/img/loic.jpg" alt="Loïc MAES" class="credits__box--avatar" />
      <span class="credits__box--badge">LEAD</span>
      <p class="credits__box--name">Loïc MAES</p>
      <span class="credits__box--job">Développeur front-end</span>
      <a href="mailto:work@maesloic.fr" class="credits__box--contact">Contact</a>
    </div>
    <div class="credits__box">
      <img src="/assets/img/tom.jpg" alt="Tom CZEKAJ" class="credits__box--avatar" />
      <p class="credits__box--name">Tom CZEKAJ</p>
      <span class="credits__box--job">Développeur back-end</span>
      <a href="mailto:contact@dotslash.fr" class="credits__box--contact">Contact</a>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../assets/css/variables';

.credits {
  gap: 2em;
  display: flex;
  flex-wrap: wrap;
  min-height: 100vh;
  align-items: center;
  justify-content: center;

  &__box {
    padding: 1em;
    display: flex;
    max-width: 10em;
    position: relative;
    flex-direction: column;
    background-color: variables.$bg-accent;

    &--avatar {
      width: 4.5em;
      object-fit: cover;
      margin-block: 1em;
      align-self: center;
      border-radius: 50%;
      aspect-ratio: 1 / 1;
      object-position: center;
    }

    &--badge {
      top: 1rem;
      left: 1rem;
      line-height: 1;
      font-size: .75em;
      position: absolute;
      padding: .35em .5em;
      color: variables.$bg;
      background-color: variables.$text;
    }
  }
}
</style>
