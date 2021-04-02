var mongoose = require("mongoose");

var propertySchema = new mongoose.Schema({
	propertyId: String,
	propertyName: String,
	address: {
		lineOne: String,
		lineTwo: String,
		city: String,
		postcode: String,
	},
	propertyType: String,
	beds: Number,
	baths: Number,
	receptions: Number,
	outsideSpace: String,
	inspections: [
		{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Inspection"
		}
	],
	image: String
	// author: [
	// 	{
	// 		type: mongoose.Schema.Types.ObjectId,
	// 		ref: "User"
	// 	}
	// ]
});

module.exports = mongoose.model("Property", propertySchema);
