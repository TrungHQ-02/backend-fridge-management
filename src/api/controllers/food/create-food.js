const db = require("../../../models/index.js");
const { validateCreateFood } = require("../../validators/food.validator.js");
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

let createFood = async (req, res) => {
  let newFood = "";
  let unitId = 0;
  let categoryId = 0;
  const { error } = validateCreateFood(req.body);
  if (error) {
    let code = "00147";

    console.log(error.details[0].message);
    if (error.details[0].message.includes("name")) code = "00148";
    else if (error.details[0].message.includes("foodCategoryName"))
      code = "00149";
    else if (error.details[0].message.includes("unitName")) code = "00150";

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
    if (exists != null) return res.status(409).json(errorHelper("00151", req));
  } catch (err) {
    return res.status(500).json(errorHelper("00152", req, err.message));
  }

  //   search for unit
  try {
    let unit = await db.UnitOfMeasurement.findOne({
      where: {
        unitName: req.body.unitName,
      },
    });

    if (unit == null) {
      return res.status(400).json(errorHelper("00153", req));
    }

    unitId = unit.id;
  } catch (err) {
    return res.status(500).json(errorHelper("00154", req, err.message));
  }

  // search for category
  try {
    let category = await db.FoodCategory.findOne({
      where: {
        name: req.body.foodCategoryName,
      },
    });

    if (category == null) {
      return res.status(400).json(errorHelper("00155", req));
    }
    categoryId = category.id;
  } catch (err) {
    return res.status(500).json(errorHelper("00156", req, err.message));
  }

  try {
    newFood = await db.Food.create({
      name: req.body.name,
      UnitOfMeasurementId: unitId,
      FoodCategoryId: categoryId,
      UserId: req.user.id,
    });
  } catch (err) {
    return res.status(500).json(errorHelper("00157", req, err.message));
  }

  // image upload
  let hasError = false;
  if (req.file) {
    let photoUrl = "";
    initializeApp(firebaseConfig);
    const storage = getStorage();
    const dateTime = giveCurrentDateTime();
    const storageRef = ref(storage, `food/${newFood.id}/${dateTime}`);
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
    } catch (err) {
      hasError = true;
      return res.status(500).json(errorHelper("00158", req, err.message)).end();
    }

    if (!hasError) {
      try {
        await db.Food.update(
          {
            imageUrl: photoUrl,
          },
          {
            where: {
              name: req.body.name,
            },
          }
        );
      } catch (e) {
        return res.status(500).json(errorHelper("00159", req, err.message));
      }

      newFood.imageUrl = photoUrl;

      logger("00160", req.user.id, getText("en", "00160"), "Info", req);
      return res.status(200).json({
        resultMessage: {
          en: getText("en", "00160"),
          vn: getText("vn", "00160"),
        },
        resultCode: "00160",
        newFood,
      });
    }
  }
};

module.exports = createFood;
