<template>
  <div>
    <div id="main">
      <h1>Matches</h1>

      <div id="leaderboard">
        <div class="row" v-for="match in this.matches" :key="match.id">
          {{match}}
          <br>
          {{this.getPlayer(12)}}

        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      matches: [],
    }
  },
  methods: {
    getMatches: async function () {
      let result = await this.$axios.get('http://localhost:3000/matches')
      this.matches = result.data
      //loop

    },
    getPlayer: async function (id) {
      let result = await this.$axios.get('http://localhost:3000/players/' + id)
      return result
    },
    created () {
      this.getMatches()
      // this.getPlayer(12).then(res => { console.log(res.data) })

    }

  }
}
</script>

<style>
#main {
  /* width: 400px; */
}
.row {
  width: 100%;
}
</style>