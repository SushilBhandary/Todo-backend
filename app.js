const express  = require('express')
const cookieParser = require('cookie-parser')
const {
    addTodo,
    updateTodo,
    deleteTodo,
    getAllTodo
} = require("./controllers/todo.controller")
const {
    signUp,
    login,
    logout
} = require("./controllers/auth.controller")
const cors = require('cors');
const auth = require("./middlewares/auth.middlewares")


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(cors());
app.get("/", (req, res) => {
    res.send("Hello auth system")
})

app.post("/login", login)
app.post("/signup", signUp)
app.post("/logout", logout)
app.get("/getalltodos/:userid", getAllTodo)
app.post("/createtodo/:userid", addTodo)
app.delete("/delete-todo/:id/:userid", deleteTodo)
app.put("/edit-todo/:id/:userid", updateTodo)

module.exports =  app