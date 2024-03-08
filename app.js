const express = require("express");
const router = require("./route");

const app = express();
app.use(express.json());

app.get("/", router)