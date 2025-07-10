const Todo = require("../modules/todoModel");

exports.createTodo = async (req, res) => {
  try {
    const userId = req.user._id;
    const { taskname } = req.body;

    if (!taskname || taskname.trim() === "") {
      return res.status(400).json({ message: "Please add a valid task name." });
    }
    const trimmedTask = taskname.trim();

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
    const updateData = {
      ...req.body,
      status: true,
    };
    const todo = await Todo.findOneAndUpdate(
      { userId: req.user._id },
      updateData,
      { new: true }
    );

    if (!todo) {
      return res
        .status(404)
        .json({ message: "Todo not found or unauthorized." });
    }

    return res.status(200).json({
      success: true,
      message: "Todo updated successfully",
      todo,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.readTodo = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user._id });
    res.status(200).json({
      success: true,
      todos,
      message: "Fetched todos successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching todos",
      error: error.message,
    });
  }
};
exports.singleTodo = async (req, res) => {
  try {
    const todo = await Todo.findOne({
      userId: req.user._id,
    });
    console.log("todo", todo);
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
    res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
      todo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting todo",
      error: error.message,
    });
  }
};
