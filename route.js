const express = require("express");
const router = new express.Router();
const items = require("./fakeDB");


/** GET /items: get list of items */
router.get("/", function (req, res) {
    return res.json(items);
});

/** DELETE /items/[name]: delete user, return status */
router.delete("/:name", function (req, res) {
    const idx = items.findIndex(item => item.name === req.params.name);
    items.splice(idx, 1);
    return res.json({ message: "Deleted" });
});


module.exports = router;