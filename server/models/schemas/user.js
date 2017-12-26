const mongoose = require('mongoose');
const db = require('../db');

const Schema = mongoose.Schema({
	userName: String,
	password: String,
	email: String,
	gravatar:  String,
	signature: {
		type: String,
		default: '这个人很懒!!!还没设置个性签名'
	}
});

module.exports = db.model('user', Schema);