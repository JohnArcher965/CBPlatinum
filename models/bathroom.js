var mongoose = require("mongoose");

var bathroomSchema = new mongoose.Schema({
		floor: String,
		walls: String,
		toilet: {
			bowl: String,
			seat: String,
			flush: String,
		},
		bathShower: String,
		showerHead: String,
		sealant: String,
		showerDoor: String,
		lights: String,
		water: String,
		drains: String,
		toiletPaperHolder: String,
		toiletBrush: String,
		toiletries: String,
		bin: String,
		bathmat: String,
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


	
module.exports = mongoose.model("Bathroom", bathroomSchema);