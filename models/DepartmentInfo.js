const mongoose = require('mongoose');

const DepartmentInfoSchema = new mongoose.Schema({
	departmentName: {
		type: String,
		required: true,
		// unique: true,
	},
	apiKey: {
		type: String,
		required: true,
		// unique: true,
	},
});

module.exports = mongoose.model('DepartmentInfo', DepartmentInfoSchema);
