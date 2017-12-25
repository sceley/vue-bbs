const bcrypt = require('bcrypt');
module.exports = async(session, req, res) => {
	let _user = req.body;
	let userName = session.userName;
	let saltRounds = 10;
	try {
		let user = await new Promise((resolve, reject) => {
			User.findOne({
				userName
			}).exec((err, user) => {
				if(err) {
					reject(err);
				} else {
					resolve(user);
				}
			});
		});
		let hash = await new Promise((resolve, reject) => {
			bcrypt.hash(_user.password, saltRounds, function(err, hash) {
				if (err) {
					reject(err);
				} else {
					resolve(hash);
				}
			});
		});
		user.password = hash;
		await new Promise((resolve, reject) => {
			user.save(err => {
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
			errorcode: 500,
			msg: 'server wrong'
		});
	}
};