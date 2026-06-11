import bcrypt from "bcrypt";

import generateToken from "#utils/generate-token.js";

import User from "#models/User.js";
import Session from "#models/Sessions.js";

const register = async (req, res) => {
    try {
        const { name, surname, username, gender, birthDate, email, password } = req.body;

        const checkUnique = await User.findOne({
            $or: [{ username }, { email }]
        });

        if (checkUnique) {
            const conflictField = checkUnique.username === username ? 'Username' : 'Email';
            return res.status(400).json({
                message: `${conflictField} is already in use.`
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            surname,
            username,
            gender,
            birthDate,
            email,
            password: hashedPassword
        })

        const { accessToken, refreshToken } = generateToken(newUser._id, newUser.role);

        const refreshExpireTimeMs = Number(process.env.REFRESH_EXPIRE_TIME) || 24 * 60 * 60 * 1000;

        await Session.create({
            userId: newUser._id,
            token: refreshToken,
            expiresAt: new Date(Date.now() + refreshExpireTimeMs),
            device: req.headers['user-agent']
        })

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: refreshExpireTimeMs
        });

        return res.status(201).json({ accessToken, id: newUser._id });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Error creating user", status: 'fail' })
    }
}

const login = (req, res) => {

}

const logout = (req, res) => {

}

const refresh = (req, res) => {

}

export { register, login, logout, refresh };