import 'dotenv/config';
import mongoose from "mongoose";


const connectDB = async () => {
    const uri = process.env.CONNECTION_URI;

    if (!uri) {
        console.error("❌ КРИТИЧНА ПОМИЛКА: CONNECTION_URI не задано в .env файлі!");
        process.exit(1);
    }

    try {

        const conn = await mongoose.connect(uri.trim());

        console.log(`🚀 MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
    } catch (error) {
        console.error("❌ Помилка підключення до MongoDB:", error.message);

        process.exit(1);
    }
};


export default connectDB;

