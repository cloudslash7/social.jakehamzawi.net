<template>
  <div>
    <div class='main-container'>
      <h1>Whale-come! Here are the latest posts!</h1>
      <div class='container'>
        <Upload></Upload>
      </div>
      <div class='container'><Posts></Posts></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Upload from '@/components/Upload.vue'
import Posts from '@/components/Posts.vue'
export default {
  name: 'Home',
  components: {
    Upload,
    Posts
  },
  data() {
    return {
      createPost: false,
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  width: 40%;
}

.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>