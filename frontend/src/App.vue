<script >
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup

export default {
  
}

</script>

<template>

  <router-link to="/">Play</router-link> |
  <router-link to="/login">Login</router-link> | 
  <router-link to="/register">Register</router-link> |
  <router-link to="/leaderboard">Leaderboard</router-link>

  <router-view/>

</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
 