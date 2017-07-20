const Topic = require('../models/schemas/topic');
const User = require('../models/schemas/user');
module.exports = (req, res) => {
	let id = req.params.id;
	new Promise(resolve => {
		User
		.findById(id)
		.exec((err, user) => {
			resolve(user);
		})
	}).then(user => {
		Topic.find({
			user: id
		})
		.exec((err, topic) => {
			res.send({
				user,
				topic
			});
		});
	});
	
};