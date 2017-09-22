const Comment = require('../models/schemas/comment');
const User = require('../models/schemas/user');
const jwt = require('../auth');
exports.comment = (req, res) => {
	let _comment = req.body;
	let userName = jwt.decode(req.headers['x-access-token']);
	User.findOne({
		userName
	}).exec((err, user) => {
		_comment.from = user._id;
		let comment = new Comment(_comment);
		comment.save();
		res.end();
	});
};
exports.reply = (req, res) => {
	let _reply = req.body;
	let id = req.params.id;
	let userName = jwt.decode(req.headers['x-access-token']);
	new Promise(resolve => {
		User.findOne({
			userName
		}).exec((err, user) => {
			resolve(user);
		});
	}).then(user => {
		_reply.from = user._id;
		Comment.findById(id).exec((err, comment) => {
			comment.reply.push(_reply);
			comment.save();
			res.end();
		});
	});
};