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
		req.session = session;
		next();
	} catch (e) {
		console.log(e);
		res.json({
			errorcode: 333,
			msg: '用户没有注册'
		});
	}
};