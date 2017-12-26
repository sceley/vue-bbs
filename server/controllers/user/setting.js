const User = require('../../models/schemas/user');

module.exports = async (req, res) => {
	let userName = req.session.userName;
	try {
		let user = await new Promise((resolve, reject) => {
			User.findOne({
				userName
			}).exec((err, userInfo) => {
				if (err) {
					reject(err);
				} else {
					resolve(userInfo);
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
			errorcode: 500,
			msg: '服务器错误'
		});
	}
};