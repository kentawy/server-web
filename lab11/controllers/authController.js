const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const AppError = require('../utils/AppError'); 

const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

exports.register = async (req, res, next) => { 
    try {
        const { name, email, password, confirmPassword, role } = req.body;

        if (!name || !email || !password || !confirmPassword) {
            return next(new AppError('Будь ласка, заповніть усі поля', 400));
        }

        if (password !== confirmPassword) {
            return next(new AppError('Паролі не збігаються', 400));
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(new AppError('Користувач з таким email вже зареєстрований', 400));
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || 'user'
        });

        res.status(201).json({
            success: true,
            message: 'Реєстрація пройшла успішно',
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => { // Додали next
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new AppError('Введіть email та пароль', 400));
        }

        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return next(new AppError('Невірний email або пароль', 401));
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return next(new AppError('Невірний email або пароль', 401));
        }

        const token = generateToken(user._id, user.role);

        res.status(200).json({
            success: true,
            token,
            user: { id: user._id, name: user.name, email: user.email, role: user.role }
        });
    } catch (err) {
        next(err);
    }
};

exports.getMe = async (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            user: req.user
        });
    } catch (err) {
        next(err);
    }
};