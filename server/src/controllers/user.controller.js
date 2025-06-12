const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
require('dotenv').config()
const jwt = require('jsonwebtoken');

const getToken = async (user) => {
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.EXPIRES_IN
    });
    return token;
}

const getHashedPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

// REGISTER USER
const registerUser = async (req, res, role = 'worker') => {
    try {
        const { name, email, password, phone } = req.body;

        if (!name || !email || !password || !phone) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await getHashedPassword(password);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            phone,
            role
        });

        await newUser.save();
        return res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.adminRegister = (req, res) => {
    registerUser(req, res, 'admin');
};

exports.workerRegister = (req, res) => {
    registerUser(req, res, 'worker');
};


// LOGIN USER
const loginUser = async (req, res, expectedRole = 'worker') => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        if (user.role !== expectedRole) {
            return res.status(403).json({ message: `Access denied for ${user.role}` });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = await getToken(user);

        res.status(200).json({
            token,
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone,
            },
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.adminLogin = (req, res) => {
    loginUser(req, res, 'admin');
};

exports.workerLogin = (req, res) => {
    loginUser(req, res, 'worker');
};


// GET ALL USERS
exports.getAllAdmins = async (req, res) => {
    try {
        const users = await User.find({ role: 'admin' }).select('-password');
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.
    getAllWorkers = async (req, res) => {
        try {
            const workers = await User.find({ role: 'worker' }).select('-password');
            res.status(200).json(workers);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    };

// GET SINGLE USER
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// UPDATE USER
exports.updateUser = async (req, res) => {
    try {
        const { name, phone, role } = req.body;
        const updated = await User.findByIdAndUpdate(req.params.id, { name, phone, role }, { new: true });
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DELETE USER
exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
