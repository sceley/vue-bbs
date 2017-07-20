const mongoose = require('mongoose');
const db = mongoose.createConnection('mongodb://localhost:27017/production');
db.on('open', () => {
	console.log('database have connected to server');
});
db.on('err', () => {
	console.log('server connect to database having error');
});
module.exports = db;