const Todo = require("../modules/todomodel");

exports.createTodo = async (req, res) => {
  const { taskname } = req.body;


  const userId = req.user._id;


  if (!taskname || taskname.trim() === "") {
    return res.status(400).json({ message: "Please add a valid task name." });
  }

  try {
    const trimmedTask = taskname.trim();




    const existingTask = await Todo.findOne({
      taskname: trimmedTask,
      userId: userId,
    });
    if (existingTask) {
      return res.status(409).json({ message: "Task already exists." });
    }

    const newTask = new Todo({ taskname: trimmedTask, userId: userId });
    await newTask.save();

    return res
      .status(201)
      .json({ message: "Task added successfully.", todo: trimmedTask });

  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
exports.updateTodo = async (req, res) => {
  try {

    

  
    const todo = await Todo.findOneAndDelete({
      userId: req.user._id,

      new: true,
    });
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    return res.status(200).json({ message: "Todo updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

 
exports.readTodo = async(req, res) => {
    try {
        const readTodo =  await Todo.find();
        res.status(200).json({message : "readTodo", readTodo});
    }
    catch (error){
        res.status(500).json({message : "Todo not found", error :  error.message})
    }
};
 exports.singleTodo  = async(req, res) => {
    try {
        const singleTodo = await Todo.findById(req.params.id);
        res.status(200).json({message : "SigleTodo", singleTodo});
    }
    catch(error){
        res.status(500).json({message : "Todo not found", error : error.message});
    }
 };
  
 exports.deleteTodo = async(req, res) => {
    try {
        const deleteTodo = await Todo.findByIdAndDelete(req.params.id);
        res.status(200).json({message : "Todo deleted successfully"});
    }
    catch (error) {
        res.status(500).json({message : "Todo not found", error : error.message});
    }
 };


exports.readTodo = async (req, res) => {
  try {
    const readTodo = await Todo.find({ userId: req.user._id });
    res.status(200).json({ message: "readTodo", readTodo });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching todos", error: error.message });
  }
};
exports.singleTodo = async (req, res) => {
  try {
    const singleTodo = await Todo.findById({
      // _id: req.parms.id,
      userId: req.user._id,
    });
    res.status(200).json({ message: "SigleTodo", singleTodo });
  } catch (error) {
    res.status(500).json({ message: "Todo not found", error: error.message });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const deleteTodo = await Todo.findByIdAndDelete({ userId: req.user._id });
    res.status(200).json({ message: "Todo deleted successfully",deleteTodo  });
  } catch (error) {
    res.status(500).json({ message: "Todo not found", error: error.message });
  }
};

