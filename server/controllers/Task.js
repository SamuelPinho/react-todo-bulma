const Task = require('../models/Task');

module.exports = {

	// Add Task (ADD)
	//  Success(200): Return the created task
	//  Error(400): Return an error msg
	add: function (req, res) {
		let task = new Task(req.body);

		task.save()
			.then(task => res.status(200).json(task))
			.catch(err => {
				res.status(400).send("There's was an error while adding the task " + err)
			});
	},

	// Get All Task (GET)
	//  Success(200): Return all tasks
	//  Error(400): Return an error msg
	getAll: function (req, res) {
		Task.find(function (err, tasks) {
			if (err) {
				res.status(400).send("There's was an error while retrieving the tasks " + err);
			}
			else {
				res.status(200).json(tasks);
			}
		});
	},

	// Get Task by id (GET)
	//  Success(200): Return a specified task
	//  Error(400): Return an error msg
	getTaskById: function (req, res) {
		Task.findById(req.params.id, function (err, task) {
			if (err) {
				res.status(400).send("There's was an error while retrieving this task " + err);
			}
			else {
				res.status(200).json(task);
			}
		})
	},

	// Delete Task (DELETE)
	//  Success(200): Return the id that was passed
	//  Error(400): Return an error msg
	delete: function (req, res) {
		Task.findByIdAndRemove(req.params.id, function (err, tasks) {
			if (err) {
				res.status(400).send("There's was an error while deleting this record " + err);
			}
			else {
				res.status(200).json(req.params.id);
			}
		});
	},

	// Update Task (PUT)
	//  Success(200): Return the task that was updated
	//  Error(400): Return an error msg
	update: function (req, res) {
		Task.findByIdAndUpdate(req.params.id, req.body, { new: true },
			function (err, task) {
				if (err) {
					res.status(400).send("There's was an error while updating this record " + err);
				}
				else {
					res.status(200).json(task);
				}
			});
	}
};