const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    uri:{
        type:String,
    },
    title:{
        type:String,
        required:true,
    },
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'register',
        required: true,
    }
})

const postModel = new mongoose.model("post", postSchema)

module.exports = postModel;