<template>
  <div>
    <h1>LeaderBoard</h1>
    <div id="leaderboard">
      <div class="row" v-for="player in this.leaderboard" :key="player.id">
        <h1>{{player.name}}</h1>
        <h2 class="wins">{{player.wins}}</h2>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      leaderboard: []
    }
  },
  methods: {
    getLeaderboard: async function () {
      let result = await this.$axios.get('http://localhost:3000/leaderboard')
      this.leaderboard = result.data
    }
  },
  created () {
    this.getLeaderboard()
  }
}
</script>

<style>
/* .wins {
  float: left;
} */
.row {
  width: 100px;
  height: 100px;
}
</style>