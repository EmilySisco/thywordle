<template>
  <div>
    <header>
      <a href="/" class="logo"><i class="fas fa-bible"></i></a>
      <h1>THY WORDLE</h1>
      <a href="" class="settings"><i class="fas fa-cog"></i></a>
    </header>

    <div class="grid">
      <Guess
        v-for="i in 7"
        :key="i"
        :word="getWordString(i - 1)"
        :result="getResultString(i - 1)"
      />
    </div>

    <div class="keyboard">
      <Keyboard :keyboard="keyboard" @key-click="handle" />
    </div>

    <!-- "hidden" input here -->
    <!-- autocomplete, onblur, oninput solutions from Stack Overflow -->
    <input
      type="text"
      name="guess"
      id="guess"
      maxlength="7"
      autocomplete="off"
      autofocus
      onblur="this.focus()"
      oninput="this.value = this.value.replace(/[^a-zA-Z]/, '')"
      @keyup="handle($event.key)"
    />
  </div>
</template>

<script>
import Guess from "../components/Guess.vue";
import Keyboard from "../components/Keyboard.vue";

export default {
  components: {
    Guess,
    Keyboard,
  },
  data() {
    return {
      guesses: [],
      currentGuess: "",
      guessCount: 0,
      keyboard: [
        [
          { key: "q", state: "" },
          { key: "w", state: "" },
          { key: "e", state: "" },
          { key: "r", state: "" },
          { key: "t", state: "" },
          { key: "y", state: "" },
          { key: "u", state: "" },
          { key: "i", state: "" },
          { key: "o", state: "" },
          { key: "p", state: "" },
        ],
        [
          { key: "a", state: "" },
          { key: "s", state: "" },
          { key: "d", state: "" },
          { key: "f", state: "" },
          { key: "g", state: "" },
          { key: "h", state: "" },
          { key: "j", state: "" },
          { key: "k", state: "" },
          { key: "l", state: "" },
        ],
        [
          { key: "enter", state: "" },
          { key: "z", state: "" },
          { key: "x", state: "" },
          { key: "c", state: "" },
          { key: "v", state: "" },
          { key: "b", state: "" },
          { key: "n", state: "" },
          { key: "m", state: "" },
          { key: "<-", state: "" },
        ],
      ],
    };
  },
  methods: {
    async handle(key) {
      if (this.guessCount < 7) {
        this.updateCurrGuess(key);

        // if e.key is enter, submit guess
        // check length of guess, must be 7
        if (
          (key === "Enter" || key === "enter") &&
          this.currentGuess.length == 7
        ) {
          console.log(`Submitting guess: ${this.currentGuess}`);
          let result = await this.getResult(this.currentGuess);
          // this.guesses.push({ word: this.currentGuess, result });
          this.guesses.push(result);
          this.updateKeyboard(result);
          this.guessCount++;
          this.clearAll();
        }
      }
    },
    async getResult(guess) {
      guess = guess.toUpperCase();

      const response = await fetch("http://localhost:3000/api/v1/guess", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ guess, guessNumber: this.guessCount }), // check, may be off by 1
      });
      const result = await response.json();

      console.log(result.guess, result.result);

      return result;
    },
    guessExists(i) {
      return this.guesses[i] !== undefined;
    },
    updateCurrGuess(key) {
      if (key == key.match(/[a-zA-Z]/) && this.currentGuess.length < 7) {
        this.currentGuess += key;
      } else if (key === "Backspace" || key === "<-") {
        this.currentGuess = this.currentGuess.slice(0, -1);
      }
    },
    updateKeyboard(result) {
      for (let i = 0; i < result.guess.length; i++) {
        this.keyboard.forEach((r) => {
          r.forEach((l) => {
            if (
              l.key.toUpperCase() === result.guess[i] &&
              this.shouldModify(result.result[i], l.state)
            ) {
              console.log(result.guess[i], result.result[i]);
              l.state = result.result[i];
            }
          });
        });
      }
    },
    shouldModify(newState, oldState) {
      if (
        newState === "c" ||
        (newState === "m" && oldState !== "c") ||
        (newState === "i" && oldState === "")
      ) {
        return true;
      }

      return false;
    },
    getWordString(i) {
      if (this.guessExists(i)) {
        return this.guesses[i].guess;
      } else if (this.guessCount == i) {
        return this.currentGuess;
      }

      return "";
    },
    getResultString(i) {
      if (this.guessExists(i)) {
        return this.guesses[i].result;
      }

      return "";
    },
    clearAll() {
      const guessInput = document.getElementById("guess");
      guessInput.value = "";
      this.currentGuess = "";
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap");

* {
  font-family: "Poppins", Helvetica, Arial, sans-serif;
  background: #0d0d0d;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #f2f2f2;
}

body {
  color: #f2f2f2;
  font-family: "Poppins", Arial, Helvetica, sans-serif;
  display: flex;
  flex: 1;
  justify-content: center;
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #3d3d3d;
}

header a {
  color: #3d3d3d;
  font-size: 1.25rem;
}

h1 {
  font-size: 3rem;
  font-weight: 700;
  padding: 0 1em 0 1em;
}

.grid {
  margin: 15px;
}

#guess {
  color: #f2f2f2;
  /* opacity: 0; */
  position: fixed;
  right: 5px;
  bottom: 5px;
}
</style>