<template>
  <div>
    <div v-if='user'>
      <h1>My Account</h1>
      <div>Current username: {{user.username}}</div>
      <input placeholder='New username' v-model='newUsername'>
      <button @click='changeUsername()'>Change username</button>
      <form>
        <input type='password' placeholder='Current password' v-model='currentPassword'>
        <input type ='password' placeholder='New password' v-model='newPassword'>
        <button type='submit' @click.prevent='changePassword()'>Submit</button>
      </form>
    </div>
    <h1>Your Posts</h1>
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
    async changeUsername() {
      try {
        await axios.put('/api/users/' + this.user._id, {
          currentPassword: this.currentPassword,
          newUsername: this.newUsername
        })
        await axios.delete('/api/users');
        this.$root.$data.user = null;
        this.$router.push({name: 'Login'})
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped>
.masonry {
  display: flex;
  flex-wrap: wrap;
}
.post { /* Masonry bricks or child elements */
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
</style>