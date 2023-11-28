const express = require("express");
const port = require("./config/index.js");
console.log(port);
const loader = require("./loaders/index.js");

console.log(loader);
const app = express();
loader(app);

app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return process.exit(1);
  }
  console.log(`Server is running on ${port}`);
});

// export default app;
