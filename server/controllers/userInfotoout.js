module.userInfotoout = async(req, res) => {
	let id = req.params.id;
	try {
		let user = await new Promise((resolve, reject) => {
			User
			.findById(id)
			.exec((err, user) => {
				if (err) {
					reject(err);
				} else {
					resolve(user);
				}
				
			})
		});
		let topic = await new Promise((resolve, reject) => {
			Topic
			.find({
				user: id
			})
			.exec((err, topic) => {
				if (err) {
					reject(err);
				} else {
					resolve(topic);
				}
			});
		});
		res.json({
			errorcode: 0,
			msg: 'successful'
			user,
			topic
		});
	} catch (e) {
		res.json({
			errorcode: 500,
			msg: 'server wrong'
		});
	}
};