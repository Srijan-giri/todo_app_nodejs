const { createUser } = require('../services/userService');
const { User } = require('../models');
const bcrypt = require('bcrypt');

const showSignUp = async (req, res) => {
    res.render('signup');
}

const showSignIn = async (req, res) => {
    res.render('signin');
}

const signUpController = async (req, res) => {
    try {
        console.log(req.body);
        if (!req.body.first_name || !req.body.last_name) {
            return res.status(400).json({ message: 'First name and last name are required' });
        }
        if (!req.body.password) {
            return res.status(400).json({ message: 'Password is required' });
        }

        // Hash the password using bcrypt
        const hashpassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashpassword;

        const user = await createUser(req.body);
        console.log(user);
        res.redirect('/');
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
}


const signInController = async (req, res) => {
    try {

        console.log(req.body);

        if (!req.body.email || !req.body.password) {
            return res.status(400).json({ message: 'email and password is required' });
        }
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        console.log(user);

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        req.session.user = user;
        res.redirect('/todos/todoHome');
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Internal server error' });
    }
}

const homeController = async (req, res) => {
    try {
        if (!req.session.user) {
            res.redirect('/login');
            return res.json(501).json({ message: 'Unauthorized Access' });
        }

        const user = req.session.user;
        console.log(user);
        res.render('home', { user });
    }
    catch (err) {
        throw new Error(err);
    }
}

const logOutController = async (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                console.log('Error destroying session:', err);
                return res.status(500).json({ message: 'Failed to log out' });
            }

            // Redirect to login page after session is destroyed
            res.redirect('/');
        });
    }
    catch (err) {
        throw new Error(err);
    }
}


module.exports = {
    showSignUp,
    showSignIn,
    signUpController,
    signInController,
    homeController, logOutController
}