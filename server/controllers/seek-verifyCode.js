const User = require('../models/schemas/user');
const getVerifyCode = require('../getVerifyCode');

module.exports = async (req, res) => {
	let _user = req.body;
	try {
		let user = await new Promise((resolve, reject) => {
			User.findOne({
				userName: _user.userName
			}).exec((err, user) => {
				if (err) {
					reject(err);
				} else {
					resolve(user);
				}
			})
		});
		if (user) {
			let verifyCode = await getVerifyCode(user.email);
			res.json({
				errorcode: 0,
				verifyCode,
				msg: 'successful'
			});
		} else {
			res.json({
				errorcode: 444,
				msg: '用户不存在'
			});
		}
	} catch (e) {
		res.json({
			errorcode: 555,
			msg: '服务器错误'
		});
	}
};