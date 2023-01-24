const mongoose = require("mongoose");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");
const { ObjectId } = mongoose.Schema;

const UserSchema = new mongoose.Schema(
	{
		name: { type: String, trim: true, required: true, maxlength: 32 },
		lastname: { type: String, trim: true, required: true },
		personalnumber: { type: String, trim: true, unique: true, require: true },
		role: { type: String, default: "0" },
		pikod: { type: String, default: "" },
		validated: { type: Boolean, default: true },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
