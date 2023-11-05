const express = require("express");
const path = require("path");
const morgan = require("morgan");
const { engine } = require("express-handlebars");

// Setting up the server
const app = express();
const port = 3000; // Port number

// Http logger
app.use(morgan("combined")); // Morgan middleware

// Template engine
app.engine(
	"hbs",
	engine({
		extname: ".hbs",
		defaultLayout: "main",
		layoutsDir: path.join(__dirname, "/views/layouts"),
	})
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "/views"));
// console.log("PATH: ", path.join(__dirname, "/views"));


// Importing routers
const routes = require("./routers/");
const homeRouter = require('./routers/homeRouter');
const requestRouter = require('./routers/requestRouter');
const blogRouter = require('./routers/blogRouter');
const notificationRouter = require('./routers/notificationRouter');

// Configure routes
//app.use('/', homeRouter);
app.use('/', requestRouter);
app.use('/', blogRouter);

// routes inits 
routes(app);

app.listen(port, () =>
	console.log(`Example app listening at http://localhost:${port}`)
);