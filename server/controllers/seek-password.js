const User = require('../models/schemas/user');
const jwt = require('../auth');
exports.forget = async(req, res) => {
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
			});
		});
		user.password = _user.password;
		await new Promise((resolve, reject) => {
			user.save(err => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
		let token = jwt.encode(_user.userName);
		res.json({
			errorcode: 0,
			msg: 'sucessful'
			token
		});
	} catch (e) {
		res.json({
			errorcode: 0,
			msg: 'server wrong'
		});
	}
};