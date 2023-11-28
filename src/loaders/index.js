import sequelizeLoader from "./connectDB.js";

export default async (app) => {
  await sequelizeLoader();
};
