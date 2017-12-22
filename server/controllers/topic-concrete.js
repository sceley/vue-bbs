module.exports = async(req, res) => {
	let id = req.params.id;
	try {
		let topic = await new Promise((resolve, reject) => {
			Topic.findById(id).populate({
				path: 'user',
				select: 'userName'
			}).exec((err, topic) => {
				if (err) {
					reject(err);
				} else {
					resolve(topic);
				}
			});
		});
		topic.pv++;
		await new Promise((resolve, reject) => {
			topic.save(err => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
		let comment = await new Promise((resolve, reject) => {
			Comment.find({
				topic: topic._id
			}).populate({
				path: 'from reply.from reply.to',
				select: 'userName gravatar'
			}).exec((err, comment) => {
				if (err) {
					reject(err);
				} else {
					resolve(comment);
				}
			});
		});
		res.json({
			topic,
			comment,
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