const userModel = require('../models/register.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

async function registerUser (req,res){
    const {username, email, password, role='user'} = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })

    if(isUserAlreadyExists){
        return res.status(403).json({
            message: "user already exists with same username,email"
        })
    }


    try{
        const hash = await bcrypt.hash(password, 12);

        const user = await userModel.create({
            username,
            email,
            password:hash,
            role
        })

        res.status(201).json({
            message: "user created",
            id:user._id,
            username,
            email,
            password:hash,
            role
        })
    } catch (err){
        console.log("error creating user")
    }

}

async function loginUser (req,res){
    const {identifier, password} = req.body;

    const user = await userModel.findOne({
        $or: [
            {username:identifier},
            {email:identifier}
        ]
    })

    if(!user){
        return res.status(401).json({
            message: "Forbidden eror no user"
        })
    }

    try{
        const checkHash = await bcrypt.compare(password, user.password);

        if (!checkHash) {
            return res.status(403).json({
                message: "Invalid credentials"
            });
        }

        const jwtRadheToken = jwt.sign({
            id: user._id,
            role: user.role,
        }, process.env.JWT_SECRET)

        res.cookie("jwtRadheToken", jwtRadheToken,{
            httpOnly: true,
            secure: false, // true in production (HTTPS)
            sameSite: "lax"
        })

        res.status(200).json({
            message:"successfully loggin",
            token: jwtRadheToken,
            username: user.username,
            email:user.email,
            password: user.password,
        })


    } catch (err){
        console.log("user credential error check credentials")
        return res.status(500).json({
            message: "Server error"
        });
    }


}

function logoutUser(req, res) {
  res.clearCookie("jwtRadheToken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  return res.status(200).json({
    message: "Logged out successfully",
  });
}


module.exports = {registerUser, loginUser, logoutUser};