
import 'dotenv/config'
import jwt from "jsonwebtoken"

const generateToken = (id, role) => {

    const accessToken = jwt.sign(
        { id, role },
        process.env.ACCESS_SECRET_KEY,
        { expiresIn: process.env.ACCESS_EXPIRE_TIME }
    )

    const refreshToken = jwt.sign(
        { id, role },
        process.env.REFRESH_SECRET_KEY,
        { expiresIn: process.env.REFRESH_EXPIRE_TIME }
    )

    return {
        accessToken,
        refreshToken
    }
}

export default generateToken
