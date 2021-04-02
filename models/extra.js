var mongoose = require("mongoose");

var extraSchema = new mongoose.Schema({
		babycot: String,
		extraBed: String,
		welcomeBasket: String,
		comments: String,
		author: {
        			id: {
						type: mongoose.Schema.Types.ObjectId,
						ref: "User"
					},
        			username: String
				}
});


	
module.exports = mongoose.model("Extra", extraSchema);