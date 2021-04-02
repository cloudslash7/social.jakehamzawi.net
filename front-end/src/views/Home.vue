<template>
  <div>
    <h1>Whale-come! Here are the latest posts!</h1>
    <button v-if='!createPost' @click='createPost=true'>Create Post</button>
    <div v-if='createPost'>
      <Upload></Upload>
      <button @click='createPost=false'>Cancel</button>
    </div>
    <Posts></Posts>
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
