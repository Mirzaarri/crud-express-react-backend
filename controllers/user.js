const Todo = require("../models/user");

const jwt = require('jsonwebtoken');

const createdata = async (req, res) =>{
try {
  const {firstname, lastname, email, password} = req.body;
  const todo = new Todo({
    firstname,
    lastname,
    email,
    password,
  })
  await todo.save()
  res.json(todo);
} catch (err) {
  res.status(500).json({error: err.message})
}
}

// try {
//   const { firstname, lastname, email, password } = req.body; 
//   const hashPassword = await bcrypt.hash(password, 10);
//   const newUser = new Todo({ firstname, lastname, email, password: hashPassword });
//   await newUser.save();

//   res.status(201).json({ message: 'User created successfully' });
// } catch (error) {
//   res.status(500).json({ error: error.message });
// }
// }


//login api
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Todo.findOne({ email });

    if (user && user.password === password) {
      const token = jwt.sign({ userId: user.id }, '8B196C12D3949FDB7BE7029DE4F16FAE', {
        expiresIn: '1h',
      });
      res.status(200).json({ token, user });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//getting data from database
const getAllData = async (req, res)=>
{
try {
    const getTodos = await Todo.find({})
    res.json(getTodos)
  } catch(err){
  res.status(500).json({error: err.message})
}
}

//getting data from database using params
const getSingleData = async (req, res)=>{
  try{
    const getTodo = await Todo.findById(req.params.id);
      res.json(getTodo)
  } catch(error){
    res.status(500).json({error: error.message});
  }
}

//getting data from database using query
const getSingleDataWithQuery = async (req, res)=>{
  try{
    const getTodo = await Todo.findOne({_id: req.query.id});
      res.json(getTodo)
  } catch(error){
    res.status(500).json({error: error.message});
  }
}

//deleting data from database
const deleteData = async (req, res)=>{
  try {
    const getTodo = await Todo.findByIdAndDelete(req.params.id);
    res.json(getTodo)
  } catch (error) {
    res.status(500).json({error: error.message});
  }
}


//updating data in database
const updateData = async (req, res) => {
  try {
    const getTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {new:true})
    res.status(201).send(getTodo);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
}

module.exports = {
  createdata, 
  loginUser,
  getAllData, 
  getSingleData, 
  getSingleDataWithQuery, 
  deleteData,
  updateData
}