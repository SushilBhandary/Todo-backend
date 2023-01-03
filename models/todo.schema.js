const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    todo : {
        type : String,
        required : [true, "Todo name is required"]
    },
    tasks : {
        type : [String],
        required : [true, "task is required"]
    }
},
{
    timestamps: true
})

module.exports = mongoose.model("todo", todoSchema)