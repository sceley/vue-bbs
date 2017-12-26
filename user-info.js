const User = require('../models/schemas/user');
const verify = require('../jwt').verify;

module.exports = async(req, res) => {
	let token = req.headers['x-access-token'];
	try {
		let userName = await new Promise((resolve, reject) => {
			verify(token, (err, json) => {
				if (err) {
					reject(err);
				} else {
					resolve(json.userName);
				}
			});
		});
		console.log(userName);
		let userInfo = await new Promise((resolve, reject) => {
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
		console.log(userInfo);
		res.json({
			errorcode: 0,
			userInfo,
			msg: 'successful'
		});
	} catch (e) {
		res.json({
			errorcode: 500,
			msg: 'server wrong'
		});
	}
};