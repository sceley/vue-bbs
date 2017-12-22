const fs = require('fs');
const path = require('path');
const url = require('url');
const Topic = require('../models/schemas/topic');
const User = require('../models/schemas/user');
const jwt = require('../auth');







exports.changeImage = async (req, res) => {
	let userName = jwt.decode(req.headers['x-access-token']);
	let imgbuffer = req.files[0].buffer;
	try {
		let img_src = await new Promise((resolve, reject) => {
			User.findOne({
				userName
			}).exec((err, user) => {
				if (err){
					reject(err);
				} else {
					resolve(user.gravatar);
				}
			});
		});
		let img_name;
		img_src.replace(/(\d+\.(jpg|png))$/, (match, _img_name) => {
			img_name = _img_name;
		});
		let img_path = path.join(__dirname, '../public/img', img_name);
		await new Promise((resolve, reject) => {
			fs.writeFile(img_path, imgbuffer, err => {
				if(err) reject(err);
				resolve();
			});
		});
		res.json({
			errorcode: 0,
			msg: 'successful',
		});

	} catch (e) {
		res.json({
			errorcode: 500,
			msg: 'server wrong'
		});
	}
};

