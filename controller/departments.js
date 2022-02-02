//const { check, validationResult } = require('express-validator');

const Department = require('../models/Department');
const DepartmentInfo = require('../models/DepartmentInfo');
const DepartmentContactPerson = require('../models/DepartmentContactPerson');

//@route   POST api/departments
//@desc    Register a user
//@access  Public
exports.create = async (req, res) => {
	const {
		departmentInfo: { departmentName, apiKey },
		departmentContactPerson: { contactName, email, telephone },
	} = req.body;
	try {
		const departmentInfo = new DepartmentInfo({
			departmentName,
			apiKey,
		});
		const departmentContactPerson = new DepartmentContactPerson({
			contactName,
			email,
			telephone,
		});

		const info = await departmentInfo.save();

		const contact = await departmentContactPerson.save();

		const department = new Department({
			departmentInfo: info['_id'],
			departmentContactPerson: contact['_id'],
		});
		const newDepartment = await department.save();
		return res
			.status(200)
			.json({ message: 'Department Created', data: newDepartment });

		//}
	} catch (err) {
		console.error(err);
		console.error(err.message);
		res.status(500).json({ error: 'Server Error' });
	}
};

//@route   GET api/departments
//@desc    Preview all departments
//@access  Public
exports.fetch = async (req, res) => {
	try {
		const departments = await Department.find()
			.populate('departmentInfo')
			.populate('departmentContactPerson')
			.lean();
		res.status(200).json({
			message: 'Departments fetched successfully',
			data: departments || [],
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ error: 'Server Error' });
	}
};

// @desc Preview a single department
// @route GET /api/documents/:id
exports.getById = async (req, res) => {
	try {
		let department = await Department.findById(req.params.id)
			.populate('departmentInfo')
			.populate('departmentContactPerson')
			.lean();

		if (!department) {
			res.status(404).json({
				message: 'Department not found',
				data: [],
			});
		}

		res.status(200).json({ message: 'Department found', data: department });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Server Error' });
	}
};

//@route   PUT api/departments/:id
//@desc    Update a department
//@access  Public
exports.update = async (req, res) => {
	const {
		departmentInfo: { departmentName, apiKey },
		departmentContactPerson: { contactName, email, telephone },
	} = req.body;

	//Build Department Info Object
	let departmentInfoFields = {};
	departmentInfoFields['departmentInfo'] = {};

	//Build Department contact person object
	let departmentContactPersonFields = {};
	departmentContactPersonFields['departmentContactPerson'] = {};

	if (departmentName)
		departmentInfoFields['departmentInfo']['departmentName'] = departmentName;
	if (apiKey) departmentInfoFields['departmentInfo']['apiKey'] = apiKey;
	if (contactName)
		departmentContactPersonFields['departmentContactPerson']['contactName'] =
			contactName;
	if (email)
		departmentContactPersonFields['departmentContactPerson']['email'] = email;
	if (telephone)
		departmentContactPersonFields['departmentContactPerson']['telephone'] =
			telephone;

	try {
		let department = await Department.findById(req.params.id)
			.populate('departmentInfo')
			.populate('departmentContactPerson')
			.lean();

		//Check if department exists
		if (!department) {
			res.status(404).json({
				message: 'Department not found',
				data: [],
			});
		}

		//Update the department
		let departmentInfo = await DepartmentInfo.findById(
			department.departmentInfo._id
		);

		departmentInfo = await DepartmentInfo.findByIdAndUpdate(
			department.departmentInfo._id,
			{ $set: { departmentName, apiKey } },
			{ new: true }
		);
		let departmentContactPerson = await DepartmentContactPerson.findById(
			department.departmentContactPerson._id
		);
		departmentContactPerson = await DepartmentContactPerson.findByIdAndUpdate(
			department.departmentContactPerson._id,
			{ $set: { contactName, email, telephone } },
			{ new: true }
		);
		res.status(200).json({
			message: 'Department updated successfully',
			data: department,
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ error: 'Server Error' });
	}
};

//@desc Delete Department
//@route api/departments/:id
exports.remove = async (req, res) => {
	try {
		let department = await Department.findById(req.params.id);
		//Check if department exists
		if (!department) {
			res.status(404).json({
				message: 'Department not found',
				data: [],
			});
		}

		//Delete the departments
		await DepartmentInfo.findByIdAndRemove(department.departmentInfo._id);
		await DepartmentContactPerson.findByIdAndRemove(
			department.departmentContactPerson._id
		);
		await Department.findByIdAndRemove(department._id);

		res.status(200).json({
			message: 'Department removed successfully',
			data: [],
		});
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
};

// //@desc Search through departments
// //@route api/departments?:query
// router.get('?:query', async (req, res) => {
// 	try {
//         res.json(req.params.query)
// 	} catch (error) {
// 		console.error(error.message);
// 		res.status(500).send('Server Error');
// 	}
// });
