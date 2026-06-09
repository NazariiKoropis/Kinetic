//libs
import express from 'express'
import 'dotenv/config'

const app = express();

const port = (process.env.PORT || "3000")
const host = (process.env.HOST || "127.0.0.1")

app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
    res.json({ message: 'Kinetic API is running successfully!' });
});

app.listen(port, host, () => console.log(`Server running at http://localhost:${port}/`))