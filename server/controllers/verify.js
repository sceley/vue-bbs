const email = require('../email');
module.exports = (req, res) => {
	console.log(req.body.email)
	let verifyCode = email(req.body.email);
	res.json({
		verifyCode
	});
};