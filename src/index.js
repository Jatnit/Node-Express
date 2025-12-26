const path = require('path')
const express = require('express')
var morgan = require('morgan') 
const app = express()
const handlebars = require('express-handlebars');

app.use(express.static(path.join(__dirname, 'public')));
//HTTP logger
const port = 3000
app.use(morgan('combined'))

//tamplate engine
app.engine('hbs', handlebars.engine({extname: '.hbs'}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.get('/', (req, res) => {
  res.render("home")
})
app.get('/about', (req, res) => {
  res.render("about")
})
app.post('/search', (req, res) => {
  console.log(req.body);
  res.render("search")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})  
