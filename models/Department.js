const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema({
	departmentInfo: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'DepartmentInfo',
	},
	departmentContactPerson: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'DepartmentContactPerson',
	},
});

module.exports = mongoose.model('Department', DepartmentSchema);
