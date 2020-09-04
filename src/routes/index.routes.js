const express = require("express");
const router = express.Router();

const { 
    renderIndex,
    renderAdd,
    renderView,
    add,
    remove,
 } = require("../controllers/index.controller");

router.get("/", renderIndex);
router.get("/add", renderAdd);
router.get("/view/:id", renderView);
router.post("/add", add);
router.get("/remove/:id", remove);

module.exports = router;