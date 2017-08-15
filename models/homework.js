const mongoose = require('mongoose');

const config = require('../config/database');

// Homework Schema
const HomeworkSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	title: {
		type: String,
		required: true
	},
	body: {
		type: String,
		required: true
	},
	subject: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Subject",
		required: true
	},
	viewed_by: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: "User",
	},
	created_at: {
		type: Date,
		required: true,
		default: new Date()
	}
});

const Homework = module.exports = mongoose.model('Homework', HomeworkSchema);

// Get Homework List
module.exports.getHomeworkList = function (callback) {
	Homework.find({}).populate('user', 'name').populate('subject', 'name').sort({ Date: -1 }).select({ body: -1 }).exec(callback);
}

// Get Homework By Id
module.exports.getHomeworkById = function (id, callback) {
	Homework.findById(id).populate('user', 'name').populate('subject', 'name').exec(callback);
}

// Homework by Subjects
module.exports.getHomeworkBySubjectId = function (subject_id, callback) {
	const query = { subject: subject_id };
	Homework.find(query).populate('user', 'name').sort('-created_at').exec(callback);
}

// Homework by Subjects
module.exports.getHomeworkBySubjectIdForDelete = function (subject_id, callback) {
	const query = { subject: subject_id };
	Homework.find(query, callback);
}

// Add Homework
module.exports.addHomework = function (newHomework, callback) {
	newHomework.save(callback);
}

// Edit Homework
module.exports.editHomework = function (id, newHomework, callback) {
	Homework.findByIdAndUpdate(id, newHomework, callback);
}

// Delete Homework
module.exports.deleteHomework = function (id, callback) {
	Homework.findByIdAndRemove(id, callback);
}

// Delete Bulk Homeworks
module.exports.deleteBulk = function (ids, callback) {
	Homework.remove({ _id: { $in: ids } });
}

