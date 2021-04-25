const express = require("express");
const UserController = require("../controller/UserController");


const routes = express.Router();

routes.post("/store", UserController.store);
routes.get("/users", UserController.index);
routes.get("/login", UserController.sinup);
routes.get("/register", UserController.register);
routes.post("/login", UserController.login);
routes.get("/infos", UserController.info);
// routes.get("/github", UserController.findInfo);

module.exports = routes;
