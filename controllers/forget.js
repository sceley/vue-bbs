const User = require('../models/schemas/user');
const jwt = require('../auth');
exports.getemail = (req, res) => {
	let _user = req.body;
	User.findOne(_user).exec((err, user) => {
		if(user){
			res.json({
				_status: 1,
				email: user.email
			});
		}
		else{
			res.json({
				_status: 0,
				statement: '用户不存在'
			});
		}
	});
};
exports.forget = (req, res) => {
	let _user = req.body;
	User.findOne({
		userName: _user.userName
	}).exec((err, user) => {
		user.password = _user.password;
		user.save();
		let token = jwt.encode(_user.userName);
		res.json({
			token
		});
	});
};