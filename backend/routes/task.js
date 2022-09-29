const express = require("express")
const { 
    createTask,
    getAllTasks,
    getTask,
    deleteTask,
    deleteAllTasks,
    updateTask
} = require("../controllers/taskController")

const router = express.Router()

//Get all tasks
router.get("/", getAllTasks)

//Get a single task
router.get("/:id", getTask)

//POST a new task
router.post("/", createTask)

//DELETE a task
router.delete("/:id", deleteTask)

//DELETE all the tasks
router.delete("/", deleteAllTasks)

//UPDATE a task
router.patch("/:id", updateTask)

module.exports = router