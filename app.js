var express                 = require("express"), //Magic
    app                     = express(), //Magic
	flash					= require("connect-flash"), //Flash Messages
    bodyParser              = require("body-parser"), //Intent Obatin
    mongoose                = require("mongoose"), //Database
    passport                = require("passport"), //Authentication
    LocalStrategy           = require("passport-local"), //Authentication
	methodOverride			= require("method-override"),
    Property                = require("./models/property"), // Property Schema Setup
	User					= require("./models/user"), // User Schema Setup
	Extra					= require("./models/extra"),
	Bathroom				= require("./models/bathroom"), //Bathroom Schema Setup
	Bedroom 				= require("./models/bedroom"), // Bedroom Schema Setup
	Storage					= require("./models/storage"), //Storage Schema Setup
	Kitchen					= require("./models/kitchen"), // Kitchen Schema Setup
	Reception				= require("./models/reception"), //Reception Schema
	Entrance				= require("./models/entrance"), // Entrance Schema
	Inspections				= require("./models/inspection");  //Inspections Schema Setup
	

var indexRoutes				= require("./routes/index");
var propertyRoutes 			= require("./routes/properties");
var inspectionRoutes		= require("./routes/inspections");
var cleaningRoutes			= require("./routes/cleaning");
// Inspection Sub Routes



mongoose.connect("mongodb+srv://johnarcher965:London2019@cluster0-kfjqs.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true});

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
// app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());


// PASSPORT CONFIG
app.use(require("express-session")({
    secret: "I do like to enjoy Sprite lemonade!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
    next();
});


//Routes Config
app.use("/", indexRoutes);
app.use("/properties", propertyRoutes);
app.use("/properties/:id/inspections", inspectionRoutes);
app.use("/properties/:id/cleaning", cleaningRoutes);


app.listen(3000, function(){
    console.log("The Properties Server Has Started!");
});
