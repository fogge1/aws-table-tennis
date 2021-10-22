<template>
  <div id="app">
    <div class="container">
      <leaderboard />
      <matches />
      <createMatch />
    </div>

  </div>
</template>

<script>
import leaderboard from "@/components/Leaderboard.vue"
import createMatch from "@/components/CreateMatch.vue"
import matches from "@/components/Matches.vue"

export default {
  name: 'App',
  data () {
    return {

    }
  },
  components: {
    leaderboard,
    createMatch,
    matches
  },
  methods: {
  },


}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.container {
  margin: 50px;
  /* background-color: red; */
  height: 100%;
  display: flex;
  flex-direction: row;
  /* justify-content: space-between; */
  /* justify-content: space-evenly; */
}
.container > div {
  margin: 0;
  margin: 50px;
  margin-top: 0;
  /* background-color: green; */
}
.container > div:nth-child(1) {
  /*LeaderBoard*/
  flex: 1;
}
.container > div:nth-child(2) {
  /*matches*/
  flex: 2;
}
.container > div:nth-child(3) {
  /*Create Match*/
  flex: 1;
}
</style>
