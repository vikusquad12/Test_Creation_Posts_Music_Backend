const express = require('express')
const tokenMiddleware = require('../middleware/token.middleware')
const musicConroller = require('../controllers/music.controller')
const multer = require('multer')
const router = express.Router();


const upload = multer({storage: multer.memoryStorage()})



router.post("/create", tokenMiddleware.verifyToken, upload.single("music"), musicConroller.createMusic)

router.get("/", tokenMiddleware.verifyToken, musicConroller.getAllMusic)


module.exports = router;