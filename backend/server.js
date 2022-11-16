require('dotenv').config()

const express = require('express')
const mongoose = require("mongoose")

const taskRoutes = require("./routes/task")

//Express app
const app = express()

//Middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//Routes
app.use("/api/tasks", taskRoutes)

//Connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //Listen for requests
        app.listen(4000, () => {
            console.log('Connected to DB & listening on port', 4000)
        })
    })
    .catch((error) => console.log(error))

