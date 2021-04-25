const express = require("express");
const UserController = require("../controller/UserController");

const routes = express.Router();

//rotas get
routes.get("/logout", UserController.logout);
routes.get("/login", UserController.sinup);
routes.get("/register", UserController.register);
routes.get("/infos", UserController.info);
//rotas posts
routes.post("/store", UserController.store);
routes.post("/login", UserController.login);

module.exports = routes;
