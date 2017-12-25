module.exports = async(session, req, res) => {
	let _reply = req.body;
	let id = req.params.id;
	let userName = session.userName;
	try {
		let user = await new Promise((resolve, reject) => {
			User.findOne({
				userName
			}).exec((err, user) => {
				if (err) {
					reject(err);
				} else {
					resolve(user);
				}
			});
		});
		_reply.from = user._id;
		let comment = await new Promise((resolve, reject) => {
			Comment.findById(id).exec((err, comment) => {
				if (err) {
					reject(err);
				} else {
					resolve(comment);
				}
			});
		});
		comment.reply.push(_reply);
		await new Promise((resolve, reject) => {
			comment.save(err => {
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
			errorcode: 500,
			msg: 'server wrong'
		});
	}
};