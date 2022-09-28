
const Task = require("../models/taskModel")
const mongoose = require("mongoose")

//Get all the tasks
const getAllTasks = async(req, res) => {
    const tasks = await Task.find({}).sort({createdAt: -1})

    res.status(200).json(tasks)
}

//Get a single task
const getTask = async(req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({error: "No such task"})

    const task = await Task.findById(id)

    if(!task) {
        return res.status(400).json({error: "No such task"})
    }

    res.status(200).json(task)
}

//Post a new task
const createTask = async (req, res) => {
    const {title, desc} = req.body

    //Adding the task to DB
    try {
        const task = await Task.create({title, desc})
        res.status(200).json(task)
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

//Delete a task
const deleteTask = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({error: "No such task"})

    //Deleting task on DB    
    const task = await Task.findOneAndDelete({_id: id})

    if(!task)
        return res.status(400).json({error: "No such task"})

    res.status(200).json(task)
}

//Update a task
const updateTask = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({error: "No such task"})

    //Updating task on DB
    const task = await Task.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!task)
        return res.status(400).json({error: "No such task"})

    res.status(200).json(task)
}

module.exports = {
    createTask,
    getAllTasks,
    getTask,
    deleteTask,
    updateTask
}