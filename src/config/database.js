const mongoose = require("mongoose");

const {
  DB_DATABASE,
  DB_HOSTNAME,
  DB_PORT,
} = process.env

mongoose.connect(
  `mongodb://${DB_HOSTNAME}:${DB_PORT}/${DB_DATABASE}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
).then(() => console.log("connected with successfully 🎃🍁"))
