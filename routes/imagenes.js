var express = require("express");

var api = express.Router();

var Jimp = require("jimp");

imagenController = require("../controller/imagenes.js");

api.get("/pruebados", imagenController.pruebados);

api.get("/createImagen", imagenController.createImagen);

api.get("/test", imagenController.test);

module.exports = api;