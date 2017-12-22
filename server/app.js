const express = require('express');
const path = require('path');
const morgan = require('morgan');
const http = require('http');
const bodyParser = require('body-parser');
const routers = require('./routers');

let port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);

app.all("*", (req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, x-access-token');
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	next();
});

if (process.env.NODE_ENV　== 'development') {
	app.use(morgan('dev'));
}

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routers);

server.listen(port, () => {
	console.log(`server run at ${port} port`);
});
