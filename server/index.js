const express = require("express")
const { default: mongoose } = require("mongoose")
const Todo = require("./model/todoSchema")
require('dotenv').config()
const app = express()

app.use(express.json())

// database conntection
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("db connected");
  }).catch((err) => {
    console.log(err.message || err);

  })

// create task api
app.post("/addtodo", async (req, res) => {
  let { FirstName, LastName, Age, Task } = req.body

  let todo = new Todo({
    FirstName,
    LastName,
    Age,
    Task,
  })
  await todo.save()

  return res
    .status(201)
    .json({
      success: true,
      message: "todo created successfull",
      data: todo
    })
})

// get all task api
app.get("/getalltodo", async (req, res) => {
  try {
    let alltodo = await Todo.find({})
    return res
      .status(200)
      .json({
        success: true,
        message: "todo fetch successfull",
        data: alltodo,
      })
  } catch (err) {
    return res
      .status(500)
      .json({
        success: false,
        message: err.message || err
      })
  }
})

// single task api
app.get("/gettask/:id", async (req, res) => {
  try {
    let { id } = req.params
    let singletask = await Todo.findOne({ id })
    return res
      .status(200)
      .json({
        success: true,
        message: "single task fetch successfull",
        data: singletask,
      })
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: err.message || err
      })
  }
})

// update api
app.patch("/edittask/:id", async (req, res) => {
  try {
    let { id } = req.params
    let { Task } = req.body
    let edittask = await Todo
      .findOneAndUpdate(
        { _id: id },
        { Task },
        { new: true })
    return res
      .status(200)
      .json({
        success: true,
        message: "updated",
        data: edittask
      })
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: err.message || err
      })
  }
})

// delete api
app.delete("/deletetask/:id", async (req, res) => {
  try {
    let { id } = req.params
    let deletetask = await Todo.findOneAndDelete({ _id: id })
    return res
      .status(200)
      .json({
        success: true,
        message: "task deleted",
        data: deletetask,
      })
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: err.message || err
      })
  }
})


app.listen(process.env.PORT, () => {
  console.log(`server in running port number ${process.env.PORT}`);
})