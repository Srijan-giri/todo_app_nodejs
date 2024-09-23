const express = require('express');
const app = require('./app');
const db = require('./models/index')

const port = process.env.DB_PORT || 3000;

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });

db.sequelize.sync().then(() => {
    console.log('Database Synced');
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
}).catch((err) => {
    console.log('Error    syncing database:', err);
});
