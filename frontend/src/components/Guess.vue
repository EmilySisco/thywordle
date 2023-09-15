<template>
  <div class="row">
    <Letter
      v-for="i in 7"
      :key="i"
      :letter="word[i - 1]"
      :letterState="result[i - 1]"
    />
  </div>
</template>

<script>
import Letter from "./Letter.vue";

export default {
  name: "Guess",
  components: { Letter },
  props: {
    word: String,
    result: String,
  },
};
</script>

<style>
</style>