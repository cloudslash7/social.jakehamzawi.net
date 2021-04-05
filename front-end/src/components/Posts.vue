<template>
    <div class='posts'>
        <div v-if='posts'>
            <div v-for='post in this.slicedPosts' :key='post._id'>
                <p>{{post.user}}</p>
                <img class='image' :src='post.path'/>
                <p>{{post.description}}</p>
                <p>{{post.likes}}</p>
                <div v-if='comments.length != 0'>
                    <div v-for='commentGroup in comments' :key='commentGroup.post'>
                        <div v-if='commentGroup[0].post === post._id'>
                            <div v-for='comment in commentGroup' :key='comment._id'>
                                {{comment.text}}
                            </div>
                        </div>
                    </div>
                </div>
                <button @click='getComments(post._id)'>Show Comments</button>
                <button @click='like(post._id)'>Like</button>
                <button @click='deletePost(post._id)'>Delete</button>
                <textarea v-model='text' placeholder='Comment...'></textarea>
                <button @click='addComment(post._id)'>Comment</button>
            </div>
            <button @click='limiter += 2'>Show more</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
export default {   
    name: 'Posts',
    data() {
        return {
            posts: [],
            text: '',
            limiter: 3,
            comments: [],
            activePost: 0,
        }
    },
    created() {
        this.getPosts();
    },
    computed: {
        limit: function () {
            if (this.limiter > this.posts.length) return this.posts.length;
            return this.limiter;
        },
        slicedPosts: function() {
            return this.posts.slice(this.posts.length - this.limit, this.posts.length).reverse();
        },
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
        async getComments(id) {
            try {
                let response = await axios.get('/api/posts/' + id + '/comments');
                if (response.data.length != 0) {
                    if (this.comments.length != 0) {
                        this.comments.forEach(comments => {
                            if (comments[0].post === response.data[0].post) return;
                        })
                    }
                }
                this.comments.push(response.data);
                this.activePost = id;
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
        async addComment(id) {
            try {
                await axios.post('/api/posts/' + id + '/comments', {
                    text: this.text,
                    date: moment().format('MMMM Do YYYY, h:mm:ss a')
                });
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
