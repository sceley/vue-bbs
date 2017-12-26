const getVerifyCode = require('../getVerifyCode');

module.exports = async (req, res) => {
	try {
		let verifyCode = await getVerifyCode(req.body.email);
		res.json({
			errorcode: 0,
			verifyCode,
			msg: 'successful'
		});
	} catch (e) {
		res.json({
			errorcode: 555,
			msg: '服务器错误'
		});
	}
};