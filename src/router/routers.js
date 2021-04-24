const express = require("express");
const UserController = require("../controller/UserController");

const routes = express.Router();

routes.post("/user", UserController.store);
routes.get("/users", UserController.index);

module.exports = routes;
