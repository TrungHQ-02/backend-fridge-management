const express = require("express");

let router = express.Router();

router.get("/", () => {
  console.log("Hello world");
});

module.exports = router;
