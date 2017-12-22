const Topic = require('../models/schemas/topic');
const Comment = require('../models/schemas/comment');
const User = require('../models/schemas/user');
const jwt = require('../auth');
module.exports = async(req, res) => {
	let _topic = req.body;
	let userName = jwt.decode(req.headers['x-access-token']);
	try {
		let user = await new Promise((resolve, reject) => {
			User.findOne({
				userName
			}).exec((err, user) => {
				if (err) {
					reject(err);
				} else {
					resolve(user);
				}
			});
		});
		_topic.user = user._id;
		let topic = new Topic(_topic);
		await new Promise((resolve, reject) => {
			topic.save(err => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});	
		res.json({
			errorcode: 0,
			msg: 'successful'
		});
	} catch (e) {
		res.json({
			errorcode: 500,
			msg: 'server wrong'
		});
	}
};