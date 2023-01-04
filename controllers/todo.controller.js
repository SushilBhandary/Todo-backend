const Todo = require( "../models/todo.schema");
const User = require(  "../models/user.scheme");


exports.addTodo = async(req, res) => {
    const {userid} = req.params
    const {todoName, tasks} = req.body
    const todo = await Todo.create({
        todo : todoName,
        tasks,
        star : false, 
        completed : false
    })
    await todo.save()
    const user = await User.findById(userid)
    user.todos.push(todo._id)
    await user.save()
    res.status(200).json({
        success: true,
        message: "todo created Succesfully",
        todo
    })
}

exports.updateTodo = async(req, res) => {
    const {id, userid} = req.params
    const {todoName, tasks, star, completed} = req.body

    const updatedTodo = await Todo.findByIdAndUpdate(id, { todo:todoName, tasks, star, completed}, {new: true})

    if (!updatedTodo) {
        res.status(401).send('Todo not found')
    }

    res.status(200).json({
        success: true,
        message: "Todo updated successfully",
        updatedTodo
    })
}

exports.deleteTodo = async(req, res) => {
    const {userid, id} = req.param
    const user = await User.findById(userid)

    user.todos.forEach( (td, index) => {
        if (td._id == id) {
            delete user.todos[index]
        }
    });
    
    const todoToDeleted = await Todo.findByIdAndDelete(id)
    if (!todoToDeleted) {
        res.status(401).send('Todo was not found')
    }

    // todoToDeleted.remove()

    res.status(200).json({
        success: true,
        message: "Collection deleted successfully",
        
    })

}

