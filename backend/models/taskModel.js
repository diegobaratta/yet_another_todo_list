const mongoose = require("mongoose")

const Schema = mongoose.Schema

const taskSchema = new Schema({
   checked: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        required: true
    }, 
    desc: {
        type: String, 
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model("Task", taskSchema)