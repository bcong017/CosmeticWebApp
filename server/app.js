const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// For routing
const categoryRoute = require("./routes/categoryRoute");
const importDataRoute = require("./routes/importDataRoute");
const itemRoute = require("./routes/itemRoute");
const adminRoute = require("./routes/adminRoute");
const userRoute = require("./routes/userRoute");
const homeRoute = require("./routes/homeRoute");
const commentRoute = require("./routes/commentRoute");
const searchRoute = require("./routes/searchRoute");
const cartRoute = require("./routes/cartRoute");
const eventRoute = require("./routes/saleEventRoute");

const app = express();

// Use cors middleware
app.use(
  cors({
    // Apply the cors middleware globally
    origin: "http://localhost:5173", // Replace with your front-end URL
    credentials: true,
  })
);

app.use(bodyParser.json());

const db = require("./models");

app.use("/", userRoute);
/**
 * This is for user functions:
 * 1. Register
 *  POST
 *  http://localhost:3000/register
 *  Need data in JSON:
 *   {
 *     "username": "test1",
 *     "password": "test1",
 *     "name": "Test1",
 *     "phone_number": 12345,
 *     "adress": "HCM"
 *   }
 *  and will send the token look like this:
 *  {
 *   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInVzZXJuYW1lIjoidGVzdDIiLCJpYXQiOjE3MDI5NzEyODMsImV4cCI6MTcwMjk3NDg4M30.6lFLfFZqQygwiQFZ_ohB4HKw_y0NGrP51s6woBFAYLE"
 *  }
 *  This token will expired 1h and will random
 * 
 * 2. Login
 *  POST
 *  http://localhost:3000/login
 *  Need data in JSON:
 *   {
 *     "username": "test1",
 *     "password": "test1"
 *   }
 *  and will send the token look like this:
 *  {
 *   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInVzZXJuYW1lIjoidGVzdDIiLCJpYXQiOjE3MDI5NzEzNDYsImV4cCI6MTcwMjk3NDk0Nn0.Zz8uGWTVBYazT9CJH46RvCLsxUt8eqtuBc-AydSPH98"
 *   "role": "user" 
 * }
 *  This token will expired 1h and will random
 */

app.use("/admin", adminRoute);

app.use(searchRoute);
/**
 * POST
 * This is to return data of search item
 * http://localhost:3000/search?searchTerm= [nameToSearch]
 * for example http://localhost:3000/search?searchTerm=Phấn to search all Item stat with Phấn
 */

app.use(homeRoute);
/**
 * GET
 * This automatically return data for these critieria:
 * 1. Top rated items
 * 2. Top sold items
 */

app.use("/cart", cartRoute);
/**
 * This is for cart functions:
 * 1. Add
 * POST
 *    http://localhost:3000/cart/add
 *    Need data in JSON look like this
 *      {
 *         "item_id": 1 (for example),
 *         "quantity": 2 (for example)
 *       }

 * 2. Edit
 *   PUT       
 *   http://localhost:3000/cart/edit
 *   Need data in JSON look like this
 *     {
 *       "cartItemId": 1 (for example),
 *       "quantity": 3 (for example)
 *       }

 * 3. Delete
 *   DELETE 
 *   http://localhost:3000/cart/delete/:cartItemId
 *   Need the cartItemId to remove from database
 *  
 * 4. Items
 *  GET
 *  http://localhost:3000/cart/items (to get all items in cart)
 *  
 *   
 * 5. Merge (not function right now for non-login user can add item to cart)
 * 
 */

app.use("/data", importDataRoute);
/**
 * This is to import data
 * POST
 *  http://localhost:3000/data/import
 *  This is import the data in JSON for item if SQL don't have
 *  NOTE: run only once if you dont have database of items
 */

app.use("/categories", categoryRoute);
/**
 * This is for category functions:
 * 1. Get items in category
 *  GET
 *  http://localhost:3000/categories/:categoryName
 *  for example:
 *   http://localhost:3000/categories/TayTrang (send all item in category TayTrang)
 * 
 * 2. Filter items for each category options
 * Note: Come with filter options
 *
 */

app.use("/item", itemRoute);
/**
 * This is for item functions:
 * 1. Get item detail information
 *  GET
 *  http://localhost:3000/item/:itemId
 *  for example:
 *  http://localhost:3000/item/1 (send all information of item has itemId = 1)
 */

app.use("/comment", commentRoute);
/**
 * This is for comment functions:
 * 1. Add
 *  POST
 *   http://localhost:3000/comment/add/:itemId
 *   for example:
 *   http://localhost:3000/comment/add/1 (to add comment for item has itemId = 1)
 *   Need data in JSON:
 *  {
 *    "commentText": "This is a test comment."
 *   }
 *
 * 2. Delete
 *  DELETE
 *   http://localhost:3000/comment/delete/:commentId
 *   for example:
 *   http://localhost:3000/comment/delete/1 (to delete comment has commentId = 1)
 *
 * 3. Edit
 *  PUT
 *   http://localhost:3000/comment/edit/:commentId
 *   for example:
 *   http://localhost:3000/comment/edit/1 (to edit comment has commentId = 1)
 *   Need data in JSON:
 *  {
 *    "commentText": "This is the edited comment."
 *   }
 */

app.use("/event", eventRoute);

app.use("/", userRoute);
/**
 * This is for user functions:
 * 1. Register
 *  POST
 *  http://localhost:3000/register
 *  Need data in JSON:
 *   {
 *     "username": "test1",
 *     "password": "test1",
 *     "name": "Test1",
 *     "phone_number": 12345,
 *     "adress": "HCM"
 *   }
 *  and will send the token look like this:
 *  {
 *   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInVzZXJuYW1lIjoidGVzdDIiLCJpYXQiOjE3MDI5NzEyODMsImV4cCI6MTcwMjk3NDg4M30.6lFLfFZqQygwiQFZ_ohB4HKw_y0NGrP51s6woBFAYLE"
 *  }
 *  This token will expired 1h and will random
 *
 * 2. Login
 *  POST
 *  http://localhost:3000/login
 *  Need data in JSON:
 *   {
 *     "username": "test1",
 *     "password": "test1"
 *   }
 *  and will send the token look like this:
 *  {
 *   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInVzZXJuYW1lIjoidGVzdDIiLCJpYXQiOjE3MDI5NzEzNDYsImV4cCI6MTcwMjk3NDk0Nn0.Zz8uGWTVBYazT9CJH46RvCLsxUt8eqtuBc-AydSPH98"
 *   "role": "user"
 * }
 *  This token will expired 1h and will random
 */

const start = async () => {
  await db.sequelize.sync();
  //await db.sequelize.authenticate();
  console.log("Kết nối xong");
  app.listen(3000, () => {
    console.log("Đang nghe ở port 3000");
  });
};

start();
