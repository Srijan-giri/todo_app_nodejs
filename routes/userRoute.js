const express = require('express');
const userRouter = express.Router();
const { isAuthenticated } = require('../middleware/authMiddleware');

const { showSignUp,
    showSignIn,
    signUpController,
    signInController,
    homeController, logOutController } = require('../controllers/userController.js');

userRouter.get('/', showSignIn);
userRouter.get('/signup', showSignUp);


userRouter.post('/signup', signUpController);
userRouter.post('/signin', signInController);

userRouter.get('/home', isAuthenticated, homeController);
userRouter.post('/logout', isAuthenticated, logOutController);

module.exports = userRouter;