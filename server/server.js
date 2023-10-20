const express = require('express')
const dotenv = require('dotenv').config()
const bodyParser = require("body-parser")
const cors = require("cors")
const connectDB = require("./config/db")
const app = express()
const port =  process.env.PORT || 3000

connectDB()

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
  });
  


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))


app.use("/fiche", cors(), require('./routes/fiche.routes.js'))

app.use("/auth", cors(), require('./config/login'))

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`App listening on port ${port}!`))