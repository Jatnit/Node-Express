class NewsController {
  //GET /news

  show(req, res) {
    res.render('news');
  }

  index(req, res) {
    res.render('news');
  }
}

module.exports = new NewsController();
