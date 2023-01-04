const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    todo : {
        type : String,
        required : [true, "Todo name is required"]
    },
    tasks : {
        type : [String],
        required : [true, "task is required"]
    },
    star : {
        type : Boolean,
        default : false
    },
    completed : {
        type : Boolean,
        default : false
    }
},
{
    timestamps: true
})

module.exports = mongoose.model("todo", todoSchema)