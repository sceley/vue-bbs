const Topic = require('../../models/schemas/topic');

module.exports = async (req, res) => {
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
		let count = await new Promise((resolve, reject) => {
			Topic
			.count(query)
			.exec((err, count) => {
				if (err) {
					reject(err);
				} else {
					resolve(count);
				}
			});
		});
		res.json({
			count,
			errorcode: 0,
			msg: 'successful'
		});
	} catch (e) {
		res.json({
			errorcode: 555,
			msg: '服务器错误' 
		});
	}
};