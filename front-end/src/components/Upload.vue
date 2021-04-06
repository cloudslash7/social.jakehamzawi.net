<template>
  <div>
    <button v-if='!createPost' @click='createPost=true'>Create Post</button>
    <div v-if='createPost'>
      <h1>Create a Post</h1>
      <div class='container'>
        <div class='upload-container'>
          <input class='upload-item' id='upload-image' img='@/assets/image.png' type='file' accept='image/*' name='photo' @change='fileChanged'>
          <input class='upload-item' v-model='user' placeholder='Username'>
          <textarea class='upload-item' id='description' v-model='description' placeholder="What's on your mind?"></textarea>
          <input class='controls' type='image' :src='require("@/assets/cancel.png")' @click='createPost=false'>
          <input class='controls' type='image' alt='Upload' :src='require("@/assets/check.png")' @click='upload'>
          <div v-if='addItem'>
            <img id='preview' :src='addItem.path'/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Upload',
  data() {
    return {
      user: "",
      description: "",
      file: null,
      addItem: null,
      posts: [],
      findPost: null,
      createPost: false,
    }
  },
  created() {

  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0]
    },
    async upload() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name)
        let r1 = await axios.post('/api/photos', formData);
        let r2 = await axios.post('/api/posts', {
          user: this.user,
          description: this.description,
          path: r1.data.path
        });
        this.addItem = r2.data;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style scoped>
#preview {
  max-width: 100%;
}

#description {
  width: 100%;
  height: 100px;
}

.container {
  display: flex;
  justify-content: center;
}

.upload-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.upload-item {
  margin-top: 20px;
}
</style>