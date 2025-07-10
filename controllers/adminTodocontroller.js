const Todo = require("../modules/todoModel");

exports.createTodoForuser = async (req, res) => {
  try {
    const isAdmin = req.user.role === "admin";
    const { taskname, userId: bodyUserId } = req.body;
    if (!taskname) {
      return res.status(400).json({ message: "taskname are required" });
    }
    const userId = isAdmin && bodyUserId ? bodyUserId : req.user.id;

    const newCreateTodo = new Todo({
      taskname,
      userId,
    });
    console.log("newCreateTodo", newCreateTodo);
    await newCreateTodo.save();
    res
      .status(201)
      .json({ message: "Todo are created successfully", todo: newCreateTodo });
  } catch (error) {
    res
      .status(404)
      .json({ message: "Toao are not created", error: error.message });
  }
};

exports.getallTodos = async (req, res) => {
  try {
    const todos = await Todo.find(req.params.id);
    console.log(todos);
    if (!todos) {
      return res.status(404).json({ message: "No Todo found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Todo fetched", todos: todos });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch Todo",
      error: error.message,
    });
  }
};
exports.getSignleTodos = async (req, res) => {
  try {
    // console.log(req.params.id);
    const sigleTodo = await Todo.findOne({
      _id: req.params.id,
    });
    // console.log("sigleTodo", sigleTodo);
    if (!sigleTodo) {
      return res
        .status(404)
        .json({ success: false, message: "Todo not found" });
    }
    return res
      .status(201)
      .json({ success: true, message: "Todo fetched", todo: sigleTodo });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "Todo not found",
      error: error.message,
    });
  }
};
exports.updateTodoById = async (req, res) => {
  try {
    const updateTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updateTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    return res.status(200).json({ message: "Todo updated", todo: updateTodo });
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Error updating Todo", error: error.message });
  }
};
exports.DeleteTodoById = async (req, res) => {
  try {
    const deleteTodo = await Todo.findByIdAndDelete(req.params.id);

    if (!deleteTodo) {
      return res
        .status(404)
        .json({ success: false, message: "Todo not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
      todo: deleteTodo,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "Error deleting Todo",
      error: error.message,
    });
  }
};
