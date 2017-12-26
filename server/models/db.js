const mongoose = require('mongoose');
const config = require('../config');

let dbUrl = config.mongodb;
let db = mongoose.createConnection(dbUrl);
// if (process.env.NODE_ENV == 'development') {
	db.on('open', () => {
		console.log('database have connected to server');
	});
	db.on('err', () => {
		console.log('server connect to database having error');
	});
// }
module.exports = db;