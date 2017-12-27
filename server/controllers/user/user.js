const User = require('../../models/schemas/user');
const Topic = require('../../models/schemas/topic');

module.exports = async (req, res) => {
	let userName = req.params.userName;
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
		let topic = await new Promise((resolve, reject) => {
			Topic.find({
				author_id: user._id
			}).exec((err, topic) => {
				if (err) {
					reject(err);
				} else {
					resolve(topic);
				}
			})
		});
		res.json({
			errorcode: 0,
			user,
			topic,
			msg: 'successful'
		});
	} catch (e) {
		res.json({
			errorcode: 555,
			msg: '服务器错误'
		});
	}
};