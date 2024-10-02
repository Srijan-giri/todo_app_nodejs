const { User } = require('../models');

const createUser = async (userData) => {
    try {
        console.log("User Data:", userData); // Log the incoming userData for debugging

        // Attempt to create the user
        const user = await User.create(userData);

        // Check if the user was successfully created
        if (!user) {
            throw new Error('User creation failed'); // Custom error if user creation returns null
        }

        return user;
    } catch (err) {
        console.error('Error creating user:', err); // Log the actual error for debugging
        throw new Error('User is not created due to an error');
    }
};

module.exports = { createUser };
