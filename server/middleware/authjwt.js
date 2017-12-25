const verify = require('../jwt').verify;
module.exports = async(req, res, next) => {
	let token = req.headers['x-access-token'];
	try {
		let session = await new Promise((resolve, reject) => {
			verify(token, (err, session) => {
				if (err) {
					reject(err);
				} else {
					resolve(session);
				}
			});
		});
		next(session);
	} catch (e) {
		res.json({
			errorcode: 400,
			msg: 'user not login'
		});
	}
};