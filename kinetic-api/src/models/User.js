import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },

    surname: {
        type: String,
        required: true,
    },

    birthDate: {
        type: Date,
        required: true,
    },

    gender: {
        type: String,
        required: true,
    },

    emailVerified: {
        type: Boolean,
        default: false
    },

    avatar: {
        type: String,
        default: 'default-avatar.png'
    },

    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ['ROLE_USER', 'ROLE_ADMIN'],
        default: 'ROLE_USER'
    },

    likedMovies: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Movie'
        }],
        default: []
    },

    savedMovies: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Movie'
        }],
        default: []
    },

    createdAt: {
        type: Date,
        default: Date.now
    },
})

const User = mongoose.model('User', userSchema);

export default User;