const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Ім’я є обов’язковим'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email є обов’язковим'],
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Невалідний формат email']
    },
    password: {
        type: String,
        required: [true, 'Пароль є обов’язковим'],
        minlength: [8, 'Пароль має містити мінімум 8 символів'],
        select: false  
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);