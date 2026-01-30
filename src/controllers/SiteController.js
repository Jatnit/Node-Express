const Course = require('../models/Course');

class SiteController {
    // GET /courses - Lấy tất cả courses
    async index(req, res) {
        try {
            const courses = await Course.findAll();
            res.json(courses);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // GET / hoặc /home - Trang chủ
    home(req, res) {
        res.render('home');
    }

    // GET /search - Trang tìm kiếm
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
