const nodemailer = require('nodemailer');
const user = '1538306377@qq.com';
const pass = 'xmmkbfqyihunggif';
let transport = nodemailer.createTransport({
	service: 'QQ',
	auth: {
		user,
		pass
	}
});
module.exports = (email) => {
	let number = Math.floor(Math.random() * 100000);
	transport.sendMail({
		from: '1538306377@qq.com',
		to: email,
		subject: '论坛验证码',
		html: `覃永利论坛的验证码: ${number}，多谢支持。。。`
	}, (err, res) => {
		if(err) return console.log(`err:${err}`);
	});
	return number;
};