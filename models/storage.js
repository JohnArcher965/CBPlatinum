var mongoose = require("mongoose");

var storageSchema = new mongoose.Schema({
		rcdBoard: String,
		iron: String,
		ironingboard: String,
		fan: String,
		heater: String,
		mopBucket: String,
		broom: String,
		vacuum: String,
		clothesAirer: String,
		comments: String,
		author: {
        			id: {
						type: mongoose.Schema.Types.ObjectId,
						ref: "User"
					},
        			username: String
				}
});


	
module.exports = mongoose.model("Storage", storageSchema);