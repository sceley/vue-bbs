exports.userInfo = async(req, res) => {
	let userName = jwt.decode(req.headers['x-access-token']);
	try {
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