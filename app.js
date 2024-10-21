const express = require('express');
const bodyParser = require('body-parser');
const todosRouter = require('./routes/todoRoutes')
const userRouter = require('./routes/userRoute');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();

app.use(session({
    secret: 'mySecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    }
}));

app.use(express.json()); // for JSON requests
app.use(express.urlencoded({ extended: true })); // for form data
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use('/', userRouter);
app.use('/todos', todosRouter);


console.log(bodyParser.json());
console.log(express.json());

module.exports = app;