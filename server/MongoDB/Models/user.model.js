const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
        unique: true
    },
    userData: [{postTitle: String, postId: String}]
})

module.exports = model('ForumUserModel', schema)