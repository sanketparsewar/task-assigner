const express = require('express')
const { createTask, getTasks, getTaskById, deleteTask } = require('../controllers/task.controller')
const router = express.Router()

router.post('/', createTask)
router.get('/', getTasks)
router.get('/:id',getTaskById)
router.delete('/:id',deleteTask)

module.exports = router