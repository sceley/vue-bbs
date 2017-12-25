const fs = require('fs');
const bcrypt = require('bcrypt');
const User = require('../models/schemas/user');
const sign = require('../jwt').sign;

module.exports = async(req, res) => {
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
				bcrypt.compare(_user.password, user.password, function(err, res) {
					if (err) {
						reject(err);
					} else {
						resolve(res);
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
				res.setHeader('x-access-token', token);
				res.json({
					errorcode: 0,
					msg: 'successful'
				});
			} else {
				res.json({
					errorcode: 2,
					msg: 'the password is wrong'
				});
			}
		} else {
			res.json({
				errorcode: 4,
				msg: 'the user is not exist'
			});
		}
	} catch (e) {
		res.json({
			errorcode: 500,
			msg: 'server is wrong'
		});
	}
};

// exports.existuser = async(req, res) => {
// 	let _user = req.body;
// 	let user = await new Promise((resolve, reject) => {
// 		User.findOne({
// 			userName: _user.userName
// 		}).exec((err, user) => {
// 			if (err) {
// 				reject(err);
// 			} else {
// 				resolve(user);
// 			}
// 		});	
// 	});
// 	if(user){
// 		res.json({
// 			errorcode: 0,
// 			msg: 'the user is exist'
// 		});
// 	}
// 	else{
// 		res.json({
// 			errorcode: 2,
// 			msg: 'the user is not exist'
// 		});
// 	}
// };
