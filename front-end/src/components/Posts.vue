<template>
    <div class='posts'>
        <div v-if='posts'>
            <div v-for='post in posts.slice().reverse()' :key='post.id'>
                <p>{{post.user}}</p>
                <img class='image' :src='post.path'/>
                <p>{{post.description}}</p>
                <p>{{post.likes}}</p>
                <button @click='like(post._id)'>Like</button>
                <button @click='deletePost(post._id)'>Delete</button>
            </div>
            <button @click='limitNumber += 2'>Show more</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {   
    name: 'Posts',
    data() {
        return {
            posts: [],
            limit: 3,
        }
    },
    created() {
        this.getPosts();
    },
    methods: {
        async getPosts() {
            try {
                let response = await axios.get('/api/posts');
                this.posts = response.data;
                return true;
            } catch (error) {
                console.log(error);
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
        async like(id) {
            try {
                await axios.put('/api/posts/' + id);
                this.getPosts();
                return true;
            } catch (error) {
                console.log(error);
            }

        }
    }
}
</script>

<style scoped>
.image {
    width: 400px;
}
</style>
