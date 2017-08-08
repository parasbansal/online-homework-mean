const express = require('express');
const router = express.Router();
const passport = require('passport');

const config = require('../config/database');

const Homework = require('../models/homework');

// Add Homework
router.post('/store', passport.authenticate('jwt', { session: false }), (req, res, next) => {

	let newHomework = new Homework({
		user: req.body.user_id,
		title: req.body.title,
		body: req.body.body,
		class: req.body.class,
		section: req.body.section,
		subject: req.body.subject_id,
	});

	Homework.addHomework(newHomework, (err, homework) => {
		if (err) {
			res.json({
				status: false,
				message: 'There was some error. ' + err
			});
		} else {
			res.json({
				status: true,
				homework: homework
			});
		}
	});
});






// Get Homework by subject id
router.get('/subject/:subject_id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
	Homework.getHomeworkBySubjectId(req.params.subject_id, (err, homeworks) => {
		if (err) {
			res.json({
				status: false,
				message: 'There was some error. ' + err
			});
		} else {
			res.json({
				status: true,
				homeworks: homeworks
			});
		}
	});
});


// Get Homework by id
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
	Homework.getHomeworkById(req.params.id, (err, homework) => {
		if (err) {
			res.json({
				status: false,
				message: 'There was some error. ' + err
			});
		} else {
			res.json({
				status: true,
				homework: homework
			});
		}
	});
});


module.exports = router;
