const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const bodyParser = require("body-parser")
let PORT = 3080;
let mongoose = require('./config/connections');
let cors = require('cors')
let userRoutes = require('./routes/user')


// app.get("/home",(req,res)=>{
//   res.send({"name":"my"});
// })

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));


app.use('/user', userRoutes)


app.listen(PORT, 'localhost', (req, res)=>{
  console.log(`Server starting at ${PORT}`);
})