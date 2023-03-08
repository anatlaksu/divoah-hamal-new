const mongoose = require("mongoose");

const mkabazSchema = new mongoose.Schema({
	_id: { type: String },
	name: { type: String },
	magadss: { type: String },
	isRekem: { type: Boolean },
	matafEngine: { type: Boolean },
	matafCre: { type: Boolean },
});

const Mkabaz = mongoose.model("Mkabaz", mkabazSchema);

module.exports = Mkabaz;
