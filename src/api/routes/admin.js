const express = require("express");
const { getAllLogs } = require("../controllers/admin/index.js");

const { auth, authority } = require("../middlewares/index.js");

let router = express.Router();

router.get("/logs", auth, authority, getAllLogs);

module.exports = router;
