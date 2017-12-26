const User = require('../../models/schemas/user');
const verify = require('../../jwt').verify;

module.exports = async (req, res) => {
	let _user = req.body;
	let userName = req.session.userName;
	try {
		await new Promise((resolve, reject) => {
			User.update({
				userName
			}, {
				email: _user.email,
				signature: _user.signature
			}).exec((err) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}

			})
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
