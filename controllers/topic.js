const Topic = require('../models/schemas/topic');
module.exports = (req, res) => {
	let page = req.query.page || 1;
	let query = {};
	switch(req.query.tab) {
		case 'technology': 
			query.tab = '技术';
			break;
		case 'entertainment':
			query.tab = '娱乐';
			break;
		case 'life':
			query.tab = '生活';
			break;
		case 'interest':
			query.tab = '兴趣';
			break;
	};
	Topic.findTopic(query, page, (err, topic) => {
		res.json({
			topic
		});
	});
};