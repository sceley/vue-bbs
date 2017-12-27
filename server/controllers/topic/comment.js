const Comment = require('../../models/schemas/comment');
const User = require('../../models/schemas/user');

module.exports = async (req, res) => {
	let _comment = req.body;
	let userName = req.session.userName;
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
		_comment.author_id = user._id;
		if (_comment.replyer) {
			let replyer = await new Promise((resolve, reject) => {
				User.findOne({
					userName: _comment.replyer
				}).exec((err, user) => {
					if (err) {
						reject(err);
					} else {
						resolve(user);
					}
				})
			});
			_comment.replyer_id = replyer.id;
			delete _comment.replyer;
		}
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
			errorcode: 555,
			msg: '服务器错误'
		});
	}
};