const User = require('../../models/schemas/user');

module.exports = async (req, res) => {
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
		res.json({
			errorcode: 0,
			user,
			msg: 'successful'
		});
	} catch (e) {
		res.json({
			errorcode: 555,
			msg: '服务器错误'
		});
	}
};