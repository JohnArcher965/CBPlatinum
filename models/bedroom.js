var mongoose = require("mongoose");

var bedroomSchema = new mongoose.Schema({
		title: String,
		floor: String,
		walls: String,
		lights: String,
		blinds: String,
		windows: String,
		pillows: {
			quantity: Number,
			comments: String
		},
		duvet: {
			quantity: Number,
			comments: String
		},
		linen: String,
		towels: {
			quantity: Number,
			comments: String
		},
		lamps: {
			quantity: Number,
			comments: String
		},
		bedThrow: {
			quantity: Number,
			comments: String
		},
		cushions: {
			quantity: Number,
			comments: String
		},
		bedsideChests: {
			quantity: Number,
			comments: String
		},
		chest: String,
		wardrobe: String,
		underBed: String,
		hangers: {
			quantity: Number,
			comments: String
		},
		decorations: String,
		hairdryer: String,
		multiplug: String,
		mirror: String,
		comments: String,
		author: {
        			id: {
						type: mongoose.Schema.Types.ObjectId,
						ref: "User"
					},
        			username: String
				}
});


	
module.exports = mongoose.model("Bedroom", bedroomSchema);