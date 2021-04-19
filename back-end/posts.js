const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();
const user = require('./users.js')

const postSchema = new mongoose.Schema({
    user: String,
    description: String,
    path: String,
    likes: Number
})
const commentSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.ObjectId,
        ref: 'Post'
    },
    text: String,
    date: String
})

const User = user.model;
const Post = mongoose.model('Post', postSchema)
const Comment = mongoose.model('Comment', commentSchema)

router.get('/', async (req, res) => {
    try {
        let posts = await Post.find();
        res.send(posts);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.get('/:postID/comments', async (req, res) => {
    try {
        let post = await Post.findOne({
            _id: req.params.postID
        })
        if (!post) {
            res.send(404);
            return;
        }
        let comments = await Comment.find({post:post});
        res.send(comments);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});



router.post('/', async (req, res) => {
    let userFound = await User.countDocuments({username:req.body.user}, function (err, count) {
        if (err) {
            console.log(err);
            return 0;
        }
        else {
            console.log("User \"" + req.body.user + "\" - " + count);
            return count;
        }
    });
    if (!userFound) {
        console.log("User \"" + req.body.user + "\" not found!");
        res.sendStatus(404);
        return false;
    }
    const post = new Post({
        user: req.body.user,
        description: req.body.description,
        path: req.body.path,
        likes: 0
    });
    try {
        await post.save();
        res.send(post);
        return true;
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
        return false;
    }
});

router.post('/:postID/comments', async (req, res) => {
    try {
        let post = await Post.findOne({
            _id: req.params.postID
        })
        if (!post) {
            res.send(404);
            return;
        }
        let comment = new Comment({
            post: post,
            text: req.body.text,
            date: req.body.date,
        })
        console.log(comment);
        await comment.save();
        res.send(comment);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

module.exports = {
    routes: router,
    model: Post,
    model: Comment
};