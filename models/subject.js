const mongoose = require('mongoose');

const config = require('../config/database');

// Subject Schema
const SubjectSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	class: {
		type: Number,
		required: true
	}
});

const Subject = module.exports = mongoose.model('Subject', SubjectSchema);

// Get all subject list
module.exports.getSubjectList = function (callback) {
	Subject.find({}, callback);
}

// Get subject by ID
module.exports.getSubjectById = function (id, callback) {
	Subject.findById(id, callback);
}

// Create a new Subject
module.exports.addSubject = function (newSubject, callback) {
	newSubject.save(callback);
}

// Edit Subject
module.exports.editSubject = function (id, updatedSubject, callback) {
	Subject.findByIdAndUpdate(id, editSubject, callback);
}

// Delete Subject
module.exports.deleteSubject = function (id, callback) {
	Subject.findByIdAndRemove(id, callback);
}

// Get Subjects by class
module.exports.getSubjectsByClass = function (classNumber, callback) {
	const query = { class: classNumber }
	Subject.find(query).sort({ name: 1 }).exec(callback);
}

