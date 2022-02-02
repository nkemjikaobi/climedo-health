const mongoose = require('mongoose');

const DepartmentContactPersonSchema = new mongoose.Schema({
	contactName: {
		type: String,
		required: true,
		// unique: true,
	},
	email: {
		type: String,
		required: true,
		// unique: true,
	},
	telephone: {
		type: Number,
		required: true,
		// unique: true,
	},
});

module.exports = mongoose.model(
	'DepartmentContactPerson',
	DepartmentContactPersonSchema
);
