const express = require('express');
const ForumUser = require('../MongoDB/Models/user.model')
const ForumPosts = require('../MongoDB/Models/posts.model')
const {v4} = require('uuid')
const auth = require('../middleware/auth.middleware')
const router = express.Router()
require('dotenv').config();

router.post('/newPost', auth,
    async  (req, res) => {
        try {
            const {title, body, topic} = req.body;

            const postId = v4();

            await ForumUser.updateOne({id: req.user.userId}, {
                $push: {
                    userData: {
                        postTitle: title,
                        postId
                    }
                }
            })
            const user = await ForumUser.findOne({id: req.user.userId})
            const newPost = new ForumPosts({
                postAuthor: user.username,
                postTitle: title,
                postBody: body,
                postReplies: [],
                postTopic: topic,
                id: postId,
                date: new Date()
            })

            await newPost.save()

            res.json(newPost)
        } catch (e) {
            res.status(500).json({msg: 'Something went wrong, try again later...'})
        }
    }
)

router.get('/all',
    async  (req, res) => {
        try {
            const data = await ForumPosts.find().sort({$natural:1})

            return res.json({data})
        } catch (e) {
            res.status(500).json({msg: 'Something went wrong, try again later...'})
        }
    }
)

router.get('/last/:id',
    async  (req, res) => {
        try {
            const data = await ForumPosts.find().sort({$natural:-1}).limit(+req.params.id)

            return res.json({data})
        } catch (e) {
            res.status(500).json({msg: 'Something went wrong, try again later...'})
        }
    }
)

router.get('/:id',
    async  (req, res) => {
        try {
            const data = await ForumPosts.findOne({id:req.params.id})

            return res.json({data})
        } catch (e) {
            res.status(500).json({msg: 'Something went wrong, try again later...'})
        }
    }
)

router.get('/filter/:id',
    async (req, res) => {
        try {
            const data = await ForumPosts.find({postTopic: req.params.id})

            return res.json({data})
        } catch (e) {
            res.status(500).json({msg: 'Something went wrong, try again later...'})
        }
    }
)

router.post('/addReply', auth,
        async (req, res) => {
            try {
                const {reply, postId, userId} = req.body;

                const user = await ForumUser.findOne({id: userId})

                await ForumPosts.updateOne({id: postId}, {
                    $push: {
                        postReplies: {
                            replyAuthor: user.username,
                            replyAuthorId: userId,
                            date: new Date(),
                            reply
                        }
                    }
                })


                return res.json({msg: "New Reply!"})
            } catch (e) {
                res.status(500).json({msg: 'Something went wrong, try again later...'})
            }
        }
    )

module.exports = router;
