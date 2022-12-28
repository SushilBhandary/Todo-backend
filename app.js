import express from 'express'
import cookieParser from 'cookie-parser'
import {
    addTodo,
    updateTodo,
    deleteTodo
} from "./controllers/todo.controller"
import {
    signUp,
    login,
    logout,
    getAllTodo
} from "./controllers/auth.controller"


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.get("/", (req, res) => {
    res.send("Hello auth system")
})

app.post("/login", login)
app.post("/signup", signUp)
app.post("/logout", logout)
app.get("/getalltodos:userid", getAllTodo)
app.post("/createtodo:userid", addTodo)
app.delete("/delete-todo", deleteTodo)
app.put("/edit-todo:id:userid", updateTodo)

export default app