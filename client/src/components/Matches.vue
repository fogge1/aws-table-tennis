<template>
  <div>
    <div id="main">
      <h1>Matches</h1>

      <div class="match headers">
        <div class="column">date</div>
        <div class="column">points</div>
        <div class="column">winner</div>

      </div>
      <div class="match" v-for="match in this.matches" :key="match.id">
        <!-- {{match}} -->
        <div class="column">{{match.date.substring(0, 21)}}</div>
        <div class="column">
          <div class="points">
            {{players[match.player_ids[0]]}}: {{match.points[0]}}
            <br>
            {{players[match.player_ids[1]]}}: {{match.points[1]}}
          </div>
        </div>
        <div class="column">
          winner
          <br>
          <!-- {{
              match.points[0] == match.points[1] ? "draw" : 
              match.points[0] > match.points[1] ?  : "2"
            }} -->
          {{players[match.winner_id]}}
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
      players: {} //lookup tasbles keys=ids, values=names
    }
  },
  methods: {
    getMatches: async function () {
      let result = await this.$axios.get('http://localhost:3000/matches')
      this.matches = result.data
      let playerIds = []
      for (let match of this.matches) {
        playerIds.push(match.player_ids[0])
        playerIds.push(match.player_ids[1])
      }
      playerIds = [... new Set(playerIds)] //remove duplicates

      this.getPlayers(playerIds)
    },
    getPlayers: async function (ids) {
      let reqs = []
      for (let id of ids) {
        reqs.push(await this.$axios.get('http://localhost:3000/players/' + id))
      }
      this.$axios.all(reqs).then(res => {
        res = res.map(x => x.data[0].name)
        let obj = {}
        for (let i = 0; i < res.length; i++) {
          obj[ids[i]] = res[i]
        }
        this.players = obj
      })
    },
  },
  created () {
    this.getMatches()
    // this.getPlayer(12).then(res => { console.log(res.data) })

  }

}
</script>

<style>
.match {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  margin-bottom: 30px;
}
/* nthchild() */
.headers > .column {
  margin: 45px;
  margin-bottom: 0;
  margin-top: 0;
}
.column {
  margin: 10px;
  margin-bottom: 0;
  margin-top: 0;
}
</style>