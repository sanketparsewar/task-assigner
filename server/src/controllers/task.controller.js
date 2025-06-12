const Task = require('../models/task.model');
const mongoose=require('mongoose')
// Create a new task
exports.createTask = async (req, res) => {
    try {
        const {
            title,
            description,
            dueDate,
            assignedTo,
            customer,
            noOfRolls,
            paymentStatus,
            areaSize,
            roomType,
            remainingPayment,
            completedDate,
            completed
        } = req.body;

        if (!title || !description || !dueDate || !customer || !noOfRolls || !paymentStatus || !areaSize || !roomType) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        if (!['Paid', 'Unpaid', 'Partial'].includes(paymentStatus)) {
            return res.status(400).json({ error: 'Invalid payment status' });
        }

        
        // Prepare task data
        const taskData = {
            title,
            description,
            dueDate,
            customer,
            noOfRolls,
            paymentStatus,
            areaSize,
            roomType,
            remainingPayment,
            completedDate,
            completed
        };

        // Validate and assign optional assignedTo
        if (assignedTo && assignedTo !== '' && mongoose.Types.ObjectId.isValid(assignedTo)) {
            taskData.assignedTo = assignedTo;
        }

        // Create and save task
        const task = new Task(taskData);
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// exports.getTasks = async (req, res) => {
//     try {
//         const {
//             sortOrder = 'desc',
//             searchQuery,
//             filterCondition = 'all'
//         } = req.query;

//         const query = {};

//         // 🔍 Handle search
//         if (searchQuery) {
//             const lowerCaseSearchQuery = searchQuery.toLowerCase();
//             query.$or = [
//                 { title: { $regex: lowerCaseSearchQuery, $options: 'i' } },
//                 { 'assignedTo.name': { $regex: lowerCaseSearchQuery, $options: 'i' } },
//                 { 'customer.name': { $regex: lowerCaseSearchQuery, $options: 'i' } }
//             ];
//         }

//         // ✅ Handle filterCondition for 'completed'
//         if (filterCondition && filterCondition !== 'all') {
//             if (filterCondition === 'completed') {
//                 query.completed = true;
//             } else if (filterCondition === 'pending') {
//                 query.completed = false;
//             }
//         }

//         // ↕️ Sort by dueDate
//         const sortOption = { dueDate: sortOrder === 'desc' ? -1 : 1 };

//         // 🔁 Fetch and return
//         const tasks = await Task.find(query).populate('assignedTo', '-password -__v').populate('customer', '-__v').sort(sortOption);
//         res.status(200).json(tasks);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };
exports.getTasks = async (req, res) => {
    try {
        const {
            sortOrder = 'desc',
            searchQuery,
            filterCondition = 'all'
        } = req.query;

        const mongoQuery = {};

        // Filter by completion status
        if (filterCondition !== 'all') {
            mongoQuery.completed = filterCondition === 'completed';
        }

        const sortOption = { dueDate: sortOrder === 'desc' ? -1 : 1 };

        // Get all tasks (filtered by completed status)
        let tasks = await Task.find(mongoQuery)
            .populate('assignedTo', '-password -__v')
            .populate('customer', '-__v')
            .sort(sortOption);

        // If searchQuery is provided, apply in-memory filtering
        if (searchQuery) {
            const lower = searchQuery.toLowerCase();
            tasks = tasks.filter(task =>
                task.title.toLowerCase().includes(lower) ||
                (task.assignedTo?.name?.toLowerCase().includes(lower)) ||
                (task.customer?.name?.toLowerCase().includes(lower))
            );
        }

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




// Get a single task by ID
exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate('assignedTo', '-password -__v').populate('customer', '-__v');
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a task by ID
exports.updateTask = async (req, res) => {
    try {
        const { paymentStatus, remainingPayment } = req.body;

        // Validate paymentStatus and remainingPayment
        if (paymentStatus === 'Paid') {
            req.body.remainingPayment = 0;
        } else if (['Partial', 'Unpaid'].includes(paymentStatus)) {
            if (remainingPayment === undefined || remainingPayment === null || remainingPayment === '') {
                return res.status(400).json({ error: 'Remaining payment must be provided for Partial or Unpaid status' });
            }
        } else {
            return res.status(400).json({ error: 'Invalid payment status' });
        }

        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('assignedTo', '-password -__v').populate('customer', '-__v');
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a task by ID
exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};