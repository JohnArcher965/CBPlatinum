var express = require("express");
var router = express.Router({mergeParams: true});
var Property = require("../models/property");
var Inspection = require("../models/inspection");
var Entrance = require("../models/entrance");
var Reception = require("../models/reception");
var Kitchen = require("../models/kitchen");
var Storage = require("../models/storage");
var Bedroom = require("../models/bedroom");
var Bathroom = require("../models/bathroom");
var Extra = require("../models/extra");
var middleware = require("../middleware");

//======================================================================================================================================================================
//======================================================================================================================================================================
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
//																				INSPECTION ROUTES 																			
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
//======================================================================================================================================================================
//======================================================================================================================================================================

//Index Route

router.get("/", middleware.isLoggedIn, function(req, res){
	res.send("This one works too!");
});

//New Inspection
router.get("/new", middleware.isLoggedIn, function(req, res){
	Property.findById(req.params.id, function(err, property){
		if(err){
			console.log(err);
		} else {
			res.render("inspections/new", {property: property});
		}
	});
});

//Create Inspection

router.post("/", middleware.isLoggedIn, function(req, res){
	Property.findById(req.params.id, function(err, property){
		if(err){
			console.log(err);
			res.redirect("/properties");
		} else {
			var name = req.body.name;
			var createdDate = new Date();
			var newInspection = {inspectionName: name, date: createdDate };
			
			Inspection.create(newInspection, function(err, newInspection){
				if(err){
					console.log(err);
				} else {
					//add username and id to inspection and date
					newInspection.author.id = req.user._id;
					newInspection.author.username = req.user.username;
					//save inspection
					newInspection.save();
					property.inspections.push(newInspection);
					property.save();
					console.log(newInspection);
					res.redirect('/properties/' + property._id);
				}
			});
		}
	});
});

//View Inspection (SHOW)
router.get("/:inspection_id/view", middleware.isLoggedIn, function(req, res){
	Property.findById(req.params.id, function(err, property){
		if(err){
			console.log(err);
		} else {
Inspection.findById(req.params.inspection_id).populate("entrance").populate("reception").populate("kitchen").populate("storage").populate("bedroom").populate("bathroom").populate("extra").exec(function(err, inspection){
		if(err){
			console.log(err);
		} else{ 
			res.render("inspections/show", {property: property, inspection: inspection});
		}
	});
		}
	});
});

//Inspection - DELETE
router.delete("/:inspection_id", middleware.checkInspectionOwnership, function(req, res){
	Property.findById(req.params.id, function(err, property){
		if(err){
			console.log(err);
		} else {
			Inspection.findOneAndDelete(req.params.inspection_id, function(err, inspection){
				if(err){
					console.log(err);
				} else{
					res.redirect('/properties/' + property._id);
				}
			});
		}
	});	
});

//======================================================================================================================================================================
//======================================================================================================================================================================
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
//																				ENTRANCE ROUTES 																			
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
//======================================================================================================================================================================
//======================================================================================================================================================================

//Inspection Content: Entrance - NEW
router.get("/:inspection_id/entrance", middleware.checkInspectionOwnership, function(req, res){
	Property.findById(req.params.id, function(err, property){
		if(err){
			console.log(err);
		} else {
	Inspection.findById(req.params.inspection_id, function(err, inspection){
		if(err){
			console.log(err);
		} else {
			res.render("inspections/inspEntNew", {property: property, inspection: inspection});
		}
	});
		}
	});
});

//Create Inspection Content: Entrance - CREATE
router.post("/:inspection_id/entrance", middleware.checkInspectionOwnership, function(req, res){
	Property.findById(req.params.id, function(err, property){
		if(err){
			console.log(err);
			res.redirect("/properties");
		} else {
			Inspection.findById(req.params.inspection_id, function(err, inspection){
		if(err){
			console.log(err);
		} else {
			var locks = req.body.locks;
			var walls = req.body.walls;
			var floor = req.body.floor;
			var lights = req.body.lights;
			var comment = req.body.comment;
			var newEntrance = { locks: locks, walls: walls, floor: floor, lights: lights, comments: comment};
			
		Entrance.create(newEntrance, function(err, newEntrance){
				if(err){
					console.log(err);
				} else {
					//add username and id to comment
				  	newEntrance.author.id = req.user._id;
				  	newEntrance.author.username = req.user.username;
					//save entrance to inspection
					newEntrance.save();
					inspection.entrance.push(newEntrance);
					inspection.save();
					console.log(newEntrance);
					res.redirect('/properties/' + property._id + '/inspections/' + inspection._id + '/view');
				}
			});
		}
	});
		}
});
});

//Inspection Content: Entrance - SHOW
router.get("/:inspection_id/entrance/:entrance_id/view", middleware.isLoggedIn, function(req, res){
	Property.findById(req.params.id, function(err, property){
		if(err){
			console.log(err);
		} else {
	Inspection.findById(req.params.inspection_id, function(err, inspection){
		if(err){
			console.log(err);
		} else{ 
	Entrance.findById(req.params.entrance_id, function(err, entrance){
		if(err){
			console.log(err);
		} else {
			res.render("inspections/inspEntShow", {property: property, inspection: inspection, entrance: entrance});
			}
	});
		}
	});
		}
	});
});

//Inspection Content: Entrance - DELETE
router.delete("/:inspection_id/entrance/:entrance_id", middleware.checkInspectionOwnership, function(req, res){
	Property.findById(req.params.id, function(err, property){
		if(err){
			console.log(err);
		} else {
			Inspection.findById(req.params.inspection_id, function(err, inspection){
				if(err){
					console.log(err);
				} else{
					Entrance.findOneAndDelete(req.params.entrance_id, function(err){
						if(err){
							res.redirect("back");
						} else {
							res.redirect('/properties/' + property._id + '/inspections/' + inspection._id + '/view');
						}
					});
				}
			});
		}
	});	
});

//Inspection Content: Entrance - EDIT
router.get("/:inspection_id/entrance/:entrance_id/edit", middleware.checkInspectionOwnership, function(req, res){
	Property.findById(req.params.id, function(err, property){
		if(err){
			console.log(err);
		} else {
			Inspection.findById(req.params.inspection_id, function(err, inspection){
				if(err){
					console.log(err);
				} else{ 
					Entrance.findById(req.params.entrance_id, function(err, foundEnt){
						if(err){
							res.redirect("back");
						} else {
							res.render("inspections/inspEntEdit", {property: property, inspection: inspection, entrance: foundEnt});
						}
					});
				}
			});
		}
	});
});

// Inspection Entrance UPDATE ROUTE
router.put("/:inspection_id/entrance/:entrance_id", middleware.checkInspectionOwnership, function(req, res){
			var locks = req.body.locks;
			var walls = req.body.walls;
			var floor = req.body.floor;
			var lights = req.body.lights;
			var comment = req.body.comment;
			var entrance = {locks: locks, walls: walls, floor: floor, lights: lights, comments: comment};
	Property.findById(req.params.id, function(err, property){
		if(err){
			console.log(err);
			res.redirect("/properties");
		} else {
			Inspection.findById(req.params.inspection_id, function(err, inspection){
				if(err){
					res.redirect("back");
				} else {
					Entrance.findByIdAndUpdate(req.params.entrance_id, entrance, function(err, entrance){
						if(err){
							console.log(err);
						} else {
							res.redirect('/properties/' + property._id + '/inspections/' + inspection._id + '/entrance/' + entrance._id + '/view' );
						}
					});
				}
			});
		}
	});
});

//======================================================================================================================================================================
//======================================================================================================================================================================
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
//																				RECEPTION ROUTES 																			
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
//======================================================================================================================================================================
//======================================================================================================================================================================

//Inspection Content: Reception - NEW
router.get("/:inspection_id/reception", middleware.checkInspectionOwnership, function(req, res){
	Property.findById(req.params.id, function(err, property){
		if(err){
			console.log(err);
		} else {
	Inspection.findById(req.params.inspection_id, function(err, inspection){
		if(err){
			console.log(err);
		} else {
			res.render("inspections/inspRecepNew", {property: property, inspection: inspection});
		}
	});
		}
	});
});

//Create Inspection Content: Reception - CREATE
router.post("/:inspection_id/reception", middleware.checkInspectionOwnership, function(req, res){
	Property.findById(req.params.id, function(err, property){
		if(err){
			console.log(err);
			res.redirect("/properties");
		} else {
			Inspection.findById(req.params.inspection_id, function(err, inspection){
		if(err){
			console.log(err);
		} else {
			var floor = req.body.floor;var walls = req.body.walls;var infoPack = req.body.infoPack;var wifi = req.body.wifi;var wifiS = req.body.wifiS;var decor = req.body.decor;var lights = req.body.lights;var tv = req.body.tv;var heating = req.body.heating;var aircon = req.body.aircon;var sofa = req.body.sofa;var cushions = req.body.scatterC;var blinds = req.body.blinds;var windows = req.body.windows;var diningTable = req.body.diningT;var diningChairs = req.body.diningC;var balcony = req.body.balcony;var balconyFurniture = req.body.balconyF;var comments = req.body.comments;
			var newReception = { floor: floor, walls: walls, infoPack: infoPack, wifi: {comments: wifi, speed: wifiS }, decor: decor, lights: lights, tv: tv, heating: heating, aircon:aircon, sofa:sofa, cushions: cushions, blinds:blinds, windows:windows, diningTable:diningTable, diningChairs:diningChairs, balcony:balcony, balconyFurniture:balconyFurniture, comments: comments};
			
		Reception.create(newReception, function(err, newReception){
				if(err){
					console.log(err);
				} else {
					newReception.author.id = req.user._id;
				  	newReception.author.username = req.user.username;
					//save entrance to inspection
					newReception.save();
					inspection.reception.push(newReception);
					inspection.save();
					console.log(newReception);
					res.redirect('/properties/' + property._id + '/inspections/' + inspection._id + '/view');
				}
			});
		}
	});
		}
});
});

//Inspection Content: Reception - SHOW
router.get("/:inspection_id/reception/:reception_id/view", middleware.isLoggedIn, function(req, res){
	Property.findById(req.params.id, function(err, property){
		if(err){
			console.log(err);
		} else {
			Inspection.findById(req.params.inspection_id, function(err, inspection){
				if(err){
					console.log(err);
				} else{ 
					Reception.findById(req.params.reception_id, function(err, reception){
						if(err){
							console.log(err);
						} else {
							res.render("inspections/inspRecepShow", {property: property, inspection: inspection, reception: reception});
							}
					});
				}
			});
		}
	});
});


//Inspection Content: reception = EDIT
router.get("/:inspection_id/reception/:reception_id/edit", middleware.checkInspectionOwnership, function(req, res){
	Property.findById(req.params.id, function(err, property){
		if(err){
			console.log(err);
		} else {
			Inspection.findById(req.params.inspection_id, function(err, inspection){
				if(err){
					console.log(err);
				} else{ 
					Reception.findById(req.params.reception_id, function(err, reception){
						if(err){
							res.redirect("back");
						} else {
							res.render("inspections/inspRecepEdit", {property: property, inspection: inspection, reception: reception});
						}
					});
				}
			});
		}
	});
});

// Inspection Reception UPDATE ROUTE
router.put("/:inspection_id/reception/:reception_id", middleware.checkInspectionOwnership, function(req, res){
			var floor = req.body.floor;var walls = req.body.walls;var infoPack = req.body.infoPack;var wifi = req.body.wifi;var wifiS = req.body.wifiS;var decor = req.body.decor;var lights = req.body.lights;var tv = req.body.tv;var heating = req.body.heating;var aircon = req.body.aircon;var sofa = req.body.sofa;var cushions = req.body.scatterC;var blinds = req.body.blinds;var windows = req.body.windows;var diningTable = req.body.diningT;var diningChairs = req.body.diningC;var balcony = req.body.balcony;var balconyFurniture = req.body.balconyF;var comments = req.body.comments;
			var reception = { floor: floor, walls: walls, infoPack: infoPack, wifi: {comments: wifi, speed: wifiS }, decor: decor, lights: lights, tv: tv, heating: heating, aircon:aircon, sofa:sofa, cushions: cushions, blinds:blinds, windows:windows, diningTable:diningTable, diningChairs:diningChairs, balcony:balcony, balconyFurniture:balconyFurniture, comments: comments};
	Property.findById(req.params.id, function(err, property){
		if(err){
			console.log(err);
			res.redirect("/properties");
		} else {
			Inspection.findById(req.params.inspection_id, function(err, inspection){
				if(err){
					res.redirect("back");
				} else {
					Reception.findByIdAndUpdate(req.params.reception_id, reception, function(err, reception){
						if(err){
							console.log(err);
						} else {
							res.redirect('/properties/' + property._id + '/inspections/' + inspection._id + '/reception/' + reception._id + '/view' );
						}
					});
				}
			});
		}
	});
});

//Inspection Content: Reception - DELETE
router.delete("/:inspection_id/reception/:reception_id", middleware.checkInspectionOwnership, function(req, res){
	Property.findById(req.params.id, function(err, property){
		if(err){
			console.log(err);
		} else {
			Inspection.findById(req.params.inspection_id, function(err, inspection){
				if(err){
					console.log(err);
				} else{
					Reception.findOneAndDelete(req.params.reception_id, function(err){
						if(err){
							res.redirect("back");
						} else {
							res.redirect('/properties/' + property._id + '/inspections/' + inspection._id + '/view');
						}
					});
				}
			});
		}
	});	
});

//======================================================================================================================================================================
//======================================================================================================================================================================
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
//																				KITCHEN ROUTES 																			
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
//======================================================================================================================================================================
//======================================================================================================================================================================

//Inspection Content: Kitchen - NEW
router.get("/:inspection_id/kitchen", middleware.checkInspectionOwnership, function(req, res){
	Property.findById(req.params.id, function(err, property){
		if(err){
			console.log(err);
		} else {
	Inspection.findById(req.params.inspection_id, function(err, inspection){
		if(err){
			console.log(err);
		} else {
			res.render("inspections/inspKitNew", {property: property, inspection: inspection});
		}
	});
		}
	});
});

//Create Inspection Content: Kitchen - CREATE
router.post("/:inspection_id/kitchen", middleware.checkInspectionOwnership, function(req, res){
	Property.findById(req.params.id, function(err, property){
		if(err){
			console.log(err);
			res.redirect("/properties");
		} else {
			Inspection.findById(req.params.inspection_id, function(err, inspection){
		if(err){
			console.log(err);
		} else {
			var smokeAlarm = req.body.smokeAlarm;var floor = req.body.floor;var water = req.body.water;var walls = req.body.walls;var windows = req.body.windows;var lights = req.body.lights;var bin = req.body.bin;var drains = req.body.drains;var sinkPlug = req.body.sinkPlug;var underSink = req.body.underSink;var wasteDisposal = req.body.wasteDisposal;var torch = req.body.torch;var dustpan = req.body.dustpan;var washingMachine = req.body.washingMachine;var microwave = req.body.microwave;var kettle = req.body.kettle;var toaster = req.body.toaster;var cooker = req.body.cooker;var oven = req.body.oven;var extractor = req.body.extractor;var dishwasher = req.body.dishwasher;var dishwasherSalt = req.body.dishwasherSalt;var cabinets = req.body.cabinets;var fridgeFreezer = req.body.fridgeFreezer;var choppingBoard = req.body.choppingBoard;var cutleryTray = req.body.cutleryTray;var knives = req.body.knives;var knivesQ = req.body.knivesQ;var forks = req.body.forks;var forksQ = req.body.forksQ;var spoons = req.body.spoons;var spoonsQ = req.body.spoonsQ;var teaspoons = req.body.teaspoons;var teaspoonsQ = req.body.teaspoonsQ;var cafetiere = req.body.cafetiere;var cafetiereQ = req.body.cafetiereQ;var ovenGlove = req.body.ovenGlove;var knifeBlock = req.body.knifeBlock;var saladBowl = req.body.saladBowl;var dinnerPlates = req.body.dinnerPlates;var dinnerPlatesQ = req.body.dinnerPlatesQ;var sidePlates = req.body.sidePlates;var sidePlatesQ = req.body.sidePlatesQ;var bowls = req.body.bowls;var bowlsQ = req.body.bowlsQ;var mugs = req.body.mugs;var mugsQ = req.body.mugsQ;var glasses = req.body.glasses;var glassesQ = req.body.glassesQ;var wineGlasses = req.body.wineGlasses;var wineGlassesQ = req.body.wineGlassesQ;var corkscrew = req.body.corkscrew;var corkscrewQ = req.body.corkscrewQ;var peeler = req.body.peeler;var peelerQ = req.body.peelerQ;var canOpener = req.body.canOpener;var canOpenerQ = req.body.canOpenerQ;var scissors = req.body.scissors;var scissorsQ = req.body.scissorsQ;var colander = req.body.colander;var colanderQ = req.body.colanderQ;var grater = req.body.grater;var graterQ = req.body.graterQ;var towel = req.body.towel;var towelQ = req.body.towelQ;var utensils = req.body.utensils;var utensilsQ = req.body.utensilsQ;var glassTray = req.body.glassTray;var glassTrayQ = req.body.glassTrayQ;var woodenSpoon = req.body.woodenSpoon;var woodenSpoonQ = req.body.woodenSpoonQ;var fryingPan = req.body.fryingPan;var fryingPanQ = req.body.fryingPanQ;var saucePan = req.body.saucePan;var saucePanQ = req.body.saucePanQ;var dishDrainer = req.body.dishDrainer;var comments = req.body.comments;
			var newKitchen = {smokeAlarm: smokeAlarm, floor: floor, water:water, walls: walls, windows: windows, lights: lights, bin:bin, drains:drains, sinkPlug:sinkPlug, underSink:underSink, wasteDisposal: wasteDisposal, torch:torch, dustpan:dustpan, washingMachine:washingMachine, microwave:microwave, kettle:kettle, toaster:toaster, cooker:cooker, oven:oven, extractor: extractor, dishwasher: dishwasher, dishwasherSalt: dishwasherSalt, cabinets: cabinets, fridgeFreezer:fridgeFreezer, choppingBoard: choppingBoard, cutleryTray:cutleryTray, knives: {comments: knives, quantity: knivesQ }, forks: {comments: forks, quantity: forksQ }, spoons: {comments: spoons, quantity: spoonsQ }, teaspoons: {comments: teaspoons, quantity: teaspoonsQ }, cafetiere: {comments: cafetiere, quantity: cafetiereQ }, ovenGlove: ovenGlove, knifeBlock: knifeBlock, saladBowl: saladBowl, dinnerPlates: {comments: dinnerPlates, quantity: dinnerPlatesQ }, sidePlates: {comments: sidePlates, quantity: sidePlatesQ }, bowls: {comments: bowls, quantity: bowlsQ }, mugs: {comments: mugs, quantity: mugsQ }, glasses: {comments: glasses, quantity: glassesQ }, wineGlasses: {comments: wineGlasses, quantity: wineGlassesQ }, corkscrew: {comments: corkscrew, quantity: corkscrewQ }, peeler: {comments: peeler, quantity: peelerQ }, canOpener: {comments: canOpener, quantity: canOpenerQ }, scissors: {comments: scissors, quantity: scissorsQ }, colander: {comments: colander, quantity: colanderQ }, grater: {comments: grater, quantity: graterQ }, towel: {comments: towel, quantity: towelQ }, utensils: {comments: utensils, quantity: utensilsQ }, glassTray: {comments: glassTray, quantity: glassTrayQ }, woodenSpoon: {comments: woodenSpoon, quantity: woodenSpoonQ }, fryingPan: {comments: fryingPan, quantity: fryingPanQ }, saucePan: {comments: saucePan, quantity: saucePanQ }, dishDrainer:dishDrainer, comments: comments};
			
		Kitchen.create(newKitchen, function(err, newKitchen){
				if(err){
					console.log(err);
				} else {
					newKitchen.author.id = req.user._id;
				  	newKitchen.author.username = req.user.username;
					//save entrance to inspection
					newKitchen.save();
					inspection.kitchen.push(newKitchen);
					inspection.save();
					console.log(newKitchen);
					res.redirect('/properties/' + property._id + '/inspections/' + inspection._id + '/view');
				}
			});
		}
	});
		}
});
});

//Inspection Content: Kitchen - SHOW
router.get("/:inspection_id/kitchen/:kitchen_id/view", middleware.isLoggedIn, function(req, res){
	Property.findById(req.params.id, function(err, property){
		if(err){
			console.log(err);
		} else {
			Inspection.findById(req.params.inspection_id, function(err, inspection){
				if(err){
					console.log(err);
				} else{ 
					Kitchen.findById(req.params.kitchen_id, function(err, kitchen){
						if(err){
							console.log(err);
						} else {
							res.render("inspections/inspKitShow", {property: property, inspection: inspection, kitchen: kitchen});
							}
					});
				}
			});
		}
	});
});


//Inspection Content: reception = EDIT
router.get("/:inspection_id/kitchen/:kitchen_id/edit", middleware.checkInspectionOwnership, function(req, res){
	Property.findById(req.params.id, function(err, property){
		if(err){
			console.log(err);
		} else {
			Inspection.findById(req.params.inspection_id, function(err, inspection){
				if(err){
					console.log(err);
				} else{ 
					Kitchen.findById(req.params.kitchen_id, function(err, kitchen){
						if(err){
							res.redirect("back");
						} else {
							res.render("inspections/inspKitEdit", {property: property, inspection: inspection, kitchen: kitchen});
						}
					});
				}
			});
		}
	});
});

// Inspection Reception UPDATE ROUTE
router.put("/:inspection_id/kitchen/:kitchen_id", middleware.checkInspectionOwnership, function(req, res){
			var smokeAlarm = req.body.smokeAlarm;var floor = req.body.floor;var water = req.body.water;var walls = req.body.walls;var windows = req.body.windows;var lights = req.body.lights;var bin = req.body.bin;var drains = req.body.drains;var sinkPlug = req.body.sinkPlug;var underSink = req.body.underSink;var wasteDisposal = req.body.wasteDisposal;var torch = req.body.torch;var dustpan = req.body.dustpan;var washingMachine = req.body.washingMachine;var microwave = req.body.microwave;var kettle = req.body.kettle;var toaster = req.body.toaster;var cooker = req.body.cooker;var oven = req.body.oven;var extractor = req.body.extractor;var dishwasher = req.body.dishwasher;var dishwasherSalt = req.body.dishwasherSalt;var cabinets = req.body.cabinets;var fridgeFreezer = req.body.fridgeFreezer;var choppingBoard = req.body.choppingBoard;var cutleryTray = req.body.cutleryTray;var knives = req.body.knives;var knivesQ = req.body.knivesQ;var forks = req.body.forks;var forksQ = req.body.forksQ;var spoons = req.body.spoons;var spoonsQ = req.body.spoonsQ;var teaspoons = req.body.teaspoons;var teaspoonsQ = req.body.teaspoonsQ;var cafetiere = req.body.cafetiere;var cafetiereQ = req.body.cafetiereQ;var ovenGlove = req.body.ovenGlove;var knifeBlock = req.body.knifeBlock;var saladBowl = req.body.saladBowl;var dinnerPlates = req.body.dinnerPlates;var dinnerPlatesQ = req.body.dinnerPlatesQ;var sidePlates = req.body.sidePlates;var sidePlatesQ = req.body.sidePlatesQ;var bowls = req.body.bowls;var bowlsQ = req.body.bowlsQ;var mugs = req.body.mugs;var mugsQ = req.body.mugsQ;var glasses = req.body.glasses;var glassesQ = req.body.glassesQ;var wineGlasses = req.body.wineGlasses;var wineGlassesQ = req.body.wineGlassesQ;var corkscrew = req.body.corkscrew;var corkscrewQ = req.body.corkscrewQ;var peeler = req.body.peeler;var peelerQ = req.body.peelerQ;var canOpener = req.body.canOpener;var canOpenerQ = req.body.canOpenerQ;var scissors = req.body.scissors;var scissorsQ = req.body.scissorsQ;var colander = req.body.colander;var colanderQ = req.body.colanderQ;var grater = req.body.grater;var graterQ = req.body.graterQ;var towel = req.body.towel;var towelQ = req.body.towelQ;var utensils = req.body.utensils;var utensilsQ = req.body.utensilsQ;var glassTray = req.body.glassTray;var glassTrayQ = req.body.glassTrayQ;var woodenSpoon = req.body.woodenSpoon;var woodenSpoonQ = req.body.woodenSpoonQ;var fryingPan = req.body.fryingPan;var fryingPanQ = req.body.fryingPanQ;var saucePan = req.body.saucePan;var saucePanQ = req.body.saucePanQ;var dishDrainer = req.body.dishDrainer;var comments = req.body.comments;
			var kitchen = {smokeAlarm: smokeAlarm, floor: floor, water:water, walls: walls, windows: windows, lights: lights, bin:bin, drains:drains, sinkPlug:sinkPlug, underSink:underSink, wasteDisposal: wasteDisposal, torch:torch, dustpan:dustpan, washingMachine:washingMachine, microwave:microwave, kettle:kettle, toaster:toaster, cooker:cooker, oven:oven, extractor: extractor, dishwasher: dishwasher, dishwasherSalt: dishwasherSalt, cabinets: cabinets, fridgeFreezer:fridgeFreezer, choppingBoard: choppingBoard, cutleryTray:cutleryTray, knives: {comments: knives, quantity: knivesQ }, forks: {comments: forks, quantity: forksQ }, spoons: {comments: spoons, quantity: spoonsQ }, teaspoons: {comments: teaspoons, quantity: teaspoonsQ }, cafetiere: {comments: cafetiere, quantity: cafetiereQ }, ovenGlove: ovenGlove, knifeBlock: knifeBlock, saladBowl: saladBowl, dinnerPlates: {comments: dinnerPlates, quantity: dinnerPlatesQ }, sidePlates: {comments: sidePlates, quantity: sidePlatesQ }, bowls: {comments: bowls, quantity: bowlsQ }, mugs: {comments: mugs, quantity: mugsQ }, glasses: {comments: glasses, quantity: glassesQ }, wineGlasses: {comments: wineGlasses, quantity: wineGlassesQ }, corkscrew: {comments: corkscrew, quantity: corkscrewQ }, peeler: {comments: peeler, quantity: peelerQ }, canOpener: {comments: canOpener, quantity: canOpenerQ }, scissors: {comments: scissors, quantity: scissorsQ }, colander: {comments: colander, quantity: colanderQ }, grater: {comments: grater, quantity: graterQ }, towel: {comments: towel, quantity: towelQ }, utensils: {comments: utensils, quantity: utensilsQ }, glassTray: {comments: glassTray, quantity: glassTrayQ }, woodenSpoon: {comments: woodenSpoon, quantity: woodenSpoonQ }, fryingPan: {comments: fryingPan, quantity: fryingPanQ }, saucePan: {comments: saucePan, quantity: saucePanQ }, dishDrainer:dishDrainer, comments: comments};
	Property.findById(req.params.id, function(err, property){
		if(err){
			console.log(err);
			res.redirect("/properties");
		} else {
			Inspection.findById(req.params.inspection_id, function(err, inspection){
				if(err){
					res.redirect("back");
				} else {
					Kitchen.findByIdAndUpdate(req.params.kitchen_id, kitchen, function(err, kitchen){
						if(err){
							console.log(err);
						} else {
							res.redirect('/properties/' + property._id + '/inspections/' + inspection._id + '/kitchen/' + kitchen._id + '/view' );
						}
					});
				}
			});
		}
	});
});

//Inspection Content: kitchen - DELETE
router.delete("/:inspection_id/kitchen/:kitchen_id", middleware.checkInspectionOwnership, function(req, res){
	Property.findById(req.params.id, function(err, property){
		if(err){
			console.log(err);
		} else {
			Inspection.findById(req.params.inspection_id, function(err, inspection){
				if(err){
					console.log(err);
				} else{
					Kitchen.findOneAndDelete(req.params.kitchen_id, function(err){
						if(err){
							res.redirect("back");
						} else {
							res.redirect('/properties/' + property._id + '/inspections/' + inspection._id + '/view');
						}
					});
				}
			});
		}
	});	
});

//======================================================================================================================================================================
//======================================================================================================================================================================
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
//																				BOILER ROOM ROUTES 																			
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
//======================================================================================================================================================================
//======================================================================================================================================================================

//Inspection Content: Storage - NEW
router.get("/:inspection_id/storage", middleware.checkInspectionOwnership, function(req, res){
	Property.findById(req.params.id, function(err, property){
		if(err){
			console.log(err);
		} else {
	Inspection.findById(req.params.inspection_id, function(err, inspection){
		if(err){
			console.log(err);
		} else {
			res.render("inspections/inspStorNew", {property: property, inspection: inspection});
		}
	});
		}
	});
});

//Create Inspection Content: Storage - CREATE
router.post("/:inspection_id/storage", middleware.checkInspectionOwnership, function(req, res){
	Property.findById(req.params.id, function(err, property){
		if(err){
			console.log(err);
			res.redirect("/properties");
		} else {
			Inspection.findById(req.params.inspection_id, function(err, inspection){
		if(err){
			console.log(err);
		} else {
			var rcdBoard = req.body.rcdBoard;var iron = req.body.iron;var ironingBoard = req.body.ironingBoard;var fan = req.body.fan;var heater = req.body.heater;var mopBucket = req.body.mopBucket;var broom = req.body.broom;var vacuum = req.body.vacuum;var clothesAirer = req.body.clothesAirer;var comment = req.body.comment;
			var newStorage = { rcdBoard:rcdBoard, iron:iron, ironingBoard:ironingBoard, fan:fan, heater:heater, mopBucket:mopBucket, broom:broom, vacuum:vacuum, clothesAirer:clothesAirer, comments: comment};
			
		Storage.create(newStorage, function(err, newStorage){
				if(err){
					console.log(err);
				} else {
					//add username and id to comment
				  	newStorage.author.id = req.user._id;
				  	newStorage.author.username = req.user.username;
					//save entrance to inspection
					newStorage.save();
					inspection.storage.push(newStorage);
					inspection.save();
					console.log(newStorage);
					res.redirect('/properties/' + property._id + '/inspections/' + inspection._id + '/view');
				}
			});
		}
	});
		}
});
});

//Inspection Content: Storage - SHOW
router.get("/:inspection_id/storage/:storage_id/view", middleware.isLoggedIn, function(req, res){
	Property.findById(req.params.id, function(err, property){
		if(err){
			console.log(err);
		} else {
	Inspection.findById(req.params.inspection_id, function(err, inspection){
		if(err){
			console.log(err);
		} else{ 
	Storage.findById(req.params.storage_id, function(err, storage){
		if(err){
			console.log(err);
		} else {
			res.render("inspections/inspStorShow", {property: property, inspection: inspection, storage: storage});
			}
	});
		}
	});
		}
	});
});

//Inspection Content: Storage - DELETE
router.delete("/:inspection_id/storage/:storage_id", middleware.checkInspectionOwnership, function(req, res){
	Property.findById(req.params.id, function(err, property){
		if(err){
			console.log(err);
		} else {
			Inspection.findById(req.params.inspection_id, function(err, inspection){
				if(err){
					console.log(err);
				} else{
					Storage.findOneAndDelete(req.params.storage_id, function(err){
						if(err){
							res.redirect("back");
						} else {
							res.redirect('/properties/' + property._id + '/inspections/' + inspection._id + '/view');
						}
					});
				}
			});
		}
	});	
});

//Inspection Content: Storage - EDIT
router.get("/:inspection_id/storage/:storage_id/edit", middleware.checkInspectionOwnership, function(req, res){
	Property.findById(req.params.id, function(err, property){
		if(err){
			console.log(err);
		} else {
			Inspection.findById(req.params.inspection_id, function(err, inspection){
				if(err){
					console.log(err);
				} else{ 
					Storage.findById(req.params.storage_id, function(err, foundStor){
						if(err){
							res.redirect("back");
						} else {
							res.render("inspections/inspStorEdit", {property: property, inspection: inspection, storage: foundStor});
						}
					});
				}
			});
		}
	});
});

// Inspection Storage UPDATE ROUTE
router.put("/:inspection_id/storage/:storage_id", middleware.checkInspectionOwnership, function(req, res){
			var rcdBoard = req.body.rcdBoard;var iron = req.body.iron;var ironingBoard = req.body.ironingBoard;var fan = req.body.fan;var heater = req.body.heater;var mopBucket = req.body.mopBucket;var broom = req.body.broom;var vacuum = req.body.vacuum;var clothesAirer = req.body.clothesAirer;var comment = req.body.comment;
			var storage = { rcdBoard:rcdBoard, iron:iron, ironingBoard:ironingBoard, fan:fan, heater:heater, mopBucket:mopBucket, broom:broom, vacuum:vacuum, clothesAirer:clothesAirer, comments: comment};
	Property.findById(req.params.id, function(err, property){
		if(err){
			console.log(err);
			res.redirect("/properties");
		} else {
			Inspection.findById(req.params.inspection_id, function(err, inspection){
				if(err){
					res.redirect("back");
				} else {
					Storage.findByIdAndUpdate(req.params.storage_id, storage, function(err, storage){
						if(err){
							console.log(err);
						} else {
							res.redirect('/properties/' + property._id + '/inspections/' + inspection._id + '/storage/' + storage._id + '/view' );
						}
					});
				}
			});
		}
	});
});

//======================================================================================================================================================================
//======================================================================================================================================================================
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
//																				BEDROOM ROUTES 																			
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
//======================================================================================================================================================================
//======================================================================================================================================================================

//Inspection Content: Bedroom - NEW
router.get("/:inspection_id/bedroom", middleware.checkInspectionOwnership, function(req, res){
	Property.findById(req.params.id, function(err, property){
		if(err){
			console.log(err);
		} else {
	Inspection.findById(req.params.inspection_id, function(err, inspection){
		if(err){
			console.log(err);
		} else {
			res.render("inspections/inspBedNew", {property: property, inspection: inspection});
		}
	});
		}
	});
});

//Create Inspection Content: Bedroom - CREATE
router.post("/:inspection_id/bedroom", middleware.checkInspectionOwnership, function(req, res){
	Property.findById(req.params.id, function(err, property){
		if(err){
			console.log(err);
			res.redirect("/properties");
		} else {
			Inspection.findById(req.params.inspection_id, function(err, inspection){
		if(err){
			console.log(err);
		} else {
			var title = req.body.title;var floor = req.body.floor;var walls = req.body.walls;var lights = req.body.lights;var blinds = req.body.blinds;var windows = req.body.windows;var pillows = req.body.pillows;var pillowsQ = req.body.pillowsQ;var duvet = req.body.duvet;var duvetQ = req.body.duvetQ;var linen = req.body.linen;var towels = req.body.towels;var towelsQ = req.body.towelsQ;var lamps = req.body.lamps;var lampsQ = req.body.lampsQ;var bedThrow = req.body.bedThrow;var bedThrowQ = req.body.bedThrowQ;var cushions = req.body.cushions;var cushionsQ = req.body.cushionsQ;var bedsideChests = req.body.bedsideChests;var bedsideChestsQ = req.body.bedsideChestsQ;var chest = req.body.chest;var wardrobe = req.body.wardrobe;var underBed = req.body.underBed;var hangers = req.body.hangers;var hangersQ = req.body.hangersQ;var decorations = req.body.decorations;var hairdryer = req.body.hairdryer;var multiplug = req.body.multiplug;var mirror = req.body.mirror;var comment = req.body.comment;
			var newBedroom = {title:title, floor:floor, walls:walls, lights:lights, blinds:blinds, windows:windows, pillows:{comments: pillows, quantity: pillowsQ}, duvet:{comments: duvet, quantity: duvetQ}, linen:linen, towels:{comments: towels, quantity: towelsQ}, lamps:{comments: lamps, quantity: lampsQ}, bedThrow:{comments: bedThrow, quantity: bedThrowQ}, cushions:{comments: cushions, quantity: cushionsQ}, bedsideChests:{comments: bedsideChests, quantity: bedsideChestsQ}, chest:chest, wardrobe:wardrobe, underBed:underBed, hangers:{comments: hangers, quantity: hangersQ}, decorations:decorations, hairdryer:hairdryer, multiplug:multiplug, mirror:mirror, comments: comment};
			
		Bedroom.create(newBedroom, function(err, newBedroom){
				if(err){
					console.log(err);
				} else {
					//add username and id to comment
				  	newBedroom.author.id = req.user._id;
				  	newBedroom.author.username = req.user.username;
					//save entrance to inspection
					newBedroom.save();
					inspection.bedroom.push(newBedroom);
					inspection.save();
					console.log(newBedroom);
					res.redirect('/properties/' + property._id + '/inspections/' + inspection._id + '/view');
				}
			});
		}
	});
		}
});
});

//Inspection Content: Bedroom - SHOW
router.get("/:inspection_id/bedroom/:bedroom_id/view", middleware.isLoggedIn, function(req, res){
	Property.findById(req.params.id, function(err, property){
		if(err){
			console.log(err);
		} else {
	Inspection.findById(req.params.inspection_id, function(err, inspection){
		if(err){
			console.log(err);
		} else{ 
	Bedroom.findById(req.params.bedroom_id, function(err, bedroom){
		if(err){
			console.log(err);
		} else {
			res.render("inspections/inspBedShow", {property: property, inspection: inspection, bedroom: bedroom});
			}
	});
		}
	});
		}
	});
});

//Inspection Content: Bedroom - DELETE
router.delete("/:inspection_id/bedroom/:bedroom_id", middleware.checkInspectionOwnership, function(req, res){
	Property.findById(req.params.id, function(err, property){
		if(err){
			console.log(err);
		} else {
			Inspection.findById(req.params.inspection_id, function(err, inspection){
				if(err){
					console.log(err);
				} else{
					Bedroom.findOneAndDelete(req.params.bedroom_id, function(err){
						if(err){
							res.redirect("back");
						} else {
							res.redirect('/properties/' + property._id + '/inspections/' + inspection._id + '/view');
						}
					});
				}
			});
		}
	});	
});

//Inspection Content: Bedroom - EDIT
router.get("/:inspection_id/bedroom/:bedroom_id/edit", middleware.checkInspectionOwnership, function(req, res){
	Property.findById(req.params.id, function(err, property){
		if(err){
			console.log(err);
		} else {
			Inspection.findById(req.params.inspection_id, function(err, inspection){
				if(err){
					console.log(err);
				} else{ 
					Bedroom.findById(req.params.bedroom_id, function(err, foundBed){
						if(err){
							res.redirect("back");
						} else {
							res.render("inspections/inspBedEdit", {property: property, inspection: inspection, bedroom: foundBed});
						}
					});
				}
			});
		}
	});
});

// Inspection Bedroom UPDATE ROUTE
router.put("/:inspection_id/bedroom/:bedroom_id", middleware.checkInspectionOwnership, function(req, res){
			var title = req.body.title;var floor = req.body.floor;var walls = req.body.walls;var lights = req.body.lights;var blinds = req.body.blinds;var windows = req.body.windows;var pillows = req.body.pillows;var pillowsQ = req.body.pillowsQ;var duvet = req.body.duvet;var duvetQ = req.body.duvetQ;var linen = req.body.linen;var towels = req.body.towels;var towelsQ = req.body.towelsQ;var lamps = req.body.lamps;var lampsQ = req.body.lampsQ;var bedThrow = req.body.bedThrow;var bedThrowQ = req.body.bedThrowQ;var cushions = req.body.cushions;var cushionsQ = req.body.cushionsQ;var bedsideChests = req.body.bedsideChests;var bedsideChestsQ = req.body.bedsideChestsQ;var chest = req.body.chest;var wardrobe = req.body.wardrobe;var underBed = req.body.underBed;var hangers = req.body.hangers;var hangersQ = req.body.hangersQ;var decorations = req.body.decorations;var hairdryer = req.body.hairdryer;var multiplug = req.body.multiplug;var mirror = req.body.mirror;var comment = req.body.comment;
			var bedroom = {title:title, floor:floor, walls:walls, lights:lights, blinds:blinds, windows:windows, pillows:{comments: pillows, quantity: pillowsQ}, duvet:{comments: duvet, quantity: duvetQ}, linen:linen, towels:{comments: towels, quantity: towelsQ}, lamps:{comments: lamps, quantity: lampsQ}, bedThrow:{comments: bedThrow, quantity: bedThrowQ}, cushions:{comments: cushions, quantity: cushionsQ}, bedsideChests:{comments: bedsideChests, quantity: bedsideChestsQ}, chest:chest, wardrobe:wardrobe, underBed:underBed, hangers:{comments: hangers, quantity: hangersQ}, decorations:decorations, hairdryer:hairdryer, multiplug:multiplug, mirror:mirror, comments: comment};
	Property.findById(req.params.id, function(err, property){
		if(err){
			console.log(err);
			res.redirect("/properties");
		} else {
			Inspection.findById(req.params.inspection_id, function(err, inspection){
				if(err){
					res.redirect("back");
				} else {
					Bedroom.findByIdAndUpdate(req.params.bedroom_id, bedroom, function(err, bedroom){
						if(err){
							console.log(err);
						} else {
							res.redirect('/properties/' + property._id + '/inspections/' + inspection._id + '/bedroom/' + bedroom._id + '/view' );
						}
					});
				}
			});
		}
	});
});

//======================================================================================================================================================================
//======================================================================================================================================================================
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
//																				BATHROOM ROUTES 																			
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
//======================================================================================================================================================================
//======================================================================================================================================================================

//Inspection Content: Bathroom - NEW
router.get("/:inspection_id/bathroom", middleware.checkInspectionOwnership, function(req, res){
	Property.findById(req.params.id, function(err, property){
		if(err){
			console.log(err);
		} else {
	Inspection.findById(req.params.inspection_id, function(err, inspection){
		if(err){
			console.log(err);
		} else {
			res.render("inspections/inspBathNew", {property: property, inspection: inspection});
		}
	});
		}
	});
});

//Create Inspection Content: Bathroom - CREATE
router.post("/:inspection_id/bathroom", middleware.checkInspectionOwnership, function(req, res){
	Property.findById(req.params.id, function(err, property){
		if(err){
			console.log(err);
			res.redirect("/properties");
		} else {
			Inspection.findById(req.params.inspection_id, function(err, inspection){
		if(err){
			console.log(err);
		} else {
			var floor = req.body.floor;var walls = req.body.walls;var bowl = req.body.bowl;var seat = req.body.seat;var flush = req.body.flush;var bathShower = req.body.bathShower;var showerHead = req.body.showerHead;var sealant = req.body.sealant;var lights = req.body.lights;var water = req.body.water;var drains = req.body.drains;var toiletPaperHolder = req.body.toiletPaperHolder;var toiletBrush = req.body.toiletBrush;var toiletries = req.body.toiletries;var bin = req.body.bin;var bathmat = req.body.bathmat;var mirror = req.body.mirror;var comments = req.body.comments;
			var newBathroom = {floor:floor, walls:walls, toilet: {bowl:bowl, seat:seat, flush:flush }, bathShower:bathShower, showerHead:showerHead, sealant:sealant, lights:lights, water:water, drains:drains, toiletPaperHolder:toiletPaperHolder, toiletBrush:toiletBrush, toiletries: toiletries, bin:bin, bathmat:bathmat, mirror:mirror, comments:comments};
			
		Bathroom.create(newBathroom, function(err, newBathroom){
				if(err){
					console.log(err);
				} else {
					//add username and id to comment
				  	newBathroom.author.id = req.user._id;
				  	newBathroom.author.username = req.user.username;
					//save entrance to inspection
					newBathroom.save();
					inspection.bathroom.push(newBathroom);
					inspection.save();
					console.log(newBathroom);
					res.redirect('/properties/' + property._id + '/inspections/' + inspection._id + '/view');
				}
			});
		}
	});
		}
});
});

//Inspection Content: Bathroom - SHOW
router.get("/:inspection_id/bathroom/:bathroom_id/view", middleware.isLoggedIn, function(req, res){
	Property.findById(req.params.id, function(err, property){
		if(err){
			console.log(err);
		} else {
	Inspection.findById(req.params.inspection_id, function(err, inspection){
		if(err){
			console.log(err);
		} else{ 
	Bathroom.findById(req.params.bathroom_id, function(err, bathroom){
		if(err){
			console.log(err);
		} else {
			res.render("inspections/inspBathShow", {property: property, inspection: inspection, bathroom: bathroom});
			}
	});
		}
	});
		}
	});
});

//Inspection Content: Bathroom - DELETE
router.delete("/:inspection_id/bathroom/:bathroom_id", middleware.checkInspectionOwnership, function(req, res){
	Property.findById(req.params.id, function(err, property){
		if(err){
			console.log(err);
		} else {
			Inspection.findById(req.params.inspection_id, function(err, inspection){
				if(err){
					console.log(err);
				} else{
					Bathroom.findOneAndDelete(req.params.bathroom_id, function(err){
						if(err){
							res.redirect("back");
						} else {
							res.redirect('/properties/' + property._id + '/inspections/' + inspection._id + '/view');
						}
					});
				}
			});
		}
	});	
});

//Inspection Content: Bathroom - EDIT
router.get("/:inspection_id/bathroom/:bathroom_id/edit", middleware.checkInspectionOwnership, function(req, res){
	Property.findById(req.params.id, function(err, property){
		if(err){
			console.log(err);
		} else {
			Inspection.findById(req.params.inspection_id, function(err, inspection){
				if(err){
					console.log(err);
				} else{ 
					Bathroom.findById(req.params.bathroom_id, function(err, foundBath){
						if(err){
							res.redirect("back");
						} else {
							res.render("inspections/inspBathEdit", {property: property, inspection: inspection, bathroom: foundBath});
						}
					});
				}
			});
		}
	});
});

// Inspection Bedroom UPDATE ROUTE
router.put("/:inspection_id/bathroom/:bathroom_id", middleware.checkInspectionOwnership, function(req, res){
			var floor = req.body.floor;var walls = req.body.walls;var bowl = req.body.bowl;var seat = req.body.seat;var flush = req.body.flush;var bathShower = req.body.bathShower;var showerHead = req.body.showerHead;var sealant = req.body.sealant;var lights = req.body.lights;var water = req.body.water;var drains = req.body.drains;var toiletPaperHolder = req.body.toiletPaperHolder;var toiletBrush = req.body.toiletBrush;var toiletries = req.body.toiletries;var bin = req.body.bin;var bathmat = req.body.bathmat;var mirror = req.body.mirror;var comments = req.body.comments;
			var bathroom = {floor:floor, walls:walls, toilet: {bowl:bowl, seat:seat, flush:flush }, bathShower:bathShower, showerHead:showerHead, sealant:sealant, lights:lights, water:water, drains:drains, toiletPaperHolder:toiletPaperHolder, toiletBrush:toiletBrush, toiletries: toiletries, bin:bin, bathmat:bathmat, mirror:mirror, comments:comments};
			Property.findById(req.params.id, function(err, property){
		if(err){
			console.log(err);
			res.redirect("/properties");
		} else {
			Inspection.findById(req.params.inspection_id, function(err, inspection){
				if(err){
					res.redirect("back");
				} else {
					Bathroom.findByIdAndUpdate(req.params.bathroom_id, bathroom, function(err, bathroom){
						if(err){
							console.log(err);
						} else {
							res.redirect('/properties/' + property._id + '/inspections/' + inspection._id + '/bathroom/' + bathroom._id + '/view' );
						}
					});
				}
			});
		}
	});
});

//======================================================================================================================================================================
//======================================================================================================================================================================
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
//																				ADDITIONAL / EXTRAS ROUTES 																			
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
//======================================================================================================================================================================
//======================================================================================================================================================================

//Inspection Content: Additional / Extra - NEW
router.get("/:inspection_id/extra", middleware.checkInspectionOwnership, function(req, res){
	Property.findById(req.params.id, function(err, property){
		if(err){
			console.log(err);
		} else {
	Inspection.findById(req.params.inspection_id, function(err, inspection){
		if(err){
			console.log(err);
		} else {
			res.render("inspections/inspExtraNew", {property: property, inspection: inspection});
		}
	});
		}
	});
});

//Create Inspection Content: Extra - CREATE
router.post("/:inspection_id/extra", middleware.checkInspectionOwnership, function(req, res){
	Property.findById(req.params.id, function(err, property){
		if(err){
			console.log(err);
			res.redirect("/properties");
		} else {
			Inspection.findById(req.params.inspection_id, function(err, inspection){
		if(err){
			console.log(err);
		} else {
			var babycot = req.body.babycot;var extraBed = req.body.extraBed;var welcomeBasket = req.body.welcomeBasket;var comments = req.body.comments;
			var newExtra = {babycot:babycot, extraBed:extraBed, welcomeBasket:welcomeBasket, comments:comments};
			
		Extra.create(newExtra, function(err, newExtra){
				if(err){
					console.log(err);
				} else {
					//add username and id to comment
				  	newExtra.author.id = req.user._id;
				  	newExtra.author.username = req.user.username;
					//save entrance to inspection
					newExtra.save();
					inspection.extra.push(newExtra);
					inspection.save();
					console.log(newExtra);
					res.redirect('/properties/' + property._id + '/inspections/' + inspection._id + '/view');
				}
			});
		}
	});
		}
});
});

//Inspection Content: Extra - SHOW
router.get("/:inspection_id/extra/:extra_id/view", middleware.isLoggedIn, function(req, res){
	Property.findById(req.params.id, function(err, property){
		if(err){
			console.log(err);
		} else {
	Inspection.findById(req.params.inspection_id, function(err, inspection){
		if(err){
			console.log(err);
		} else{ 
	Extra.findById(req.params.extra_id, function(err, extra){
		if(err){
			console.log(err);
		} else {
			res.render("inspections/inspExtraShow", {property: property, inspection: inspection, extra: extra});
			}
	});
		}
	});
		}
	});
});

//Inspection Content: Extra - DELETE
router.delete("/:inspection_id/extra/:extra_id", middleware.checkInspectionOwnership, function(req, res){
	Property.findById(req.params.id, function(err, property){
		if(err){
			console.log(err);
		} else {
			Inspection.findById(req.params.inspection_id, function(err, inspection){
				if(err){
					console.log(err);
				} else{
					Extra.findOneAndDelete(req.params.extra_id, function(err){
						if(err){
							res.redirect("back");
						} else {
							res.redirect('/properties/' + property._id + '/inspections/' + inspection._id + '/view');
						}
					});
				}
			});
		}
	});	
});

//Inspection Content: extra - EDIT
router.get("/:inspection_id/extra/:extra_id/edit", middleware.checkInspectionOwnership, function(req, res){
	Property.findById(req.params.id, function(err, property){
		if(err){
			console.log(err);
		} else {
			Inspection.findById(req.params.inspection_id, function(err, inspection){
				if(err){
					console.log(err);
				} else{ 
					Extra.findById(req.params.extra_id, function(err, foundExtra){
						if(err){
							res.redirect("back");
						} else {
							res.render("inspections/inspExtraEdit", {property: property, inspection: inspection, extra: foundExtra});
						}
					});
				}
			});
		}
	});
});

// Inspection Extra UPDATE ROUTE
router.put("/:inspection_id/extra/:extra_id", middleware.checkInspectionOwnership, function(req, res){
			var babycot = req.body.babycot;var extraBed = req.body.extraBed;var welcomeBasket = req.body.welcomeBasket;var comments = req.body.comments;
			var extra = {babycot:babycot, extraBed:extraBed, welcomeBasket:welcomeBasket, comments:comments};
			Property.findById(req.params.id, function(err, property){
		if(err){
			console.log(err);
			res.redirect("/properties");
		} else {
			Inspection.findById(req.params.inspection_id, function(err, inspection){
				if(err){
					res.redirect("back");
				} else {
					Extra.findByIdAndUpdate(req.params.extra_id, extra, function(err, extra){
						if(err){
							console.log(err);
						} else {
							res.redirect('/properties/' + property._id + '/inspections/' + inspection._id + '/extra/' + extra._id + '/view' );
						}
					});
				}
			});
		}
	});
});

module.exports = router;