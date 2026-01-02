const path = require('path');
const express = require('express');
var morgan = require('morgan');
const app = express();
const handlebars = require('express-handlebars');
const route = require('./routes/index');

app.use(express.static(path.join(__dirname, 'public')));
//HTTP logger
const port = 3000;
app.use(morgan('combined'));

//tamplate engine
app.engine('hbs', handlebars.engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
