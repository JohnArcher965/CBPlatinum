var mongoose = require("mongoose");

var inspectionSchema = new mongoose.Schema({
	inspectionName: String,
	author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
	date: String,
	entrance: [
		{
         type: mongoose.Schema.Types.ObjectId,
         ref: "Entrance"
		}
    ],
	reception: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Reception"
		}
	],
	kitchen: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Kitchen"
		}
	],
	storage: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Storage"
		}
	],
	bedroom: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Bedroom"
		}
	],
	bathroom: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Bathroom"
		}
	],
	extra: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Extra"
		}
	]
});


	
module.exports = mongoose.model("Inspection", inspectionSchema);