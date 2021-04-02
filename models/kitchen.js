var mongoose = require("mongoose");

var kitchenSchema = new mongoose.Schema({
		smokeAlarm: String,
		floor: String,
		water: String,
		walls: String,
		windows: String,
		lights: String,
		bin: String,
		drains: String,
		sinkPlug: String,
		underSink: String,
		wasteDisposal: String,
		torch: String,
		dustpan: String,
		washingMachine: String,
		microwave: String,
		kettle: String,
		toaster: String,
		cooker: String,
		oven: String,
		extractor: String,
		dishwasher: String,
		dishwasherSalt: String,
		cabinets: String,
		fridgeFreezer: String,
		choppingBoard: String,
		cutleryTray: String,
		knives: {
			comments: String,
			quantity: Number
		},
		forks: {
			quantity: Number,
			comments: String
		},
		spoons: {
			quantity: Number,
			comments: String
		},
		teaspoons: {
			quantity: Number,
			comments: String
		},
		cafetiere: {
			quantity: Number,
			comments: String
		},
		ovenGlove: String,
		knifeBlock: String,
		saladBowl: String,
		dinnerPlates: {
			quantity: Number,
			comments: String
		},
		sidePlates: {
			quantity: Number,
			comments: String
		},
		bowls: {
			quantity: Number,
			comments: String
		},
		mugs: {
			quantity: Number,
			comments: String
		},
		glasses: {
			quantity: Number,
			comments: String
		},
		wineGlasses: {
			quantity: Number,
			comments: String
		},
		corkscrew: {
			quantity: Number,
			comments: String
		},
		peeler: {
			quantity: Number,
			comments: String
		},
		canOpener: {
			quantity: Number,
			comments: String
		},
		scissors: {
			quantity: Number,
			comments: String
		},
		colander: {
			quantity: Number,
			comments: String
		},
		grater: {
			quantity: Number,
			comments: String
		},
		towel: {
			quantity: Number,
			comments: String
		},
		utensils: {
			quantity: Number,
			comments: String
		},
		glassTray: {
			quantity: Number,
			comments: String
		},
		woodenSpoon: {
			quantity: Number,
			comments: String
		},
		fryingPan: {
			quantity: Number,
			comments: String
		},
		saucePan: {
			quantity: Number,
			comments: String
		},
		dishDrainer: String,
		comments: String,
		author: {
					id: {
						type: mongoose.Schema.Types.ObjectId,
						ref: "User"
					},
					username: String
				}
});

module.exports = mongoose.model("Kitchen", kitchenSchema);