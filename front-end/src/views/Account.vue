<template>
  <div>
    <div v-if='user'>
      <h1>My Account</h1>
      <div>{{user.username}}</div>
      <button v-bind:class="{ active: usernameForm }" @click='toggleForm(0)'>Change Username</button>
      <button v-bind:class="{ active: passwordForm }" @click='toggleForm(1)'>Change Password</button>
      <form>
        <div><input v-if='usernameForm || passwordForm' type='password' placeholder='Current password' v-model='currentPassword'></div>
        <div><input v-if='passwordForm' type ='password' placeholder='New password' v-model='newPassword'></div>
        <div><input v-if='usernameForm' placeholder='New username' v-model='newUsername'></div>
        <div><button v-if='usernameForm || passwordForm' type='submit' @click.prevent='changeUser()'>Submit</button></div>
      </form>
    <p v-if='error' id='error'>{{errorMessage}}</p>
    </div>
    <h1>My Posts</h1>
    <div class='masonry' v-if='this.posts'>
      <div class='post' v-for='post in this.reversedPosts' :key='post._id'>
        <img class='image' :src='post.path'/>
        <div class='likes'>
            <img class='likeButton' :src='require("@/assets/liked.png")'>
            <p>{{post.likes}}</p>
            <input class='controls' id='trash' type='image' :src='require("@/assets/delete.png")' @click='deletePost(post._id)'>
        </div>
        <div id='description'>{{post.description}}</div>
        <hr>
      </div>
    </div>
    <h3 v-else>No posts! Get out there and post something!</h3>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Account',
  async created() {
    await this.getLoggedIn();
    this.getPosts();
  },
  data() {
    return {
      posts: null,
      currentPassword: "",
      newPassword: "",
      newUsername: "",
      usernameForm: false,
      passwordForm: false,
      error: false,
      errorMessage: ""
    }
  },
  computed: {
    user() {
      return this.$root.$data.user;
    },
    reversedPosts() {
      return this.posts.slice().reverse();
    }
  },
  methods: {
    async getLoggedIn() {
      try {
        let response = await axios.get('/api/users');
        this.$root.$data.user = response.data.user;
      } catch (error) {
        this.$root.$data.user = null;
      }
    },
    async getPosts() {
      try {
        let response = await axios.get('/api/posts/' + this.user._id);
        if (response.data.length === 0) this.posts = null
        else this.posts = response.data
      } catch (error) {
        console.log(error)
      }
    },
    async deletePost(id) {
      try {
          await axios.delete('/api/posts/' + id);
          this.getPosts();
          return true;
      } catch (error) {
          console.log(error);
      }
    },
    async changeUser() {
      try {
        await axios.put('/api/users/' + this.user._id, {
          currentPassword: this.currentPassword,
          newUsername: this.newUsername,
          newPassword: this.newPassword
        });
        await axios.delete('/api/users');
        this.$root.$data.user = null
        this.$router.push({name: 'Login'}) //FIXME: notify user to login again
      } catch (error) {
        console.log(error)
        this.error = true;
        this.errorMessage = error.response.data.message;
      }
    },
    toggleForm(mode) {
      if (mode === 0) {
        this.usernameForm = true;
        this.passwordForm = false;
      }
      else {
        this.usernameForm = false;
        this.passwordForm = true;
      }
      this.newUsername = this.newPassword = this.currentPassword = this.errorMessage = "";
      this.error = false;
    }
  }
}
</script>

<style scoped>
input {
  margin-bottom: 10px;
}
button {
  margin: 10px;
}
.active {
  background-color: #c0c0c0e1;
}
#error {
  color: red;
}
.masonry {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.post {
  display: inline-flex;
  flex-direction: column;
  margin: 0 1em 1em .5em;
  width: 30%;
  height: 100%;
  align-items: center;
  background-color: #ececec;
  box-shadow: 8px 8px 2px 1px #969696;
}
.image {
  width: 100%;
}
.likes {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding-left: 10px
}
.likeButton {
  width: 20px;
  height: 20px;
  margin: 0 5px;
}
#trash {
  margin-left: auto;
}
@media screen and (max-width: 600px) {
  .masonry {
    display: flex;
    flex-direction: column;
  }
  .post {
    width: 100%;
    box-shadow: none;
    margin: 0;
  }
}
</style>