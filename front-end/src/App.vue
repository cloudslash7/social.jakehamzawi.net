<template>
  <div id="app">
    <div id="title-bar">
      <div id="logo">
        <router-link to="/"><img id="logo-image" src="@/assets/logo.png"></router-link>
        <div id='logoText'>SeaSpace</div>
      </div>
      <div id="nav">
        <div id='userInfo' v-if='user'>
          <div>{{user.username}}</div>
          <router-link to="/account"><input type='image' :src="require('@/assets/user.png')"></router-link>
          <button @click='logout'>Sign Out</button>
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
    visibility: hidden
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

#userInfo {
  color: #e4e4e4;
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
  font-weight: bold;
  color: #2c3e50;
}
</style>
