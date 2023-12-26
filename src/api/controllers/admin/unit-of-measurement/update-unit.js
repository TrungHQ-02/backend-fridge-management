const db = require("../../../../models/index.js");
const {
  validateUpdateUnitOfMeasurement,
} = require("../../../validators/unit.validator.js");

const { errorHelper, logger, getText } = require("../../../../utils/index.js");

let editUnitByName = async (req, res) => {
  const { error } = validateUpdateUnitOfMeasurement(req.body);
  if (error)
    return res
      .status(400)
      .json(errorHelper("00117", req, error.details[0].message));

  if (req.body.oldName === req.body.newName)
    return res.status(400).json(errorHelper("00118", req));

  let unit = "";
  try {
    unit = await db.UnitOfMeasurement.findOne({
      where: {
        unitName: req.body.oldName,
      },
    });

    if (unit == null) {
      return res.status(400).json(errorHelper("00119", req));
    }
  } catch (err) {
    return res.status(500).json(errorHelper("00120", req, err.message));
  }

  try {
    await db.UnitOfMeasurement.update(
      {
        unitName: req.body.newName,
      },
      {
        where: {
          unitName: req.body.oldName,
        },
      }
    );
  } catch (e) {
    return res.status(500).json(errorHelper("00121", req, err.message));
  }

  logger("00122", req.user.id, getText("en", "00122"), "Info", req);
  return res.status(200).json({
    resultMessage: { en: getText("en", "00122"), vn: getText("vn", "00122") },
    resultCode: "00122",
  });
};

module.exports = editUnitByName;
