const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Secret key cho JWT (nên để trong .env)
const JWT_SECRET = 'your-secret-key-here';
const JWT_EXPIRES_IN = '7d';

class AuthController {
    // [POST] /auth/register
    async register(req, res, next) {
        try {
            const { name, email, password } = req.body;

            // Kiểm tra email đã tồn tại chưa
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: 'Email already exists'
                });
            }

            // Tạo user mới
            const user = await User.create({ name, email, password });

            // Tạo JWT token
            const token = jwt.sign(
                { id: user.id, email: user.email, role: user.role },
                JWT_SECRET,
                { expiresIn: JWT_EXPIRES_IN }
            );

            res.status(201).json({
                success: true,
                message: 'User registered successfully',
                data: {
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role
                    },
                    token
                }
            });
        } catch (error) {
            next(error);
        }
    }

    // [POST] /auth/login
    async login(req, res, next) {
        try {
            const { email, password } = req.body;

            // Tìm user theo email
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid email or password'
                });
            }

            // So sánh password
            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid email or password'
                });
            }

            // Tạo JWT token
            const token = jwt.sign(
                { id: user.id, email: user.email, role: user.role },
                JWT_SECRET,
                { expiresIn: JWT_EXPIRES_IN }
            );

            res.status(200).json({
                success: true,
                message: 'Login successful',
                data: {
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role
                    },
                    token
                }
            });
        } catch (error) {
            next(error);
        }
    }

    // [GET] /auth/me - Lấy thông tin user hiện tại
    async me(req, res, next) {
        try {
            const user = await User.findByPk(req.user.id, {
                attributes: { exclude: ['password'] }
            });
            
            res.status(200).json({
                success: true,
                data: user
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new AuthController();