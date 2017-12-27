const fs = require('fs');
const bcrypt = require('bcrypt');
const User = require('../../models/schemas/user');
const sign = require('../../jwt').sign;

module.exports = async (req, res) => {
	let _user = req.body;
	try {
		let user = await new Promise((resolve, reject) => {
			User.findOne({
				userName: _user.userName
			}).exec((err, user) => {
				if (err) {
					reject(err);
				} else {
					resolve(user);
				}
			});
		});
		if (user) {
			let result = await new Promise((resolve, reject) => {
				bcrypt.compare(_user.password, user.password, function(err, result) {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				});
			});
			if (result) {
				let token = await new Promise((resolve, reject) => {
					sign(_user.userName, (err, token) => {
						if (err) {
							reject(err);
						} else {
							resolve(token);
						}
					});
				});
				res.json({
					errorcode: 0,
					token,
					msg: 'successful'
				});
			} else {
				res.json({
					errorcode: 222,
					msg: '密码错误'
				});
			}
		} else {
			res.json({
				errorcode: 444,
				msg: '用户不存在'
			});
		}
	} catch (e) {
		console.log(e);
		res.json({
			errorcode: 555,
			msg: '服务器错误'
		});
	}
};