const Customer = require('../models/customer.model');

// Controller to handle customer-related operations
exports.createCustomer = async (req, res) => {
    try {
        const { name, phone, address } = req.body;

        // Validate request body
        if (!name || !phone || !address) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const customer = new Customer({ name, phone, address });
        await customer.save();

        res.status(201).json({ message: 'Customer created successfully.', customer });
    } catch (error) {
        res.status(500).json({ message: 'Error creating customer.', error: error.message });
    }
},

    // Get all customers
    exports.getAllCustomers = async (req, res) => {
        try {
            const customers = await Customer.find().sort({ name: 1 });
            res.status(200).json(customers);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching customers.', error: error.message });
        }
    },

    // Get a customer by ID
    exports.getCustomerById = async (req, res) => {
        try {
            const { id } = req.params;
            const customer = await Customer.findById(id);

            if (!customer) {
                return res.status(404).json({ message: 'Customer not found.' });
            }

            res.status(200).json(customer);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching customer.', error: error.message });
        }
    },

    // Update a customer by ID
    exports.updateCustomer = async (req, res) => {
        try {
            const { id } = req.params;
            const { name, phone, address } = req.body;

            const customer = await Customer.findByIdAndUpdate(
                id,
                { name, phone, address },
                { new: true, runValidators: true }
            );

            if (!customer) {
                return res.status(404).json({ message: 'Customer not found.' });
            }

            res.status(200).json({ message: 'Customer updated successfully.', customer });
        } catch (error) {
            res.status(500).json({ message: 'Error updating customer.', error: error.message });
        }
    },

    // Delete a customer by ID
    exports.deleteCustomer = async (req, res) => {
        try {
            const { id } = req.params;
            const customer = await Customer.findByIdAndDelete(id);

            if (!customer) {
                return res.status(404).json({ message: 'Customer not found.' });
            }

            res.status(200).json({ message: 'Customer deleted successfully.' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting customer.', error: error.message });
        }
    }
