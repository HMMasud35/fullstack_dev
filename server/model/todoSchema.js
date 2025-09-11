const { default: mongoose } = require("mongoose");
const { Schema } = mongoose
let todoSchema = new Schema({
  FirstName: {
    type: String,
  },
  LastName: {
    type: String,
    required: true,
  },
  Age: {
    type: Number,
  },
  Task: {
    type: String,
  }

})


module.exports = mongoose.model("TodoList", todoSchema)