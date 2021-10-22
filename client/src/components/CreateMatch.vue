<template>
  <div>
    <h1>Create match</h1>
    <div v-if="!user">
      <h3>You need to be logged in to create a match</h3>
      <div v-if="tryToLogin">
        <input type="email" v-model="email" placeholder="email">
        <input type="password" v-model="password" placeholder="password">
        <button @click="login">Log in</button>
        <p @click="tryToLogin = !tryToLogin">Click me if you want to create an account instead</p>
      </div>
      <div v-else>
        <input type="text" v-model="name" placeholder="name">
        <input type="email" v-model="email" placeholder="email">
        <input type="password" v-model="password" placeholder="password">
        <button @click="signUp">Sign up</button>
      </div>
    </div>
    <div v-else>
      <p>Logged in as {{user.name}}</p>

      <input type="text" placeholder="opponent player id" v-model="opponentId">
      <button @click="createMatch">Create match</button>
      <br>
      <input type="text" placeholder="match id" v-model="matchId">
      <input type="text" placeholder="your score" v-model="score1">
      <input type="text" placeholder="opponent score" v-model="score2">
      <button @click="finishMatch">Finish match</button>
    </div>
    
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: false,
      tryToLogin: true,
      name: '',
      email: '',
      password: '',
      opponentId: null,
      matchId: null,
      score1: null,
      score2: null,
    }
  },
  methods: {
    signUp : function () {
      this.$axios.post('http://localhost:3000/signup', {"name": this.name, "email": this.email, "password": this.password})
      this.tryToLogin = true
    },
    login : async function () {
      this.$axios.post('http://localhost:3000/login', {"email": this.email, "password": this.password})
        .then((response) => {
          this.user = response.data
        })
    },
    createMatch : function () {
      this.$axios.post('http://localhost:3000/matches/createMatch', {"player1_id": this.user.id, "player2_id": this.opponentId})
        .then(response => console.log(response.data))
    },
    finishMatch : function () {
      this.$axios.post('http://localhost:3000/matches/finish/' + this.matchId, {"score1": this.score1, "score2": this.score2})
    }
  }
}
</script>

<style>
</style>