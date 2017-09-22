const User = require('../models/schemas/user');
const Topic = require('../models/schemas/topic');
const jwt = require('../auth');
module.exports = (req, res) => {
	let topic = req.body;
	let userName = jwt.decode(req.headers['x-access-token']);
	new Promise(resolve => {
		User.findOne({
			userName
		}).exec((err, user) => {
			topic.user = user._id;
			resolve(topic);
		});
	}).then(topic => {
		let _topic = new Topic(topic);
		_topic.save();
		res.end();
	});
};