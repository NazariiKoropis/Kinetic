import 'dotenv/config'
import jwt from "jsonwebtoken"

import ROLES from "#constants/roles.js"


const checkAuth = async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'You are not authorized'
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_SECRET_KEY)

        req.user = { id: decoded.id, role: decoded.role }

        next()
    } catch (e) {
        return res.status(401).json({
            success: false,
            message: 'Invalid token',
            error: e.message,
        })
    }
}


const checkRole = (req, res, next) => {
    try {
        if (!req.user) return res.status(401).json({ success: false, message: 'Unauthorized' })

        if (req.user.role !== ROLES.ADMIN) return res.status(403).json({
            success: false,
            message: 'Forbidden'
        })

        next()
    } catch (e) {
        console.error('Auth Middleware Error:', e)
        return res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
}


export { checkAuth, checkRole }
