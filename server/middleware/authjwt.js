const verify = require('../jwt').verify;
module.exports = async(req, res, next) => {
	let token = req.headers['x-access-token'];
	try {
		let result = await new Promise((resolve, reject) => {
			verify(token, (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	} catch (e) {
		res.json({
			errorcode: 400,
			msg: 'user not login'
		});
	}
};