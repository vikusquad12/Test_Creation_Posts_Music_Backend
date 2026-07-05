const express = require('express');
const postController = require('../controllers/post.controller')
const tokenMiddleware = require('../middleware/token.middleware')
const multer = require('multer')
const router = express.Router();

const upload = multer({storage: multer.memoryStorage()})


router.post("/create", tokenMiddleware.verifyToken, upload.single("image") ,postController.createPost)

router.get("/", tokenMiddleware.verifyToken, postController.getAllPosts)


module.exports = router;