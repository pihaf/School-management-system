const express = require("express");
const http = require('http');
const path = require("path");
const cors = require("cors");
const bodyParser = require('body-parser');
const morgan = require("morgan");
const { engine } = require("express-handlebars");
const sequelize  = require('./models/DB');

// Setting up the server
const app = express();
const port = 3000; // Port number
const server = http.createServer(app);

// Parse JSON bodies
app.use(bodyParser.json());

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

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

app.use(cors());

const socketIo = require("socket.io")(server, {
  cors: {
      origin: "*",
  }
});

socketIo.on("connection", (socket) => {
  console.log("New client connected " + socket.id);

  socket.emit("getId", socket.id);

  socket.on("sendDataClient", function(data) {
    console.log(data)
    socketIo.emit("sendDataServer", { data });
  })

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Importing routers
const routes = require("./routers/");
const homeRouter = require('./routers/homeRouter');
const requestRouter = require('./routers/requestRouter');
const newsRouter = require('./routers/newsRouter');
const notificationRouter = require('./routers/notificationRouter');
const gradeRouter = require('./routers/gradeRouter');
const courseRouter = require('./routers/courseRouter');
const studentRouter = require('./routers/studentRouter');
const lecturerRouter = require('./routers/lecturerRouter');
const adminRouter = require('./routers/adminRouter');
const loginlogout = require('./routers/loginlogout');

// Configure routes
app.use('/', homeRouter);
app.use('/', notificationRouter);
app.use('/', requestRouter);
app.use('/', newsRouter);
app.use('/', gradeRouter);
app.use('/', courseRouter);
app.use('/', studentRouter);
app.use('/', lecturerRouter);
app.use('/', adminRouter);
app.use('/', loginlogout);

// routes inits 
routes(app);

sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');

    return sequelize.sync({ force: false });
  })
  .then(() => {
    console.log('Sequelize models synced with the database.');

    // Start the server
    server.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });