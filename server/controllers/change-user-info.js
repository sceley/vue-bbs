module.exports = async(req, res) => {
	let _user = req.body;
	let userName = jwt.decode(req.headers['x-access-token']);
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
		user.email = _user.email;
		user.signature = _user.signature;
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
