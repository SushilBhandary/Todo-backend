
const mongoose = require('mongoose')
const app = require('./app.js')
const config = require("./config/config")

const conn = async() => {
    await mongoose.connect(config.MONGODB_URL)
    .then(console.log("DB CONNECTED"))
    .catch((e) => console.log("Error", e))
}

conn()
const onListening = () => {
    console.log(config.PORT);
    console.log(config);
    console.log(`Listening on http://localhost:${config.PORT}/`);
}

app.listen(config.PORT, onListening)