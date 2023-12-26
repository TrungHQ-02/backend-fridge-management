const db = require("../../../../models/index.js");

const {
  validateCreateUnitOfMeasurement,
} = require("../../../validators/unit.validator.js");
const { errorHelper, logger, getText } = require("../../../../utils/index.js");

let createUnitOfMeasurement = async (req, res) => {
  let unit = "";
  const { error } = validateCreateUnitOfMeasurement(req.body);
  if (error) {
    let code = "00112";
    return res
      .status(400)
      .json(errorHelper(code, req, error.details[0].message));
  }

  try {
    const exists = await db.UnitOfMeasurement.findOne({
      where: {
        unitName: req.body.unitName,
      },
    });

    // console.log(exists);
    if (exists != null) return res.status(409).json(errorHelper("00113", req));
  } catch (err) {
    return res.status(500).json(errorHelper("00114", req, err.message));
  }
  try {
    unit = await db.UnitOfMeasurement.create({
      unitName: req.body.unitName,
    });
  } catch (err) {
    return res.status(500).json(errorHelper("00115", req, err.message));
  }

  logger("00116", req.user.id, getText("en", "00116"), "Info", req);
  return res.status(200).json({
    resultMessage: { en: getText("en", "00116"), vn: getText("vn", "00116") },
    resultCode: "00116",
    unit,
  });
};

module.exports = createUnitOfMeasurement;
