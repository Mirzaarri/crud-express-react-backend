const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema({
  
  firstname: {
    type:String,
    required:true
  },
  lastname: {
    type:String,
    required:true
  },
  email: {
    type:String,
    required:true
  },
  password: {
    type:String,
    required:true
  }
})

const Todo = mongoose.model("UserData", todoSchema);
module.exports = Todo;