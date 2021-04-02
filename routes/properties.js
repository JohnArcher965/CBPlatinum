var express = require("express");
var router = express.Router();
var Property = require("../models/property");
var middleware = require("../middleware");

//Index Route

router.get("/", middleware.isLoggedIn, function(req, res){
	Property.find({}, function(err, allProperties){
		if(err){
			console.log(err);
		} else {
			res.render("properties/index", {properties: allProperties});
		}
	});
});

//New

router.get("/new", middleware.isLoggedIn, function(req, res){
	res.render("properties/new");
});

//CREATE - add new property to database
router.post("/", middleware.isLoggedIn, function(req, res){
    //get data from form and add to properties array
	var propertyId = req.body.propertyId;
    var name = req.body.name;
    var addL1 = req.body.addressLineOne;
    var addL2 = req.body.addressLineTwo;
	var city = req.body.city;
	var postcode = req.body.postcode;
	var propertyType = req.body.propertyType;
	var beds = req.body.beds;
	var baths = req.body.baths;
	var receptions = req.body.receptions;
	var outsideSpace = req.body.outsideSpace;
	var image = req.body.image;
    var newProperty = {propertyId: propertyId, propertyName: name, address: {lineOne: addL1, lineTwo: addL2, city: city, postcode: postcode}, propertyType: propertyType, beds: beds, baths: baths, receptions: receptions, image: image, outsideSpace: outsideSpace };
    //Create a new Property and save to database
    Property.create(newProperty, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {    //redirect back to properties page.
			console.log(newlyCreated);
             res.redirect("/properties");
        }
    });
});

//SHOW

router.get("/:id", middleware.isLoggedIn, function(req, res){
	//Find the property with provided ID
	Property.findById(req.params.id).populate("inspections").exec(function(err, foundProperty){
		if(err){
			console.log(err);
		} else {
			console.log(foundProperty);
			//render show template with that property.
			res.render("properties/show", {property: foundProperty});
		}
	});
});


module.exports = router;