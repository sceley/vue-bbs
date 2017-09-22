const Topic = require('../models/schemas/topic');
exports.pageCount = (req, res) => {
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
	Topic.count(query).exec((err, count) => {
		res.json({
			count
		});
	});
};