const express = require('express');
const router = express.Router();
const passport = require('passport');

const config = require('../config/database');

const Homework = require('../models/homework');

// Add Homework
router.post('/add', passport.authenticate('jwt', { session: false }), (req, res, next) => {

	if (req.user.role != 2) {
		res.json({
			status: false,
			message: "Not Authorized!"
		});
	}

	let newHomework = new Homework({
		user: req.user._id,
		title: req.body.title,
		body: req.body.body,
		subject: req.body.subject
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


// edit homework
router.put('/edit', passport.authenticate('jwt', { session: false }), (req, res, next) => {
	if (req.user.role != 2 && req.user._id == req.body.user._id) {
		res.json({
			status: false,
			message: "Not Authorized!"
		});
	}

	let newHomework = new Homework({
		_id: req.body._id,
		title: req.body.title,
		body: req.body.body
	});

	Homework.editHomework(req.body._id, newHomework, (err, data) => {
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

// delete homework
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
	if (req.user.role != 2 && req.user._id == req.body.user._id) {
		res.json({
			status: false,
			message: "Not Authorized!"
		});
	}

	Homework.deleteHomework(req.params.id, (err, data) => {
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
