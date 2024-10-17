import express from "express";
import bodyParser from "body-parser";
const viewEngine = require('./config/viewEngine.js');
// import initWebRoutes from "./route/web.js";
const initWebRoutes = require('./route/sinhVien.js');
import adminRoutes from './route/admin.js';
// import connection from "./config/connectDB.js";
require('dotenv').config();

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

viewEngine(app);
initWebRoutes(app);
adminRoutes(app);

let port = process.env.PORT;
app.listen(port, () => {
    console.log("Nodejs is running");
});