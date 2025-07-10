 const Todo = require ('../modules/todoModel');
const { singleTodo } = require('./Todo');


  exports.createTodoForuser =async (req, res) => {
    try {
        const {taskname, userId}  = req.body;

         if (!taskname ||  !userId) {
            return res.status(400).json({message : "taskname and userId are required"});
         }
         const newTodo = await Todo.create({
            taskname,
            userId
         });
         res.status(201).json({message :"todo created", todo : newTodo});
    }
    catch (error) {
        res.status(404).json({ message : error.message})
    }
  };

   exports.getallTodos = async(req,res) => {
    try {
        const todos = await Todo.find({userId}).populate("userId","username email");
         if(!todos) {
            return res.status(404).json({ message : "No Todo found"});
         }
          return res.status(200).json({ success : true,message : "Todo fetched",todos: todos});
    }
    catch (error) {
        return res.status(500).json({ success : false,message : "Failed to fetch Todo", error : error.message});
    }
   };
    exports.getSignleTodos = async(req, res) => {
        try {
            const sigleTodo = await Todo.findById(req.params.id).populate("userId", "username email");

             if(!sigleTodo) {
                 return res.status(404).json({ success : false, message : "Todo not found"});
             }
              return res.status(201).json({success : true, message : "Todo fetched", todo : sigleTodo});
        }
        catch (error) {
             return res.status(404).json({success : false, message : "Todo not found", error : error.message})
        }
    }

    exports.updateTodoById = async(req, res) => {
        try {
            const updateTodo = await Todo.findByIdAndUpdate(req.params.id, req.body,{new: true});

             if (!updateTodo) {
                 return res.status(404).json({message : "Todo not found"});
             }
             return res.status(200).json({message : "Todo updated", todo: updateTodo});
        }
        catch (error) {
             return res.status(404).json({message  : "Error updating Todo", error : error.message});
        }
    };

     exports.DeleteTodoById = async(req, res) => {
         try {
            const deleteTodo = await Todo.findByIdAndDelete(req.params.id);

             if(!deleteTodo) {
                 return res.status(404).json({message : "Todo not found"});
             }
              return res.status(200).json({message : "Todo deleted successfully",todo : deleteTodo });
         }
         catch (error) {
             return res.status(404).json({message : "Error deleting Todo", error : error.message});
         }
     };
