const express = require("express");
const router = require("./routes");

const app = express();
app.use(express.json());

app.use("/items", router)


app.get("/items/:name", router)


module.exports = app;