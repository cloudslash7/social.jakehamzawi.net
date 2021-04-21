<template>
    <div class='posts'>
        <div v-if='posts'>
            <div class='post' v-for='post in this.slicedPosts' :key='post._id'>
                <h3 class='username'>{{users[post.user]}}</h3>
                <img class='image' :src='post.path'/>
                <div class='likes'>
                    <input class='likeButton' v-if='post.likedUsers.find(post=>post.user===this.$root.$data.user._id)' @click='like(post._id)' alt='Like' type='image' :src='require("@/assets/liked.png")'>
                    <input class='likeButton' v-else alt='Like' @click='like(post._id)' type='image' :src='require("@/assets/unliked.png")'>
                    <p>{{post.likes}}</p>
                </div>
                <div id='description'>{{post.description}}</div>
                <hr>
                <input type='image' class='controls' alt='Comments' :src='require("@/assets/comment.png")' @click='getComments(post._id); toggleComments(post._id)'>
                <div v-if='displayComments[post._id]'>
                    <div v-if='comments.length != 0'>
                        <div v-for='commentGroup in comments' :key='commentGroup.post'>
                            <div v-if='commentGroup[0].post === post._id'>
                                <div class='comment' v-for='comment in commentGroup' :key='comment._id'>
                                    <div id='commentText'>{{comment.text}}</div>
                                    <div id='commentDate'>{{comment.date}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <textarea id='commentBox' v-model='text[post._id]' placeholder='Anything to add?'></textarea>
                    <div id='addCommentBox'>
                        <input class='controls' type='image' alt='Comment' :src='require("@/assets/check.png")' @click='addComment(post._id)'>
                    </div>
                </div>
            </div>
            <button v-if="this.posts.length > 3" @click='limiter += 2'>Show more</button>
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
            text: {},
            limiter: 3,
            comments: [],
            displayComments: {},
            users: {}
        }
    },
    async created() {
        await this.getPosts();
        this.getUsers();
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
                if (response.data.length === 0) return;
                if (response.data.length != 0) {
                    if (this.comments.length != 0) {
                        // Check if comments already exist
                        for (let i = 0; i < this.comments.length; i++) {
                            // Add only new comments to post
                            if (this.comments[i][0].post === response.data[0].post) {
                                for (let j = this.comments[i].length; j < response.data.length; j++) {
                                    this.comments[i].push(response.data[j]);
                                }
                                return true;
                            } 
                        }
                    }
                }
                this.comments.push(response.data);
            } catch (error) {
                console.log(error);
            }
        },
        toggleComments(id) {
            this.$set(this.displayComments, id, !this.displayComments[id]);
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
                    text: this.text[id],
                    date: moment().format('MM/DD/YYYY, h:mm a')
                });
                this.getPosts();
                this.getComments(id);
                this.text = {};
                return true;
            } catch (error) {
                console.log(error);
            }
        },
        async like(id) {
            try {
                await axios.put('/api/posts/' + id, {
                    user: this.$root.$data.user._id
                });
                console.log(this.likeMap[this.likeMap.findIndex(post => post.id === id)]);
                this.likeMap[this.likeMap.findIndex(post => post.id === id)].liked = true;
                this.getPosts();
                return true;
            } catch (error) {
                console.log(error);
            }
        },
        async getUsers() {
            try {
                for (let i = 0; i < this.posts.length; i++) {
                    let response = await axios.get('/api/users/' + this.posts[i].user)
                    let user = response.data
                    this.users[user._id] = user.username;
                }
                return true
            } catch (error) {
                console.log(error)
                return false
            }
        }
    }
}
</script>

<style scoped>
hr {
    border: 1px solid #cacaca;
    width: 100%;
}

.posts {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.post {
    display: flex;
    flex-direction: column;
}

.image {
    max-width: 100%;
}

.likeButton {
    width: 20px;
    margin-right: 10px;
}

.username {
    margin-right: auto;
}

.likes {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

#trash {
    margin-left: auto;
}

#description {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-align: left;
}

.comment {
    margin-top: 20px;
    text-align: left;
}

#commentDate {
    margin-left: 10px;
    font-size: .7em;
    color: #777777;
}

#commentBox {
    margin-top: 20px;
    width: 100%;
    height: 5em;
}

#addCommentBox {
    display: flex;
    width: 100%;
    justify-content: flex-end;
}
</style>
