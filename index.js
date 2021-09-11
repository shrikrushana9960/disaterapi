const express = require('express')
const app = express()
const cors=require("cors");
var bodyParser = require('body-parser')
 const client=require("./databaseconfig");
const dotenv = require("dotenv");

const userRoute=require("./user")
app.use(bodyParser.json())
dotenv.config();
 app.use(cors());
 async function run() {
     await client.connect();
      console.log("database connected")
}

run()
app.use('/user',userRoute);
app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.listen(process.env.PORT||3000,()=>{console.log("running on port 3000")})