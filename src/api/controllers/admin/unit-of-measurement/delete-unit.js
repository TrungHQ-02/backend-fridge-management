const db = require("../../../../models/index.js");
const {
  validateDeleteUnitOfMeasurement,
} = require("../../../validators/unit.validator.js");

const { errorHelper, logger, getText } = require("../../../../utils/index.js");

let deleteUnitByName = async (req, res) => {
  const { error } = validateDeleteUnitOfMeasurement(req.body);
  if (error) {
    let code = "00123";
    return res
      .status(400)
      .json(errorHelper(code, req, error.details[0].message));
  }

  let unit = "";
  try {
    unit = await db.UnitOfMeasurement.findOne({
      where: {
        unitName: req.body.unitName,
      },
    });

    if (unit == null) {
      return res.status(400).json(errorHelper("00125", req));
    }
  } catch (err) {
    return res.status(500).json(errorHelper("00126", req, err.message));
  }

  try {
    await unit.destroy();
  } catch (err) {
    return res.status(500).json(errorHelper("00127", req, err.message));
  }

  logger("00128", req.user.id, getText("en", "00128"), "Info", req);
  return res.status(200).json({
    resultMessage: { en: getText("en", "00128"), vn: getText("vn", "00128") },
    resultCode: "00128",
  });
};

module.exports = deleteUnitByName;
