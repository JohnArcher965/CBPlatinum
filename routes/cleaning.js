var express = require("express");
var router = express.Router({mergeParams: true});
var Property = require("../models/property");
var Inspection = require("../models/inspection");
var Cleaning = require("../models/cleaning");
var middleware = require("../middleware");

//======================================================================================================================================================================
//======================================================================================================================================================================
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
//																				CLEANING ROUTES 																			
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
//======================================================================================================================================================================
//======================================================================================================================================================================

//Index Route

router.get("/", middleware.isLoggedIn, function(req, res){
	res.send("This one works too!");
});

// //New Inspection
// router.get("/new", middleware.isLoggedIn, function(req, res){
// 	Property.findById(req.params.id, function(err, property){
// 		if(err){
// 			console.log(err);
// 		} else {
// 			res.render("inspections/new", {property: property});
// 		}
// 	});
// });

// //Create Inspection

// router.post("/", middleware.isLoggedIn, function(req, res){
// 	Property.findById(req.params.id, function(err, property){
// 		if(err){
// 			console.log(err);
// 			res.redirect("/properties");
// 		} else {
// 			var name = req.body.name;
// 			var createdDate = new Date();
// 			var newInspection = {inspectionName: name, date: createdDate };
			
// 			Inspection.create(newInspection, function(err, newInspection){
// 				if(err){
// 					console.log(err);
// 				} else {
// 					//add username and id to inspection and date
// 					newInspection.author.id = req.user._id;
// 					newInspection.author.username = req.user.username;
// 					//save inspection
// 					newInspection.save();
// 					property.inspections.push(newInspection);
// 					property.save();
// 					console.log(newInspection);
// 					res.redirect('/properties/' + property._id);
// 				}
// 			});
// 		}
// 	});
// });

// //View Inspection (SHOW)
// router.get("/:inspection_id/view", middleware.isLoggedIn, function(req, res){
// 	Property.findById(req.params.id, function(err, property){
// 		if(err){
// 			console.log(err);
// 		} else {
// Inspection.findById(req.params.inspection_id).populate("entrance").populate("reception").populate("kitchen").populate("storage").populate("bedroom").populate("bathroom").populate("extra").exec(function(err, inspection){
// 		if(err){
// 			console.log(err);
// 		} else{ 
// 			res.render("inspections/show", {property: property, inspection: inspection});
// 		}
// 	});
// 		}
// 	});
// });

// //Inspection - DELETE
// router.delete("/:inspection_id", middleware.checkInspectionOwnership, function(req, res){
// 	Property.findById(req.params.id, function(err, property){
// 		if(err){
// 			console.log(err);
// 		} else {
// 			Inspection.findOneAndDelete(req.params.inspection_id, function(err, inspection){
// 				if(err){
// 					console.log(err);
// 				} else{
// 					res.redirect('/properties/' + property._id);
// 				}
// 			});
// 		}
// 	});	
// });

// //======================================================================================================================================================================
// //======================================================================================================================================================================
// //-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
// //																				X ROUTES 																			
// //-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
// //======================================================================================================================================================================
// //======================================================================================================================================================================

// //Inspection Content: Entrance - NEW
// router.get("/:inspection_id/entrance", middleware.checkInspectionOwnership, function(req, res){
// 	Property.findById(req.params.id, function(err, property){
// 		if(err){
// 			console.log(err);
// 		} else {
// 	Inspection.findById(req.params.inspection_id, function(err, inspection){
// 		if(err){
// 			console.log(err);
// 		} else {
// 			res.render("inspections/inspEntNew", {property: property, inspection: inspection});
// 		}
// 	});
// 		}
// 	});
// });

// //Create Inspection Content: Entrance - CREATE
// router.post("/:inspection_id/entrance", middleware.checkInspectionOwnership, function(req, res){
// 	Property.findById(req.params.id, function(err, property){
// 		if(err){
// 			console.log(err);
// 			res.redirect("/properties");
// 		} else {
// 			Inspection.findById(req.params.inspection_id, function(err, inspection){
// 		if(err){
// 			console.log(err);
// 		} else {
// 			var locks = req.body.locks;
// 			var walls = req.body.walls;
// 			var floor = req.body.floor;
// 			var lights = req.body.lights;
// 			var comment = req.body.comment;
// 			var newEntrance = { locks: locks, walls: walls, floor: floor, lights: lights, comments: comment};
			
// 		Entrance.create(newEntrance, function(err, newEntrance){
// 				if(err){
// 					console.log(err);
// 				} else {
// 					//add username and id to comment
// 				  	newEntrance.author.id = req.user._id;
// 				  	newEntrance.author.username = req.user.username;
// 					//save entrance to inspection
// 					newEntrance.save();
// 					inspection.entrance.push(newEntrance);
// 					inspection.save();
// 					console.log(newEntrance);
// 					res.redirect('/properties/' + property._id + '/inspections/' + inspection._id + '/view');
// 				}
// 			});
// 		}
// 	});
// 		}
// });
// });

// //Inspection Content: Entrance - SHOW
// router.get("/:inspection_id/entrance/:entrance_id/view", middleware.isLoggedIn, function(req, res){
// 	Property.findById(req.params.id, function(err, property){
// 		if(err){
// 			console.log(err);
// 		} else {
// 	Inspection.findById(req.params.inspection_id, function(err, inspection){
// 		if(err){
// 			console.log(err);
// 		} else{ 
// 	Entrance.findById(req.params.entrance_id, function(err, entrance){
// 		if(err){
// 			console.log(err);
// 		} else {
// 			res.render("inspections/inspEntShow", {property: property, inspection: inspection, entrance: entrance});
// 			}
// 	});
// 		}
// 	});
// 		}
// 	});
// });

// //Inspection Content: Entrance - DELETE
// router.delete("/:inspection_id/entrance/:entrance_id", middleware.checkInspectionOwnership, function(req, res){
// 	Property.findById(req.params.id, function(err, property){
// 		if(err){
// 			console.log(err);
// 		} else {
// 			Inspection.findById(req.params.inspection_id, function(err, inspection){
// 				if(err){
// 					console.log(err);
// 				} else{
// 					Entrance.findOneAndDelete(req.params.entrance_id, function(err){
// 						if(err){
// 							res.redirect("back");
// 						} else {
// 							res.redirect('/properties/' + property._id + '/inspections/' + inspection._id + '/view');
// 						}
// 					});
// 				}
// 			});
// 		}
// 	});	
// });

// //Inspection Content: Entrance - EDIT
// router.get("/:inspection_id/entrance/:entrance_id/edit", middleware.checkInspectionOwnership, function(req, res){
// 	Property.findById(req.params.id, function(err, property){
// 		if(err){
// 			console.log(err);
// 		} else {
// 			Inspection.findById(req.params.inspection_id, function(err, inspection){
// 				if(err){
// 					console.log(err);
// 				} else{ 
// 					Entrance.findById(req.params.entrance_id, function(err, foundEnt){
// 						if(err){
// 							res.redirect("back");
// 						} else {
// 							res.render("inspections/inspEntEdit", {property: property, inspection: inspection, entrance: foundEnt});
// 						}
// 					});
// 				}
// 			});
// 		}
// 	});
// });

// // Inspection Entrance UPDATE ROUTE
// router.put("/:inspection_id/entrance/:entrance_id", middleware.checkInspectionOwnership, function(req, res){
// 			var locks = req.body.locks;
// 			var walls = req.body.walls;
// 			var floor = req.body.floor;
// 			var lights = req.body.lights;
// 			var comment = req.body.comment;
// 			var entrance = {locks: locks, walls: walls, floor: floor, lights: lights, comments: comment};
// 	Property.findById(req.params.id, function(err, property){
// 		if(err){
// 			console.log(err);
// 			res.redirect("/properties");
// 		} else {
// 			Inspection.findById(req.params.inspection_id, function(err, inspection){
// 				if(err){
// 					res.redirect("back");
// 				} else {
// 					Entrance.findByIdAndUpdate(req.params.entrance_id, entrance, function(err, entrance){
// 						if(err){
// 							console.log(err);
// 						} else {
// 							res.redirect('/properties/' + property._id + '/inspections/' + inspection._id + '/entrance/' + entrance._id + '/view' );
// 						}
// 					});
// 				}
// 			});
// 		}
// 	});
// });




module.exports = router;