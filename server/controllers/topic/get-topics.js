const Topic = require('../../models/schemas/topic');

module.exports = async (req, res) => {
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
	try {
		let topic = await new Promise((resolve, reject) => {
			Topic.findTopic(query, page, (err, topic) => {
				if (err) {
					reject(err);
				} else {
					resolve(topic);
				}
			});
		});
		res.json({
			errorcode: 0,
			msg: 'successful',
			topic
		});
	} catch (e) {
		res.json({
			errorcode: 555,
			msg: '服务器错误'
		});
	}
};