const mongoose = require("mongoose");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");
const { ObjectId } = mongoose.Schema;

const ReportSchema = new mongoose.Schema(
	{
		name: { type: String, trim: true, required: true, maxlength: 32 },
		lastname: { type: String, trim: true, required: true },
		personalnumber: { type: String, trim: true, required: true },
		cellphone: String,
		pikodrep: String,
		ogdarep: String,
		hativarep: String,
		gdod: { type: String }, //*object
		gdodrep: String, //*object

		mkabaz: { type: String }, //*object
		arraymkabaz: { type: Array },
		zadik: String,
		// magadal: String,
		// magad: String,
		// mkabaz: String,
		typevent: String,
		resevent: String,
		yn: Boolean,
		selneshek: String,
		whap: String,
		amlahtype: String,
		wnifga: String,
		rekemtype: String,
		mazavrekem: String,
		dwork: String,
		mataftype: String,
		apitype: String,
		mholaztype: String,
		// mhalztype:String,
		pirot: String,
		lessons: String,
		datevent: Date,
		mikom: String,
		totalWorkHours: { type: Number, default: 0 },
		totalCostWorkHours: { type: Number, default: 0 },
		damageCost: { type: Number, default: 0 },
		spareCost: { type: Number, default: 0 },
		nifga: { type: Number, default: 0 },
		yndate: { type: Number, default: 0 },
		hurtarray: { type: Array },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Report", ReportSchema);
