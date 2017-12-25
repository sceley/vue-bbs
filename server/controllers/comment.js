const Comment = require('../models/schemas/comment');
const User = require('../models/schemas/user');
const jwt = require('../auth');
module.exports = async(session, req, res) => {
	let _comment = req.body;
	let userName = session.userName;
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
		_comment.from = user._id;
		let comment = new Comment(_comment);
		await new Promise((resolve, reject) => {
			comment.save(err => {
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