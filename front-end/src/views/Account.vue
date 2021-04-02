<template>
  <div>
    <input v-model='username' placeholder='username'>
    <input v-model='password' placeholder='password'>
    <button @click='createAccount'>Create Account</button>
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
      }
    },
    methods: {
      async createAccount() {
        try {
          await axios.post('/api/users', {
            username: this.username,
            password: this.password
          });
        } catch (error) {
          console.log(error)
        }
      }
    }
  }
</script>