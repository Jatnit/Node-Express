class NewsController {
    // GET /news - Danh sách tin tức
    index(req, res) {
        res.render('news');
    }

    // GET /news/:slug - Chi tiết tin tức
    show(req, res) {
        res.render('news');
    }
}

module.exports = new NewsController();
