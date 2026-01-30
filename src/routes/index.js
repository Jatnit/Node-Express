const newsRoute = require('./news');
const siteRoute = require('./site');
const courseRoute = require('./course');

function route(app) {
    app.get('/', (req, res) => {
        res.render('home');
    });

    app.use('/courses', courseRoute);
    app.use('/news', newsRoute);
    app.use('/', siteRoute);
}

module.exports = route;
