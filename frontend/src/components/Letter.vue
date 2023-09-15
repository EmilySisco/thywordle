<template>
  <input
    type="text"
    text=""
    :class="`letter ${letterState}`"
    maxlength="1"
    disabled
    :value="letter"
  />
</template>

<script>
export default {
  name: "Letter",
  props: {
    letter: String,
    letterState: String,
  },
};
</script>

<style>
.letter {
  font-weight: 500;
  text-transform: uppercase;
  width: 50px;
  height: 50px;
  margin: 2px 3px 2px 3px;
  outline: none;
  border: 2px solid #3b3b3b;
  background: #151515;
  color: #f2f2f2;

  /* font-size: 40px; */
  font-size: 2em;
  text-align: center;
  caret-color: transparent;
}

.letter.i {
  background-color: #3a3a3c;
}

.letter.m {
  /* background-color: #5D768C; */
  background-color: #b59f3b;
}

.letter.c {
  /* background-color: #734124; */
  /* background-color: #45A1F7; */
  background-color: #538d4e;
}
</style>