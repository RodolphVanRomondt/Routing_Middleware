const express = require("express");
const router = new express.Router();

const items = require("./fakeDB");


/** GET /items: get list of items */
router.get("/", function (req, res) {
    return res.json(items);
});

/* POST /items: add an items to the list. */
router.post("/", function (req, res) {

    if (!req.body.name || !req.body.price) {
        return res.status(400).json({message: "Incorrect Request."})
    }

    const inOUt = items.filter(function (ele) {
        return ele.name === req.body.name;
    });

    if (!inOUt.length) {
        items.push(req.body);
    } else {
        return res.status(400).json({message: "Item is already in shopping list."});
    }

    return res.status(201).json({ added: req.body});
});

/* GET /items/[name]: get item by name. */
router.get("/:name", function (req, res) {
    const idx = items.findIndex(item => item.name === req.params.name);

    if (idx === -1) {
        return res.status(400).json({message: "Item Not Found."});
    }

    return res.json(items[idx]);
});


module.exports = router;