const db = require("../../../models/index.js");

const { errorHelper, logger, getText } = require("../../../utils/index.js");

let getAllLogs = async (req, res) => {
  let logs = "";
  try {
    logs = await db.Log.findAll();
  } catch (err) {
    return res.status(500).json(errorHelper("00108", req, err.message));
  }

  logger("00109", req.user.id, getText("en", "00109"), "Info", req);
  return res.status(200).json({
    resultMessage: { en: getText("en", "00109"), vn: getText("vn", "00109") },
    resultCode: "00109",
    logs: logs,
  });
};

module.exports = getAllLogs;
