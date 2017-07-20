const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'club';
const expires = moment().add(7, 'days').valueOf();

exports.encode = (userName) => {
	let token = jwt.encode({
		userName,
		exp: expires
	}, secret);
	return token;
};

exports.decode = (token) => {
	let json = jwt.decode(token, secret);
	return json.userName;
};