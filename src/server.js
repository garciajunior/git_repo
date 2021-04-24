const express = require("express");
const routes = require("./router/routers");
require("../src/database")

const app = express();
app.use(express.json());
app.use(routes);



app.listen(3000, () => {
  console.log("Server esta no ar");
});
