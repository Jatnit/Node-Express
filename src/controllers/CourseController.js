const Course = require('../models/Course');

class CourseController {
    // [GET] /courses - Lấy tất cả courses
    async index(req, res, next) {
        try {
            const courses = await Course.findAll();
            res.status(200).json({
                success: true,
                message: 'Courses retrieved successfully',
                data: courses
            });
        } catch (error) {
            next(error);
        }
    }

    // [GET] /courses/:id - Lấy 1 course
    async show(req, res, next) {
        try {
            const course = await Course.findByPk(req.params.id);
            
            if (!course) {
                return res.status(404).json({
                    success: false,
                    message: 'Course not found'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Course retrieved successfully',
                data: course
            });
        } catch (error) {
            next(error);
        }
    }

    // [POST] /courses - Tạo course mới
    async store(req, res, next) {
        try {
            // Gán userId từ user đang đăng nhập
            const course = await Course.create({
                ...req.body,
                userId: req.user.id
            });

            res.status(201).json({
                success: true,
                message: 'Course created successfully',
                data: course
            });
        } catch (error) {
            next(error);
        }
    }

    // [PUT] /courses/:id - Cập nhật course
    async update(req, res, next) {
        try {
            // 1. Tìm course
            const course = await Course.findByPk(req.params.id);
            
            // 2. Kiểm tra tồn tại
            if (!course) {
                return res.status(404).json({
                    success: false,
                    message: 'Course not found'
                });
            }

            // 3. Kiểm tra quyền (chủ sở hữu hoặc admin)
            if (course.userId !== req.user.id && req.user.role !== 'admin') {
                return res.status(403).json({
                    success: false,
                    message: 'You can only update your own courses'
                });
            }

            // 4. Cập nhật
            await course.update(req.body);

            res.status(200).json({
                success: true,
                message: 'Course updated successfully',
                data: course
            });
        } catch (error) {
            next(error);
        }
    }

    // [DELETE] /courses/:id - Xóa course
    async destroy(req, res, next) {
        try {
            // 1. Tìm course
            const course = await Course.findByPk(req.params.id);
            
            // 2. Kiểm tra tồn tại
            if (!course) {
                return res.status(404).json({
                    success: false,
                    message: 'Course not found'
                });
            }

            // 3. Kiểm tra quyền (chủ sở hữu hoặc admin)
            if (course.userId !== req.user.id && req.user.role !== 'admin') {
                return res.status(403).json({
                    success: false,
                    message: 'You can only delete your own courses'
                });
            }

            // 4. Xóa
            await course.destroy();

            res.status(200).json({
                success: true,
                message: 'Course deleted successfully'
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new CourseController();