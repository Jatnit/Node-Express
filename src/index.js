const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const route = require('./routes/index');
const db = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');
const authRoute = require('./routes/auth');

const app = express();
const port = 3000;

// Kết nối database
db.connection();

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// HTTP logger
app.use(morgan('combined'));

// Template engine
app.engine('hbs', handlebars.engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Auth routes
app.use('/api/auth', authRoute);

// Routes
route(app);

// Error handler
app.use(errorHandler);

// Start server
app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
});
