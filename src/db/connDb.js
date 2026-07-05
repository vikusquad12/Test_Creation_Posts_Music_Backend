const mongoose = require('mongoose');

async function connDb(req,res){
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("DB Connected successfully on")
    } catch(err){
        console.log("DB connection error: "+err);
    }
}


module.exports = connDb;