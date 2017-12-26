const db = require('../db');
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema({
	topic_id: {
		type: ObjectId,
		ref: 'topic',
		required: true
	},
	author_id: {
		type: ObjectId,
		ref: 'user'
	},
	replyer_id: {
		type: ObjectId,
		ref: 'user'
	},
	content: String
});
module.exports = db.model('comment', Schema);