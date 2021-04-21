<template>
  <div>
    <div class='main-container'>
      <h1>Whale-come! Here are the latest posts!</h1>
      <div v-if='user' class='container'><Upload></Upload></div>
      <div class='container'><Posts></Posts></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Upload from '@/components/Upload.vue'
import Posts from '@/components/Posts.vue'
import axios from 'axios'
export default {
  name: 'Home',
  components: {
    Upload,
    Posts
  },
  async created() {
    try {
      let response = await axios.get('/api/users');
      this.$root.$data.user = response.data.user;
    } catch (error) {
      this.$root.$data.user = null;
    }
  },
  computed: {
    user: function() {
      return this.$root.$data.user;
    }
  }
}
</script>

<style scoped>
@media screen and (max-width: 600px) {
  .container {
    display: flex;
    justify-content: center;
    width: 60%;
    margin: 10px;
  }
}

@media screen and (min-width: 600px) {
  .container {
    display: flex;
    justify-content: center;
    width: 40%;
  }
}

.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>