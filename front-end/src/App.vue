<template>
  <div id="app">
    <div id="title-bar">
      <div id="logo">
        <router-link to="/"><img id="logo-image" src="@/assets/logo.png"></router-link>
        <div id='logoText'>SeaSpace</div>
      </div>
      <div id="nav">
        <div class='userInfo' v-if='user'>
          <router-link class='userInfo' to="/account"><input type='image' class='topBarIcon' :src="require('@/assets/user.png')">{{user.username}}</router-link>
          <input class='topBarIcon' type='image' :src='require("@/assets/logout.png")' alt='Sign Out' @click='logout'>
        </div>
        <router-link v-if=!user to="/login"><button>Sign In</button></router-link>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  computed: {
    user: function() {
      return this.$root.$data.user;
    }
  },
  methods: {
    async logout() {
      try {
        await axios.delete("/api/users")
        this.$root.$data.user = null;
        this.$router.push({ name: 'Login' })
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style>
@media screen and (max-width: 600px) {
  #logoText {
    visibility: hidden;
  }
  body {
    font-size: .8em;
  }
  h1 {
    font-size: 2em;
  }
}
@media screen and (min-width: 600px) {
  body {
    font-size: 1em;
  }
  #logoText{
    margin-left: 20px;
  }
}
.userInfo {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
body {
  margin: 0 0 50px 0 !important;
  color: #1f1f1f;
}
.controls {
  width: 25px;
  height: 25px;
  margin: 5px;
}
.icons {
  width: 20px;
  margin: 0 14px;
}
#title-bar {
  display: flex;
  background-color: #1b3a7c;
  padding: 5px 35px;
}
#logo {
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #e4e4e4;
  font-size: 1.5em;
}
#logo-image {
  width: 65px;
  margin-right: 20px;
}
#app {
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
#nav a {
  color: #eaeaea;
  text-decoration: none;
  font-weight: bold;
}
.topBarIcon {
  width: 20px;
  margin: 0 5px 0 15px;
}
input[type="image"]:focus {
  outline: none;
}
input {
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
textarea {
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  padding: 5px;
}
</style>
