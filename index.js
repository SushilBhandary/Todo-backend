import mongoose from 'mongoose'
import app from './app.js'
import config from "./config/config"

await mongoose.connect(config.MONGODB_URL)
console.log("DB CONNECTED");

const onListening = () => {
    console.log(`Listening on ${config.PORT}`);
}

app.listen(config.PORT, onListening)