const express = require('express')
const app = express()
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
require('dotenv').config()
const notFound = require('./middlewares/not-found')
const errorhandlerMiddleware = require('./middlewares/error-handler')

const port  = process.env.PORT || 5000

// Routes needed
// GET: api/v1/tasks
// POST: api/v1/tasks
// GET: api/v1/task/:id
// PUT: api/v1/task/:id
// DELETE: api/v1/task/:id

const start = async () =>{
    try {
        await connectDB(process.env.MONGO_URI) 
        app.listen(port, ()=>{console.log(`Server running on port: ${port}`)})
    } catch (error) {
        console.log(error)
    }
}

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use('/api/v1/tasks', tasks)

app.use(notFound)
app.use(errorhandlerMiddleware)


start()

