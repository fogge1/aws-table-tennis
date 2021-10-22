<template>
  <div>
      <p v-for="player in leaderboard" :key="player.id">{{player}}</p>
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
        getLeaderboard : async function () {
            let result = await this.$axios.get('http://localhost:3000/leaderboard');
            this.leaderboard = result.data
        }
    },
    created() {
        this.getLeaderboard()
  }
}
</script>

<style>

</style>