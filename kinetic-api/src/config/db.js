import 'dotenv/config'
import mongoose from "mongoose"

const connectDB = async () => {
    const uri = process.env.CONNECTION_URI

    if (!uri) {
        console.error("❌ CRITICAL ERROR: CONNECTION_URI is not defined in the .env file!")
        process.exit(1)
    }

    try {
        const conn = await mongoose.connect(uri.trim())
        console.log(` MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`)
    } catch (e) {
        console.error("MongoDB connection error:", e.message)

        process.exit(1)
    }
}


export default connectDB
