const Task = require('../models/Task')
const asyncWrapper = require('../middlewares/async')
const {createCustomError}  = require('../errors/custom-error')

const getTasks = asyncWrapper(async (req, res) => {
        const tasks = await Task.find({})
        res.status(200).json(tasks)
  
})

const addTask = asyncWrapper(async (req, res) => {
        const task = await Task.create(req.body)
        return res.status(201).json({task})
}
)

const getTask = asyncWrapper(async (req, res) => {
        const task = await Task.findOne({_id: req.params.id})
        if(!task){
            return next(createCustomError(`No task with id: ${req.params.id}`, 404))
        }
        res.status(200).json(task)
})

const  updateTask= asyncWrapper(async (req, res, next) => {
        const {id: taskId} = req.params
        const task = await Task.findOneAndUpdate({_id: taskId}, req.body, {new: true, runValidators: true})
        if(!task){
            return next(createCustomError(`No task with id: ${req.params.id}`, 404))
        }
        res.status(200).json({task})
})

const deleteTask = asyncWrapper(async (req, res) => {
        const {id: taskId} = req.params
        const task = await Task.findOneAndDelete({_id: taskId})
        if(!task){
            return next(createCustomError(`No task with id: ${req.params.id}`, 404))
        }
        res.status(200).json({task})
})

module.exports = {
    getTasks, getTask, addTask, updateTask, deleteTask
}