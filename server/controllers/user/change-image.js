const fs = require('fs');
const path = require('path');
const url = require('url');
const User = require('../../models/schemas/user');

module.exports = async (req, res) => {
	let imgbuffer = req.files[0].buffer;
	let userName = req.session.userName;
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
		let img_path = path.join(__dirname, '../../public/img', img_name);
		await new Promise((resolve, reject) => {
			fs.writeFile(img_path, imgbuffer, err => {
				if(err) reject(err);
				resolve();
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

