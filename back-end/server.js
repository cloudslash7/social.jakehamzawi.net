const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({
    dest: '../front-end/public/images',
    limits: {
        fileSize: 10000000
    }
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user: String,
    description: String,
    path: String,
    likes: Number
})
const Post = mongoose.model('Post', postSchema)

const commentSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.ObjectId,
        ref: 'Post'
    },
    text: String,
    date: String
})
const Comment = mongoose.model('Comment', commentSchema);

const userSchema = new mongoose.Schema({
    username: String,
    password: String
})
const User = mongoose.model('User', userSchema);

mongoose.connect('mongodb://localhost:27017/seaspace', {
    useNewUrlParser: true
});

app.get('/api/posts', async (req, res) => {
    try {
        let posts = await Post.find();
        res.send(posts);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.get('/api/posts/:postID/comments', async (req, res) => {
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

// Upload photo
app.post('/api/photos', upload.single('photo'), async (req, res) => {
    if (!req.file) {
      return res.sendStatus(400);
    }
    res.send({
      path: "/images/" + req.file.filename
    });
  });

app.post('/api/posts', async (req, res) => {
    console.log(req.body.user);
    console.log(User.findOne({
        username: req.body.user
    }))
    if (User.findOne({
        username: req.body.user
    }) === false) {
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
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.post('/api/posts/:postID/comments', async (req, res) => {
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

app.post('/api/users', async (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });
    try {
        await user.save();
        res.send(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.put('/api/posts/:id', async (req, res) => {
    try {
        let post = await Post.findOne({
            _id: req.params.id
        })
        post.likes++;
        post.save();
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.delete('/api/posts/:id', async(req, res) => {
    try {
        let post = await Post.findOne({
            _id: req.params.id
        })
        if (!post) {
            res.send(404);
            return;
        }
        await Comment.deleteMany({post: post});
        await Post.deleteOne({
            _id: req.params.id
        });
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.listen(3000, () => console.log('Server listening on port 3000'));