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
    const user = await User.findById(userid)
    const todoList = []
    for (item of user.todos) {
        let t = await Todo.findById(item)
        todoList.push(t)
    }
    res.status(200).json({
        success: true,
        message: "Todo updated successfully",
        todoList
    })
}

exports.deleteTodo = async(req, res) => {
    const {id, userid } = req.params
    const user = await User.findById(userid)
    user.todos = user.todos.filter( todo => todo !=id )
    await user.save()
    await Todo.findByIdAndDelete(id)

    const todoList = []
    for (item of user.todos) {
        let t = await Todo.findById(item)
        todoList.push(t)
    }

    res.status(200).json({
        success: true,
        message: "Collection deleted successfully",
        todoList
    })

}

