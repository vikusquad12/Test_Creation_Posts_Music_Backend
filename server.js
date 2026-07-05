require('dotenv').config();
const app = require('./src/app')
const connDb = require('./src/db/connDb')


connDb()



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});