<template>
  <div>
    <div v-if='accountCreated'>
      <h2>Account created successfully!</h2>
      <h3><router-link to='/'>Back home</router-link></h3>
    </div>
    <div v-else>
      <h1>Create an account</h1>
      <div class='main-container'>
        <div class='container'>
          <input class='account-box' v-model='username' placeholder='username'>
          <input class='account-box' v-model='password' placeholder='password'>
        </div>
      </div>
      <button id='createAccount' @click='createAccount'>Create Account</button>
    </div>
    <hr style='margin-top:500px;'>
    <div>https://github.com/cloudslash7/social.jakehamzawi.net</div>
  </div>
</template>

<script>
import axios from 'axios';
  export default {
    name: 'Account',
    data() {
      return {
        username: "",
        password: "",
        accountCreated: false
      }
    },
    methods: {
      async createAccount() {
        try {
          await axios.post('/api/users', {
            username: this.username,
            password: this.password
          });
          this.username = this.password = "";
          this.accountCreated = true;
        } catch (error) {
          console.log(error)
        }
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
}
.account-box {
  width: 200px;
  margin-bottom: 10px;
}

#createAccount {
  margin-top: 20px;
}
</style>