require('dotenv').config();
const app = require('./src/app')
const connDb = require('./src/db/connDb')


connDb()



app.listen(3000, ()=>{
    console.log("server started at 3000")
})