var express = require("express");
var router = express.Router({mergeParams: true});
var Property = require("../models/property");
var Inspection = require("../models/inspection");
var Entrance = require("../models/entrance");
var middleware = require("../middleware");



module.exports = router;