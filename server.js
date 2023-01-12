require("dotenv").config()
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());


app.listen(process.env.PORT, console.log(`SERVIDOR ENCENDIDO EN PUERTO ${process.env.PORT}`))

module.exports = app;