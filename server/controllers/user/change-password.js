const bcrypt = require('bcrypt');
const User = require('../../models/schemas/user');

module.exports = async(req, res) => {
	let _user = req.body;
	let userName = req.session.userName;
	let saltRounds = 10;
	try {
		let hash = await new Promise((resolve, reject) => {
			bcrypt.hash(_user.password, saltRounds, function(err, hash) {
				if (err) {
					reject(err);
				} else {
					resolve(hash);
				}
			});
		});
		await new Promise((resolve, reject) => {
			User.update({
				userName
			}, {
				password: hash
			}).exec((err) => {
				if(err) {
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