import mongoose from "mongoose";
import 'dotenv/config'

const connectDB = async () => {
    let uri = process.env.CONNECTION_URI;

    if (!uri) {
        console.error("КРИТИЧНА ПОМИЛКА: CONNECTION_URI не задано в .env файлі!");
        process.exit(1);
    }

    uri = uri.trim();
    if (uri.endsWith('/')) {
        uri = uri.slice(0, -1);
    }

    try {
        const conn = await mongoose.connect(uri);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (e) {
        console.error(e);
    }
}

export default connectDB;

