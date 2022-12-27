import Todo from "../models/todo.schema";
import user from "../models/user.scheme";


const addTodo = async(req, res) => {
    const {userid} = req.param
    const {todoName, tasks} = req.body

    const todo = await Todo.create({
        todoName,
        tasks
    })
    const user = await User.findById(id)
    user.todos.push(todo)
    await user.save()
    res.status(200).json({
        success: true,
        message: "Collection created with success",
        todo
    })
}

const updateTodo = async(req, res) => {
    const {id} = req.param
    const {todoName, tasks} = req.body

    const updatedTodo = await Todo.findByIdAndUpdate(id, {todo:todoName, tasks}, {new: true})

    if (!updatedTodo) {
        res.status(401).send('Todo not found')
    }

    res.status(200).json({
        success: true,
        message: "Todo updated successfully",
        updatedTodo
    })
}

const deleteTodo = async(req, res) => {
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

