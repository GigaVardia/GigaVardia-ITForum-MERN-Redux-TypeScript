const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    postTitle: {
        type: String,
        required: true,
    },
    postBody:{
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true
    },
    postTopic: {
        type: String,
        required: true
    },
    postReplies: [{replyAuthor: String, replyAuthorId: String, reply: String, date: String}],
    id: {
        type: String,
        required: true,
        unique: true
    }
})

module.exports = model('ForumPosts', schema)