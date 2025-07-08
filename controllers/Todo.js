const Todo = require("../modules/todomodel");

exports.createTodo = async (req, res) => {
  const { taskname } = req.body;
  const userId = req.user._id;

  if (!taskname || taskname.trim() === "") {
    return res.status(400).json({ message: "Please add a valid task name." });
  }

  try {
    const trimmedTask = taskname.trim();

    const existingTask = await Todo.findOne({ taskname: trimmedTask, userId });
    if (existingTask) {
      return res.status(409).json({ message: "Task already exists." });
    }

    const newTask = new Todo({ taskname: trimmedTask, userId });
    await newTask.save();

    return res
      .status(201)
      .json({ message: "Task added successfully.", todo: newTask });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndUpdate({
      userId : req.user._id,
      new : true
    })

  

    if (!todo) {
      return res
        .status(404)
        .json({ message: "Todo not found or unauthorized." });
    }

    return res.status(200).json({ message: "Todo updated successfully", todo });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.readTodo = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user._id });
    res.status(200).json({ message: "Fetched todos", todos });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching todos", error: error.message });
  }
};

exports.singleTodo = async (req, res) => {
  try {
    const todo = await Todo.findOne({
      userId: req.user._id,
    });

    if (!todo) {
      return res
        .status(404)
        .json({ message: "Todo not found or unauthorized." });
    }

    res.status(200).json({ message: "Single todo fetched", todo });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching todo", error: error.message });
  }
};


exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      userId: req.user._id,
    });
    if (!todo) {
      return res
        .status(404)
        .json({ message: "Todo not found or unauthorized." });
    }
    res.status(200).json({ message: "Todo deleted successfully", todo });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting todo", error: error.message });
  }
};
