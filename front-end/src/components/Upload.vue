<template>
  <div>
    <h1>Create a Post</h1>
    <div class='container'>
      <div class='upload-container'>
        <input id='upload-image' img='@/assets/image.png' type='file' accept='image/*' name='photo' @change='fileChanged'>
        <input v-model='user' placeholder='Username'>
        <textarea id='description' v-model='description' placeholder="What's on your mind?"></textarea>
        <button @click='upload'>Upload</button>
        <div v-if='addItem'>
          <img id='preview' :src='addItem.path'/>
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
  width: 400px;
}

#description {
  width: 80%;
  height: 200px;
}

.container {
  display: flex;
  justify-content: center;
}

.upload-container {
  display: flex;
  flex-direction: column;
  width: 50%;
  align-items: center;
  justify-content: center;
}
</style>