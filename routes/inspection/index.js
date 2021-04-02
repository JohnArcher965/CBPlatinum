const inspC = require("express").Router({mergeParams: true});
var Property = require("../models/property");
var Inspection = require("../models/inspection");
var Entrance = require("../models/entrance");
var middleware = require("../middleware");
//Index Route

inspC.get("/", middleware.isLoggedIn, function(req, res){
	res.send("Select an option page");
});

//New
router.get("/new", middleware.isLoggedIn, function(req, res){
	Inspection.findById(req.params.id, function(err, inspection){
		if(err){
			console.log(err);
		} else {
			res.render("inspections/content/new", {inspection: inspection});
		}
	});
});

// //Create Entrance

// router.post("/entrance", middleware.isLoggedIn, function(req, res){
// 	Inspection.findById(req.params.id, function(err, inspection){
// 		if(err){
// 			console.log(err);
// 			res.redirect("/properties");
// 		} else {
// 			var name = req.body.entrance;
// 			var entrance = {entrance: entrance, };
			
// 			Entrance.create(entrance, function(err, entrance){
// 				if(err){
// 					console.log(err);
// 				} else {
// 					//save inspection
// 					entrance.save();
// 					property.inspections.entrance.push(entrance);
// 					property.save();
// 					console.log(entrance);
// 					res.redirect('/properties/' + property._id);
// 				}
// 			});
// 		}
// 	});
// });

// //CREATE - add new property to database
// // router.post("/", function(req, res){
// //     //get data from form and add to properties array
// // 	var propertyId = req.body.propertyId;
// //     var name = req.body.name;
// //     var addL1 = req.body.addressLineOne;
// //     var addL2 = req.body.addressLineTwo;
// // 	var city = req.body.city;
// // 	var postcode = req.body.postcode;
// // 	var propertyType = req.body.propertyType;
// // 	var beds = req.body.beds;
// // 	var baths = req.body.baths;
// // 	var receptions = req.body.receptions;
// // 	var outsideSpace = req.body.outsideSpace;
// // 	var image = req.body.image;
// //     var newProperty = {propertyId: propertyId, propertyName: name, address: {lineOne: addL1, lineTwo: addL2, city: city, postcode: postcode}, propertyType: propertyType, beds: beds, baths: baths, receptions: receptions, image: image, outsideSpace: outsideSpace };
// //     //Create a new Property and save to database
// //     Property.create(newProperty, function(err, newlyCreated){
// //         if(err){
// //             console.log(err);
// //         } else {    //redirect back to properties page.
// // 			console.log(newlyCreated);
// //              res.redirect("/properties");
// //         }
// //     });
// // })

module.exports = inspC;
