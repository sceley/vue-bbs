const fs = require('fs');
const path = require('path');
const url = require('url');
const User = require('../models/schemas/user');
const jwt = require('../auth');
exports.user = (req, res) => {
	let userName = jwt.decode(req.headers['x-access-token']);
	User.findOne({
		userName
	}).exec((err, user) => {
		res.json(user);
	});
};

exports.changeimage = (req, res) => {
	let userName = jwt.decode(req.headers['x-access-token']);
	let time = String(Date.now());
	let filepath = path.join(__dirname, '../public', `${time}.jpg`);
	let buffer = req.files[0].buffer;
	new Promise(resolve => {
		fs.writeFile(filepath, buffer, err => {
			if(err) return console.log('保存失败');
			resolve();
		});
	}).then(() => {
		return new Promise(resolve => {
			User.findOne({
				userName
			}).exec((err, user) => {
				let _path = user.gravatar;
				user.gravatar = time;
				user.save();
				resolve(_path);
			});
		})
	}).then(_path => {
		if(_path == '000000.jpg')
			return 0;
		let __path = path.join(__dirname, '../public', _path);
		fs.unlink(__path, err => {
			if(err) console.log(`err:${err}`);
			res.end();
		});	
	});
};

exports.savesetting = (req, res) => {
	let _user = req.body;
	let userName = jwt.decode(req.headers['x-access-token']);
	new Promise(resolve => {
		User.findOne({
			userName
		}).exec((err, user) => {
			resolve(user);
		});
	}).then(user => {
		if(_user.userName == userName) {
			user.email = _user.email;
			user.signature = _user.signature;
			user.save();
			res.json({
				statement: '修改成功'
			});
		}
		else {
			User.findOne({
				userName: _user.userName
			}).exec((err, user) => {
				if(user){
					res.json({
						_status: 0,
						statement: '该用户名已经存在'
					});
				}
				else{
					user.userName = _user.userName;
					user.email = _user.email;
					user.signature = _user.signature;
					user.save();
					let token = jwt.encode(req.body.userName);
					res.json({
						_status: 1,
						token,
						statement: '修改成功'
					});
				}
			});
		}
	});
};
exports.changepassword = (req, res) => {
	let _user = req.body;
	let userName = jwt.decode(req.headers['x-access-token']);
	User.findOne({
		userName
	}).exec((err, user) => {
		if(user.password == _user.oldPassword){
			user.password = _user.newPassword;
			user.save();
			res.json({
				_status: 1,
				statement: '密码修改成功'
			});
		}
		else{
			res.json({
				_status: 0,
				statement: '原密码错误'
			});
		}
	});
};