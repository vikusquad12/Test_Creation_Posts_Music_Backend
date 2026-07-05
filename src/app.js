const express = require('express');
const authRouter = require('./routes/auth.route')
const postRouter = require('./routes/post.route')
const musicRoute = require('./routes/music.route')
const cookieParser = require('cookie-parser')
const cors = require('cors')



const app = express();

app.use(cors({
  origin: "https://test-creation-posts-music.vercel.app",
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRouter)
app.use("/api/post", postRouter)
app.use("/api/music", musicRoute)



module.exports = app;