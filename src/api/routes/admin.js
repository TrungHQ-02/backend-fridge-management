const express = require("express");
const {
  getAllLogs,
  createUnitOfMeasurement,
  getAllUnits,
  editUnitByName,
  deleteUnitByName,
} = require("../controllers/admin/index.js");

const { auth, authority } = require("../middlewares/index.js");

let router = express.Router();

router.get("/logs", auth, authority, getAllLogs);
router.post("/unit", auth, authority, createUnitOfMeasurement);
router.get("/unit", auth, authority, getAllUnits);
router.put("/unit", auth, authority, editUnitByName);
router.delete("/unit", auth, authority, deleteUnitByName);

module.exports = router;
