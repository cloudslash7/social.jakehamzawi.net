<template>
  <div id="app">
    <div id="title-bar">
      <div id="logo">
        | HamSpace
      </div>
      <div id="nav">
        <router-link to="/">Home</router-link>
        <router-link to="/upload"><img class="icons" src="@/assets/new.png"></router-link>
        <router-link to="/account"><img class="icons" src="@/assets/user.png"></router-link>
      </div>
      <router-view/>
    </div>
  </div>
</template>

<style>
body {
  margin: 0 !important;
}

.icons {
  width: 20px;
  margin: 0 10px;
}

#title-bar {
  display: flex;
  background-color: #1b3a7c;
  padding: 20px 60px;
}

#logo {
  flex: 1;
  display: flex;
  justify-content: flex-start;
  text-align: left;
  color: #e9e9e9;
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
  text-align: center;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
