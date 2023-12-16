const express = require("express");
const bodyParser = require("body-parser");
const categoryRoute = require('./routes/categoryRoute')
const importDataRoute = require('./routes/importDataRoute')
const itemRoute = require('./routes/itemRoute')
const adminRoute = require('./routes/adminRoute')
const userRoute = require('./routes/userRoute')
const homeRoute = require('./routes/homeRoute')
const commentRoute = require('./routes/commentRoute')

const app = express();

app.use(bodyParser.json());

const db = require("./models");

/* Import data

*/

app.use(homeRoute);
app.use('/data', importDataRoute);
app.use('/categories', categoryRoute);
app.use('/item', itemRoute);
app.use('/comment', commentRoute);
app.use('/', userRoute);

const start = async () => {
	await db.sequelize.sync();
	//await db.sequelize.authenticate();
	console.log("Kết nối xong");
	app.listen(3000, () => {
		console.log("Đang nghe ở port 3000");
	});
};

start();
//http://localhost:3000/categories/TayTrang to check category item
//http://localhost:3000/data/import to import data