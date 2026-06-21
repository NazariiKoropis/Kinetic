import bcrypt from "bcrypt";
import 'dotenv/config';
import jwt from "jsonwebtoken";

import generateToken from "#utils/generate-token.js";

import Session from "#models/Sessions.js";
import User from "#models/User.js";

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

        return res.status(201).json({
            accessToken,
            user: {
                id: newUser._id,
                name: newUser.name,
                username: newUser.username,
                role: newUser.role
            }
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Error creating user", status: 'fail' })
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const { accessToken, refreshToken } = generateToken(user._id, user.role);

        const refreshExpireTimeMs = Number(process.env.REFRESH_EXPIRE_TIME) || 24 * 60 * 60 * 1000;

        await Session.create({
            userId: user._id,
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

        return res.status(200).json({
            accessToken,
            user: {
                id: user._id,
                name: user.name,
                username: user.username,
                role: user.role
            }
        });

    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Error logging in", status: 'fail' })
    }
}

const logout = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;
        await Session.deleteOne({ token: refreshToken });

        res.clearCookie('refreshToken');
        res.json({ message: 'Session is closed' });

    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Error logging out", status: 'fail' })
    }
}

const refresh = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;

        if (!refreshToken) return res.status(401).json({ error: 'Token is missing' });

        const savedSession = await Session.findOne({ token: refreshToken });

        if (!savedSession) {
            return res.status(403).json({ error: 'Session is not valid or closed' });
        }

        jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY, async (err, decoded) => {
            if (err) {
                await Session.deleteOne({ _id: savedSession._id });
                return res.status(403).json({ error: 'Token is not valid or closed' });
            }

            const accessToken = jwt.sign({
                id: decoded.id,
                role: decoded.role
            },
                process.env.ACCESS_SECRET_KEY,
                {
                    expiresIn: process.env.ACCESS_EXPIRE_TIME
                });

            const user = await User.findById(decoded.id).select('name surname username role');
            if (!user) {
                return res.status(403).json({ error: 'User not found' });
            }

            res.json({
                accessToken,
                user: {
                    id: user._id,
                    name: user.name,
                    username: user.username,
                    role: user.role
                }
            });
        });

    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Error refreshing token", status: 'fail' })
    }
}

export { login, logout, refresh, register };

