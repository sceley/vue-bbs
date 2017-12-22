module.exports = async(session, req, res) => {
	let _user = req.body;
	let userName = session.userName;
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
		if(user.password == _user.oldPassword){
			user.password = _user.newPassword;
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
		}
		else{
			res.json({
				errorcode: 2,
				msg: 'the password is wrong'
			});
		}
	} catch (e) {
		res.json({
			errorcode: 500,
			msg: 'server wrong'
		});
	}

};