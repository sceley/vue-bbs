const User = require('../models/schemas/user');
const jwt = require('../auth');
exports.signin = (req, res) => {
	let _user = req.body;
	User.findOne({
		userName: _user.userName
	}).exec((err, user) => {
		if(user && user.password == _user.password){
			let token = jwt.encode(_user.userName);
			res.json({
				_status: 1,
				token,
				statement: '登陆成功'
			});
		}
		else{
			res.json({
				_status: 0,
				statement: '登陆失败'
			});
		}
	});
};

exports.existuser = (req, res) => {
	let _user = req.body;
	User.findOne({
		userName: _user.userName
	}).exec((err, user) => {
		if(user){
			res.json({
				_status: 0,
				statement: '用户已被注册'
			});
		}
		else{
			res.json({
				_status: 1
			});
		}
	});	
};

exports.signup = (req, res) => {
	let _user = req.body;
	let user = new User(_user);
	user.save();
	let token = jwt.encode(_user.userName);
	res.json({
		token
	});
};