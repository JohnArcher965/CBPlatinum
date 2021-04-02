var mongoose = require("mongoose");

var entranceSchema = new mongoose.Schema({
		locks: String,
		walls: String,
		lights: String,
		floor: String,
		comments: String,
		author: {
        			id: {
						type: mongoose.Schema.Types.ObjectId,
						ref: "User"
					},
        			username: String
				}
});


	
module.exports = mongoose.model("Entrance", entranceSchema);