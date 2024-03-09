const express = require("express");
const router = new express.Router();

const items = require("./fakeDB");


/** GET /items: get list of items */
router.get("/", function (req, res) {
    return res.json(items);
});


module.exports = router;