const mongoose = require('mongoose');
const db = require('../db');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema({
	user: {
		type: ObjectId,
		ref: 'User'
	},
	tab: String,
	title: String,
	content: String,
	pv: {
		type: Number,
		default: 0
	},
	create_at: {
		type: Date,
		default: Date.now
	}
});

Schema.static('findTopic', function (query, p, callback) {
	this.find(query).sort('-create_at')
	.skip((p - 1) * 10).limit(10)
	.populate('user').exec(callback);
});
module.exports = db.model('Topic', Schema);