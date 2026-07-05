const jwt = require('jsonwebtoken')

async function verifyToken (req,res, next){
    const token = req.cookies?.jwtRadheToken;

    if(!token){
        return res.status(403).json({
            message:"no radhe acess"
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // console.log("croosed")
        req.user = decoded;
        // console.log(req.user)
        // console.log("leaving")

        next()
    } catch(err){
        console.log("error verifying token")
    }
    
}

module.exports = {verifyToken};