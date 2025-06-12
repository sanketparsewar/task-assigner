const Customer = require('../models/customer.model')
const Task = require('../models/task.model')
const User=require('../models/user.model')
exports.getDashboard = async (req, res) => {
    try {
        const customers = await Customer.find({})
        const workers = await User.find({role:'worker'})
        const tasks = await Task.find({}).populate('customer')
        const totalTasks = await Task.countDocuments();
        const totalCustomers = await Customer.countDocuments();
        const totalWorkers = await User.countDocuments({role:'worker'});
        const completedTasks = await Task.countDocuments({ completed: true });
        const pendingTasks = await Task.countDocuments({ completed: false });
        res.status(200).json({ customers, totalCustomers, tasks, totalTasks, pendingTasks, completedTasks,totalWorkers,workers })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}