const express = require("express");

const swagerJsdoc = require("swagger-jsdoc");
const { serve, setup } = require("swagger-ui-express");
const { apiSpecs, swaggerConfig } = require("../../config/index.js");

const user = require("./user.js");
const admin = require("./admin.js");
const food = require("./food.js");
const fridgeItem = require("./fridge-item.js");
const shopping = require("./shopping.js");

let router = express.Router();

const specDoc = swagerJsdoc(swaggerConfig);

router.use(apiSpecs, serve);
router.get(apiSpecs, setup(specDoc, { explorer: true }));

router.use("/user", user);
router.use("/admin", admin);
router.use("/food", food);
router.use("/fridge", fridgeItem);
router.use("/shopping", shopping);

module.exports = router;
