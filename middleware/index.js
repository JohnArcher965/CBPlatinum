//all middleware goes here
var Property = require("../models/property");
var Inspection = require("../models/inspection");
var middlewareObj = {};


middlewareObj.checkPropertyOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		Property.findById(req.params.id, function(err, foundProperty){
				if(err){
					res.redirect("back");
				} else {
					//does user own property
					if(foundProperty.author.id.equals(req.user._id) || req.user.isAdmin){
						next();
					} else {
						res.redirect("back");
					}
					
				}
			});
	} else {
		res.redirect("back");
	}
};

middlewareObj.checkInspectionOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		Inspection.findById(req.params.inspection_id, function(err, foundInspection){
				if(err){
					res.redirect("back");
				} else {
					//does user own inspection
					if(foundInspection.author.id.equals(req.user._id) || req.user.isAdmin){
						next();
					} else {
						req.flash("error", "You don't have permission to do that");
						res.redirect("back");
					}
					
				}
			});
	} else {
		req.flash("error", "You need to be logged in!");
		res.redirect("/login");
	}
};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
	req.flash("error", "You need to be logged in to do that!");
	res.redirect("/login");
};

module.exports = middlewareObj;