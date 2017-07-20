const mongoose = require('mongoose');
const db = require('../db');
const Schema = mongoose.Schema({
	userName: String,
	password: String,
	email: String,
	gravatar: {
		type: String,
		default: '000000'
	},
	signature: {
		type: String,
		default: '这个人很懒!!!还没设置个性签名'
	}
});
Schema.pre('save', function  (next) {
	if(this.gravatar.indexOf('.') == -1){
		this.gravatar = `${this.gravatar}.jpg`;
	}
	next();
});
module.exports = db.model('User', Schema);