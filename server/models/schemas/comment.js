const db = require('../db');
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema({
	topic: {
		type: ObjectId,
		required: true
	},
	from: {
		type: ObjectId,
		ref: 'User'
	},
	reply: [{
		from: {
			type: ObjectId,
			ref: 'User'
		},
		to: {
			type: ObjectId,
			ref: 'User'
		},
		content: String
	}],
	content: String
});
module.exports = db.model('Comment', Schema);