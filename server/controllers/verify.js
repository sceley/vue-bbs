const email = require('../email');
module.exports = async (req, res) => {
	try {
		let verifyCode = await email(req.body.email);
		res.json({
			errorcode: 0,
			verifyCode,
			msg: 'successfule'
		});
	} catch (e) {
		res.json({
			errorcode: 500,
			msg: 'server wrong'
		});
	}
};