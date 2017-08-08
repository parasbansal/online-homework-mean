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
		res.json({ subjects: subjects });
	});
});

// Add new Subject
router.post('/store', passport.authenticate('jwt', { session: false }), (req, res, next) => {
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
		name: req.body.subject,
		class: req.body.class
	});

	Subject.editSubject(req.body.id, subject, (err, subject) => {
		if (err) {
			res.json({
				status: false,
				message: "There was some error. " + err
			});
		} else {
			res.json({
				status: true,
				subject: subject,
				message: "Subject edited!"
			});
		}
	});

});

// Get Subject List by class
router.get('/class/:classNumber', passport.authenticate('jwt', { session: false }), (req, res, next) => {
	console.log(req.params.classNumber);
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
