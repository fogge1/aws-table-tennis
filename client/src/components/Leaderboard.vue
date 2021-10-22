<template>
  <div>
    <h1>LeaderBoard</h1>
    <div id="leaderboard">
      <div class="row" v-for="player in this.leaderboard" :key="player.id">
        {{player.name}} {{player.wins}}

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
#leaderboard {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.row {
  margin-bottom: 30px;
}
</style>