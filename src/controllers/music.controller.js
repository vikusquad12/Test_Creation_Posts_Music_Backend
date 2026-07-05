const musicModel = require('../models/music.model')
const fileService = require('../services/file.service')


async function createMusic(req,res){
    
    if(req.user.role !== 'artist'){
        return res.status(403).json({
            message: "you can't create music dont have acess"
        })
    }
    
    try{
        const {title} = req.body;
        const file = req.file;

        const result = await fileService.uploadMusic(file.buffer.toString("base64"))

        const music = await musicModel.create({
            uri: result.url,
            title,
            artist: req.user.id,
        })

        res.status(201).json({
            uri: result.url,
            title,
            artist: req.user.id,
        })







    } catch(err){
        console.log("error creating music")
    }
}


async function getAllMusic (req,res){
    if(req.user.role !== 'user'){
        return res.status(403).json({
            message: "you can't create music dont have acess"
        })
    }

    try{
        const musics = await musicModel.find().limit(10).populate("artist", "username").select("uri title")

        res.status(200).json({
            message: "music fetched",
            musics,
        })
    } catch (err){
        console.log("error you dont have acess")
    }
}


module.exports = {createMusic, getAllMusic}