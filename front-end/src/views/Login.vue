<template>
  <div>
    <div v-if='accountCreated'>
      <h2>Account created successfully!</h2>
      <h3><router-link to='/'>Back home</router-link></h3>
    </div>
      <div v-else>
        <h1 v-if='createAccount'>Create an account</h1>
        <h1 v-else>Log In</h1>
        <div class='main-container'>
          <div class='container'>
            <input class='login-box' v-model='username' placeholder='Username'>
            <input type='password' class='login-box' v-model='password' placeholder='Password'>
            <input type='password' v-if='createAccount' class='login-box' v-model='confirmPassword' placeholder='Confirm password'>
            <label v-if='!createAccount'><input type='checkbox' v-model='staySignedIn'>Stay signed in</label>
            <div v-if='!createAccount'>Don't have an account? <a @click='switchAccount'>Create one!</a></div>
            <div v-else>Already have an account? <a @click='switchAccount'>Log in!</a></div>
            <button v-if='createAccount' id='createAccount' @click.prevent='addUser'>Create Account</button>
            <button v-else @click='login'>Login</button>
          </div>
        </div>
      </div>
      <p v-if='errorMessage' id='error'>{{errorMessage}}</p>
    <hr style='margin-top:500px;'>
    <div>https://github.com/cloudslash7/social.jakehamzawi.net</div>
  </div>
</template>

<script>
import axios from 'axios';
  export default {
    name: 'Login',
    data() {
      return {
        username: "",
        password: "",
        confirmPassword: "",
        createAccount: false,
        accountCreated: false,
        errorMessage: "",
        staySignedIn: false
      }
    },
    methods: {
      async addUser() {
        if (!this.username || !this.password) {
          this.errorMessage = "Username and password required!"
          return;
        }
        if (this.password != this.confirmPassword) {
          this.errorMessage = "Passwords do not match!"
          return;
        }
        try {
          let response = await axios.post('/api/users', {
            username: this.username,
            password: this.password
          });
          this.$root.$data.user = response.data.user;
          this.username = this.password = "";
          this.accountCreated = true;
          this.errorMessage = ""
        } catch (error) {
          this.errorMessage = error.response.data.message;
          console.log(this.errorMessage)
        }
      },
      async login() {
        if (!this.username || !this.password) {
          this.error = "Username and password required!"
          return;
        }
        try {
          let response = await axios.post('/api/users/login/' + this.staySignedIn, {
            username: this.username,
            password: this.password
          });
          this.$root.$data.user = response.data.user;
          this.errorMessage = ""
          this.$router.push({ name: 'Home' })
        } catch (error) {
          this.errorMessage = error.response.data.message;
          this.$root.$data.user = null;
        }
      },
      switchAccount() {
        this.password = this.confirmPassword = this.errorMessage = ""
        this.createAccount = !this.createAccount
      }
    } 
  }
</script>

<style scoped>
.main-container {
  display: flex;
  justify-content: center;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2em;
  box-shadow: gray 1px;
  height: 200px;
}
.login-box {
  width: 200px;
  margin-bottom: 10px;
}
button {
  margin-top: 20px;
}
label {
  margin-bottom: 20px;
}
input {
  font-size: 1em;
}
a {
  cursor: pointer;
  color: #264fa8;
}
#error {
  color: red;
}
</style>