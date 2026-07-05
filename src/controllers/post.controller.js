const postModel = require('../models/posts.model')
// const uploadPost = require('../services/file.service')
const fileService = require('../services/file.service')

async function createPost (req,res){
    // console.log(req.user.id)
    if(!req.user){
        return res.status(403).json({
            message: "forbidden role cant create post"
        })
    }

    try{    
        const {title} = req.body;
        const file = req.file;

        const result =await fileService.uploadPost(file.buffer.toString("base64"))

        const post = await postModel.create({
            uri: result.url,
            title,
            creator: req.user.id,
        })

        res.status(201).json({
            message: "post created",
            uri: result.url,
            title,
            creator: req.user.id,
        })


    } catch (err){
        console.log("error creating post")
    }

}


async function getAllPosts (req,res){

    try{
        const posts = await postModel.find().limit(10).select("uri title creator").populate("creator")

        res.status(200).json({
            message: "posts fetched",
            posts,
        })
    } catch(err){
        console.log("error fetching posts")
    }

}

module.exports = {createPost, getAllPosts};