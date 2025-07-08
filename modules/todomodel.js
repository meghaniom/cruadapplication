const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  taskname: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
module.exports = mongoose.model("Todo", todoSchema);
