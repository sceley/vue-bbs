module.exports = async (req, res) => {
	let _user = req.body;
	let saltRounds = 10;
	try {
		let hash = await new Promise((resolve, reject) => {
			bcrypt.hash(_user.password, saltRounds, function(err, hash) {
				if (err) {
					reject(err);
				} else {
					resolve(hash);
				}
			});
		});
		_user.password = hash;
		let time = Date.now();
		let readStream = fs.createReadStream('../public/img/000000.jpg');
		let writeStream = fs.createWriteStream(`../public/img/${time}.jpg`);
		readStream.pipe(writeStream);
		let _user.gravatar = `//localhost:3000/img/${time}.jpg`;
		let user = new User(_user);
		await new Promise((resolve, reject) => {
			user.save(err => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
		// let token = jwt.encode(_user.userName);
		// res.setHeader('x-access-token', token);
		res.json({
			errorcode: 0,
			msg: 'successful'
		});
	} catch (e) {
		res.json({
			errorcode: 500,
			msg: 'server wrong'
		});
	}
};