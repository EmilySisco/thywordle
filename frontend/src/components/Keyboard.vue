<template>
  <div class="keyboard">
    <div class="row" v-for="r in keyboard" :key="r[0].key">
      <button
        v-for="l in r"
        :class="`key ${l.state}`"
        :key="l.key"
        @click="letterClick(l.key)"
      >
        {{ l.key }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Keyboard",
  props: {
    keyboard: Array,
  },
  methods: {
    letterClick(e) {
      this.$emit("key-click", e);
    },
  },
};
</script>

<style>
button {
  border: 0;
}

.keyboard {
  margin-top: 40px;
}

.key {
  color: #fff;
  background: #939598;
  border-radius: 7px;
  min-width: 40px;
  min-height: 60px;
  font-size: 1.5em;
  margin: 3px;
  padding: 7px;
}

.key.i {
  background: #3a3a3c;
}

.key.m {
  background: #b59f3b;
}

.key.c {
  background: #538d4e;
}
</style>