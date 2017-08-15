const express = require('express');
const router = express.Router();
const passport = require('passport');

const config = require('../config/database');
const Subject = require('../models/subject');


// All subject list
router.get('/', passport.authenticate('jwt', { session: false }), (req, res, next) => {
	const subjects = Subject.getSubjectList((err, subjects) => {
		if (err) {
			res.json({
				status: false,
				message: "There was some error. " + err
			});
		}
		res.json({
			status: true,
			subjects: subjects
		});
	});
});

// Add new Subject
router.post('/add', passport.authenticate('jwt', { session: false }), (req, res, next) => {
	let subject = new Subject({
		name: req.body.subject,
		class: req.body.class
	});

	Subject.addSubject(subject, (err, subject) => {
		if (err) {
			res.json({
				status: false,
				message: "There was some error. " + err
			});
		} else {
			res.json({
				status: true,
				subject: subject,
				message: "Subject added!"
			});
		}
	});

});

// Edit Subject
router.put('/edit', passport.authenticate('jwt', { session: false }), (req, res, next) => {
	let subject = new Subject({
		_id: req.body._id,
		name: req.body.name
	});

	Subject.editSubject(req.body._id, subject, (err, newSsubject) => {
		if (err) {
			res.json({
				status: false,
				message: "There was some error. " + err
			});
		} else {
			res.json({
				status: true,
				subject: newSsubject
			});
		}
	});

});

// Delete Subject
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
	Subject.deleteSubjectWithHomeworks(req.params.id, (err, data) => {
		if (err) {
			res.json({
				status: false,
				message: 'There was some error. ' + err
			});
		} else {
			res.json({
				status: true,
				data: data
			});
		}
	});
});

// Get Subject List by class
router.get('/class/:classNumber', passport.authenticate('jwt', { session: false }), (req, res, next) => {
	Subject.getSubjectsByClass(req.params.classNumber, (err, subjects) => {
		if (err) {
			res.json({
				status: false,
				message: "There was some error. " + err
			});
		} else {
			res.json({
				status: true,
				subjects: subjects
			});
		}
	});

});

module.exports = router;
