const User = require('../../models/schemas/user');
const Topic = require('../../models/schemas/topic');

module.exports = async(req, res) => {
	let _topic = req.body;
	let userName = req.session.userName;
	try {
		let user = await new Promise((resolve, reject) => {
			User.findOne({
				userName
			}).exec((err, user) => {
				if (err) {
					reject(err);
					console.log(err);
				} else {
					resolve(user);
				}
			});
		});
		_topic.author_id = user._id;
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
			errorcode: 555,
			msg: '服务器错误'
		});
	}
};