const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/todoRoutes')
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);
app.set('view engine', 'ejs');
app.use(express.json());


module.exports = app;