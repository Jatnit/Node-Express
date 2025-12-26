const newsRoute = require('./news');
const sideRoute = require('./side');
function route(app){
    app.get('/', (req, res) => {
    res.render("home")
    })

    app.use('/news', newsRoute);
    app.use('/', sideRoute);

}

module.exports = route