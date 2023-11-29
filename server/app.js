const express = require("express");
const bodyParser = require("body-parser");
const categoryRoute = require('./routes/categoryRoute')
const importDataRoute = require('./routes/importDataRoute')

const app = express();

app.use(bodyParser.json());

const db = require("./models");

/* Import data
app.use('/data', importDataRoute);*/

app.use('/categories', categoryRoute);

const start = async () => {
	//await db.sequelize.sync();
	await db.sequelize.authenticate();
	console.log("Kết nối xong");
	app.listen(3000, () => {
		console.log("Đang nghe ở port 3000");
	});
};

start();