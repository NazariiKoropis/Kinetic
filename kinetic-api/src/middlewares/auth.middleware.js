import jwt from "jsonwebtoken";
import 'dotenv/config'

import { ROLES } from "#constants/ROLES";

const checkAuth = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ error: 'You are not authorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_SECRET_KEY);

        req.user = { id: decoded.id, role: decoded.role };

        next();
    } catch (e) {
        return res.status(401).json({ error: 'Invaid token', message: e.message, });
    }
}


const checkRole = (req, res, next) => {
    try {
        if (!req.user) return res.status(401).json({ message: 'Unauthorized' })

        if (req.user.role !== ROLES.ADMIN) return res.status(500).json({ message: 'Forbidden' })

        next()
    } catch (e) {
        console.error('Auth Middleware Error:', e);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}


export default { checkAuth, checkRole };