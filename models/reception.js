var mongoose = require("mongoose");

var receptionSchema = new mongoose.Schema({
		floor: String,
		infoPack: String,
		wifi: {
			comments: String,
			speed: String
		},
		decor: String,
		lights: String,
		tv: String,
		heating: String,
		aircon: String,
		sofa: String,
		cushions: String,
		blinds: String,
		windows: String,
		walls: String,
		diningTable: String,
		diningChairs: String,
		balcony: String,
		balconyFurniture: String,
		comments: String,
		author: {
					id: {
						type: mongoose.Schema.Types.ObjectId,
						ref: "User"
					},
					username: String
				}
});

module.exports = mongoose.model("Reception", receptionSchema);