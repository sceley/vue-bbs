module.exports = async(req, res) => {
	let _user = req.body;
	try {
		let user = await new Promise((resolve, reject) => {
			User.findOne(_user).exec((err, user) => {
				if(err) {
					reject(err);
				} else {
					resolve(user);
				}
			});
		});
		if (user){
			res.json({
				errorcode: 0,
				msg: 'sucessful'
				email: user.email
			});
		} else {
			res.json({
				errorcode: 2,
				msg: 'user not exist'
			});
		}
	} catch (e) {
		res.json({
			errorcode: 500,
			msg: 'server wrong'
		});
	}
	
};