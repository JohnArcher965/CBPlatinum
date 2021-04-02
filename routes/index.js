var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//Index Route

router.get("/", function(req, res){
	res.render("landing");
});

//Auth Routes

//Show Register Page
router.get("/register", function(req, res){
	res.render("register");
});

//Handle Sign up Logic
router.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	if(req.body.adminCode === 'CBPlat2019') {
		newUser.isAdmin = true;
	}
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			req.flash("error", err.message);
			return res.render("register");
		}
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Welcome to CB Platinum " + user.username);
			res.redirect("/properties");
		});
	});
});

//Login Form
router.get("/login", function(req, res){
	res.render("login");
});

//Handling Login Logic
router.post("/login", passport.authenticate("local", 
										   {
	successRedirect:"/properties",
	failureRedirect:"/login"
}), function(req, res){

});
//Log Out Route
router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "Logged You Out");
	res.redirect("/");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


module.exports = router;