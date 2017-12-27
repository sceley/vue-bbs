const nodemailer = require('nodemailer');
const config = require('./config');

let user = config.email;
let pass = config.emailPass;

let transport = nodemailer.createTransport({
	service: 'QQ',
	auth: {
		user,
		pass
	}
});

module.exports = async email => {
	let number = Math.floor(Math.random() * 100000);
	await new Promise((resolve, reject) => {
		transport.sendMail({
			from: user,
			to: email,
			subject: '论坛验证码',
			html: `覃永利论坛的验证码: ${number}，多谢支持。。。`
		}, (err, res) => {
			if(err) {
				reject(err);
				console.log(err);
			} else {
				resolve();
			}
		});
	});
	return number;
};