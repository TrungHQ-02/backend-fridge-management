const db = require("../../../models/index.js");
const { validateUpdateFood } = require("../../validators/food.validator.js");
const {
  errorHelper,
  logger,
  getText,
  giveCurrentDateTime,
} = require("../../../utils/index.js");

// firebase for image upload
const { firebaseConfig } = require("../../../config/index.js");

const { initializeApp } = require("firebase/app");

const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} = require("firebase/storage");

let updateFood = async (req, res) => {
  let food = "";
  let unitId = 0;
  let categoryId = 0;
  const { error } = validateUpdateFood(req.body);
  if (error) {
    let code = "00161";
    console.log(error.details[0].message);
    if (error.details[0].message.includes("name")) code = "00162";
    else if (error.details[0].message.includes("at least")) code = "00163";
    else if (error.details[0].message.includes("newCategory")) code = "00164";
    else if (error.details[0].message.includes("newUnit")) code = "00165";
    else if (error.details[0].message.includes("newName")) code = "00166";

    return res
      .status(400)
      .json(errorHelper(code, req, error.details[0].message));
  }

  try {
    const exists = await db.Food.findOne({
      where: {
        name: req.body.name,
      },
    });

    // console.log(exists);
    if (exists == null) return res.status(409).json(errorHelper("00167", req));
    food = exists;

    // check for authority
    // mọi người trong nhóm đều có thể chỉnh sửa

    let user = await db.User.findOne({
      where: {
        id: req.user.id,
      },
    });

    if (food.UserId != user.belongsToGroupAdminId) {
      return res.status(409).json(errorHelper("00167x", req));
    }
  } catch (err) {
    return res.status(500).json(errorHelper("00168", req, err.message));
  }

  //   search for unit
  if (req.body.newUnit) {
    try {
      let unit = await db.UnitOfMeasurement.findOne({
        where: {
          unitName: req.body.newUnit,
        },
      });

      if (unit == null) {
        return res.status(400).json(errorHelper("00169", req));
      }

      unitId = unit.id;
      food.UnitOfMeasurementId = unitId;
    } catch (err) {
      return res.status(500).json(errorHelper("00170", req, err.message));
    }
  }

  if (req.body.newCategory) {
    try {
      let category = await db.FoodCategory.findOne({
        where: {
          name: req.body.newCategory,
        },
      });

      if (category == null) {
        return res.status(400).json(errorHelper("00171", req));
      }
      categoryId = category.id;
      food.FoodCategoryId = categoryId;
    } catch (err) {
      return res.status(500).json(errorHelper("00172", req, err.message));
    }
  }

  if (req.body.newName) {
    try {
      let findFoodWithNewName = await db.Food.findOne({
        where: {
          name: req.body.newName,
        },
      });

      if (findFoodWithNewName != null) {
        return res.status(400).json(errorHelper("00173", req));
      }
      food.name = req.body.newName;
    } catch (err) {
      return res.status(500).json(errorHelper("00174", req, err.message));
    }
  }

  try {
    await food.save();
  } catch (err) {
    return res.status(500).json(errorHelper("00175", req, err.message));
  }

  // image upload
  let hasError = false;
  if (req.file) {
    let photoUrl = "";
    initializeApp(firebaseConfig);
    const storage = getStorage();
    const dateTime = giveCurrentDateTime();
    const storageRef = ref(storage, `food/${food.id}/${dateTime}`);
    const metadata = {
      contentType: req.file.mimetype,
    };
    try {
      const snapshot = await uploadBytesResumable(
        storageRef,
        req.file.buffer,
        metadata
      );
      photoUrl = await getDownloadURL(snapshot.ref);
      console.log("URL", photoUrl);
      food.imageUrl = photoUrl;
    } catch (err) {
      hasError = true;
      return res.status(500).json(errorHelper("00176", req, err.message)).end();
    }

    if (!hasError) {
      try {
        await food.save();
      } catch (e) {
        return res.status(500).json(errorHelper("00177", req, err.message));
      }
    }
  }

  logger("00178", req.user.id, getText("en", "00178"), "Info", req);
  return res.status(200).json({
    resultMessage: {
      en: getText("en", "00178"),
      vn: getText("vn", "00178"),
    },
    resultCode: "00178",
    food,
  });
};

module.exports = updateFood;
