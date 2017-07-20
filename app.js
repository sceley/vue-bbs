const express = require('express');
const path = require('path');
const morgan = require('morgan');
const http = require('http');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const port = process.env.PORT || 3000;
const routers = require('./routers');
const app = express();
const server = http.createServer(app);

app.all("*", (req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, x-access-token');
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	next();
});
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routers);
server.listen(port, () => {
	console.log(`server run at ${port} port`);
});
