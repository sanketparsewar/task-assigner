const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    noOfRolls: {
        type: Number,
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ['Paid', 'Unpaid', 'Partial'],
        required: true,
    },
    areaSize: {
        type: String,
        required: true,
    },
    roomType: {
        type: String,
        required: true,
    },
    remainingPayment: {
        type: Number,
    },
    completedDate: {
        type: Date,
    },
    completed: {
        type: Boolean,
        default:false,
    },
});

module.exports = mongoose.model('Task', TaskSchema);