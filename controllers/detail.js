const Topic = require('../models/schemas/topic');
const Comment = require('../models/schemas/comment');
module.exports = (req, res) => {
	let id = req.params.id;
	new Promise(resolve => {
		Topic.findById(id).populate({
			path: 'user',
			select: 'userName'
		}).exec((err, topic) => {
			topic.pv++;
			topic.save();
			resolve(topic);
		});
	}).then(topic => {
		Comment.find({
			topic: topic._id
		}).populate({
			path: 'from reply.from reply.to',
			select: 'userName gravatar'
		}).exec((err, comment) => {
			res.json({
				topic,
				comment
			});
		});
	});
};