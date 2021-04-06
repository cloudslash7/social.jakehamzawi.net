<template>
  <div id="app">
    <div id="title-bar">
      <div id="logo">
        <router-link to="/"><img id="logo-image" src="@/assets/logo.png"></router-link>
        <div id='logoText'>SeaSpace</div>
      </div>
      <div id="nav">
        <router-link to="/account"><img class="icons" src="@/assets/user.png"></router-link>
      </div>
    </div>
    <router-view/>
  </div>
</template>

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

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
