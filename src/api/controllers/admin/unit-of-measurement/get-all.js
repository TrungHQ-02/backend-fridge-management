const db = require("../../../../models/index.js");

const { errorHelper, logger, getText } = require("../../../../utils/index.js");

let getAllUnits = async (req, res) => {
  let units = "";
  try {
    units = await db.UnitOfMeasurement.findAll();
  } catch (err) {
    return res.status(500).json(errorHelper("00111", req, err.message));
  }

  logger("00110", req.user.id, getText("en", "00110"), "Info", req);
  return res.status(200).json({
    resultMessage: { en: getText("en", "00110"), vn: getText("vn", "00110") },
    resultCode: "00110",
    units: units,
  });
};

module.exports = getAllUnits;
