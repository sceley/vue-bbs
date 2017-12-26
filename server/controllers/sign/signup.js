const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const User = require('../../models/schemas/user');
const config = require('../../config');

module.exports = async (req, res) => {
	let _user = req.body;
	let saltRounds = 10;
	try {
		let user_result = await new Promise((resolve, reject) => {
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
		if(user_result) {
			res.json({
				errorcode: 111,
				msg: '用户已存在'
			});
			return 0;
		}
		let hash = await new Promise((resolve, reject) => {
			bcrypt.hash(_user.password, saltRounds, function(err, hash) {
				if (err) {
					reject(err);
				} else {
					resolve(hash);
				}
			});
		});
		_user.password = hash;
		let time = Date.now();
		let readStream = fs.createReadStream(path.join(__dirname, '../../public/img/000000.jpg'));
		let writeStream = fs.createWriteStream(path.join(__dirname, `../../public/img/${time}.jpg`));
		readStream.pipe(writeStream);
		_user.gravatar = `//${config.host}:3000/img/${time}.jpg`;
		let user = new User(_user);
		await new Promise((resolve, reject) => {
			user.save(err => {
				if (err) {
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
			errorcode: 555,
			msg: '服务器错误'
		});
	}
};