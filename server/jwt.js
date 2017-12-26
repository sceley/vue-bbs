const jwt = require('jsonwebtoken');

let secret = 'qinyongli';

exports.sign = (userName, cb) => {
	let expires = Math.floor(Date.now() / 1000) + 60 * 120;
	jwt.sign({
		userName,
		exp: expires
	}, secret, cb);
};

exports.verify = (token, cb) => {
	jwt.verify(token, secret, cb);
};