const User = require('../../models/schemas/user');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
	let _user = req.body;
	try {
		let saltRounds = 10;
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
				userName: _user.userName
			}, {
				password: hash
			}).exec((err) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
			
		});
		res.json({
			errorcode: 0,
			msg: 'sucessful'
		});
	} catch (e) {
		res.json({
			errorcode: 555,
			msg: '服务器错误'
		});
	}
};