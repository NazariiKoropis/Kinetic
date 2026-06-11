import jwt from "jsonwebtoken";
import 'dotenv/config'

const authCheck = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ error: 'Ви не авторизовані. Токен відсутній.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_SECRET_KEY);

        req.user = decoded;

        next();
    } catch (e) {
        return res.status(401).json({ error: 'Невалідний або прострочений токен.', message: e.message, });
    }
}

export default authCheck;