<template>
  <div>
    <div v-if='user'>
      <h1>My Account</h1>
      <div>Current username: {{user.username}}</div>
      <input placeholder='New username'>
      <form>
        <input type='password' placeholder='Current password' v-model='currentPassword'>
        <input type ='password' placeholder='New password' v-model='newPassword'>
        <button type='submit' @click.prevent='changePassword()'>Submit</button>
      </form>
    </div>
    <div v-if='this.posts'>
      <h1>Your Posts</h1>
      <div v-for='post in this.slicedPosts' :key='post._id'>
        <img class='image' :src='post.path'/>
        <div class='likes'>
            <input class='likeButton' v-if='post.likedUsers.find(post=>post.user===this.$root.$data.user._id)' @click='like(post._id)' alt='Like' type='image' :src='require("@/assets/liked.png")'>
            <input class='likeButton' v-else alt='Like' @click='like(post._id)' type='image' :src='require("@/assets/unliked.png")'>
            <p>{{post.likes}}</p>
            <input class='controls' id='trash' type='image' :src='require("@/assets/delete.png")' @click='deletePost(post._id)'>
        </div>
        <div id='description'>{{post.description}}</div>
        <hr>
      </div>
    </div>
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
      newUsername: ""
    }
  },
  computed: {
    user() {
      return this.$root.$data.user;
    },
    slicedPosts() {
      return this.posts.slice(this.posts.length - this.limit, this.posts.length).reverse();
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
    async changePassword() {
      try {
        await axios.put('/api/users/' + this.user._id, {
          currentPassword: this.currentPassword,
          newPassword: this.newPassword
        });
        await axios.delete('/api/users');
        this.$root.$data.user = null
        this.$router.push({name: 'Login'}) //FIXME: notify user to login again
      } catch (error) {
        console.log(error)
      }
    },
  }
}
</script>