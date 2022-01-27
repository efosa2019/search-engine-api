const express = require("express")
const controller = require("../controllers")
const routes = express.Router()

routes.route("/").get(controller.getNames)

module.exports = routes
