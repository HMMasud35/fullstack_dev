const express = require("express")
const { default: mongoose } = require("mongoose")
require('dotenv').config()
const app = express()

// database conntection
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("db connected");
  }).catch((err) => {
    console.log(err.message || err);

  })

  // route define
  app.post("/addtodo", (req, res) => {
    return res.status(201).json({ success: true, message: "todo created successfull"})
  })

  // get todo
  app.get("/gettodo", (req, res) => {
    return res
    .status(200)
    .json({ success: true, message: "todo fetch successfull"})
  })


app.listen(process.env.PORT, () => {
  console.log(`server in running port number ${process.env.PORT}`);
})