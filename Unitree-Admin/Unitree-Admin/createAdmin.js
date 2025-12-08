const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admin = require('./models/admin');
require('dotenv').config();

const createAdmin = async () => {
    try {
        // Connect to MongoDB
        const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/unitree-admin';
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const username = 'prathamesh';
        const email = 'prathameshkate7717@gmail.com';
        const password = 'test123';

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            console.log('Admin already exists with this email.');
            return;
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create the admin
        const admin = new Admin({
            username,
            email,
            password: hashedPassword,
        });

        await admin.save();
        console.log('Admin created successfully:', { username, email });

    } catch (error) {
        console.error('Error creating admin:', error);
    } finally {
        mongoose.connection.close();
    }
};

createAdmin();
