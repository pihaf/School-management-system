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

app.use(cors());

const socketIo = require("socket.io")(server, {
  cors: {
      origin: "*",
  }
});

let userRooms = [];
let adminSocket = [];

socketIo.on("connection", (socket) => {
  console.log("New client connected " + socket.id);

  socket.emit("getId", socket.id);
  socket.emit("serverSendUserRooms", userRooms);
  socketIo.emit("serverSendAdminSockets", adminSocket);

  socket.on("sendDataClient", (data) => { 
    console.log("From sendDataClient:");
    console.log(data);
    console.log("Room: ");
    console.log(data.room);
    socket.to(data.room).emit("sendDataServer", { data });
  });

  socket.on("join_room", room => {
    socket.join(room);
  });

  socket.on("leave_room", room => {
    socket.leave(room);
  });

  socket.on("sendUserRoomToServer", (data) => {
    console.log("User room be:");
    console.log(data.room);
    userRooms.push(data.room);
    socketIo.emit("serverSendUserRooms", userRooms);
  });

  socket.on("sendAdminSocketToServer", (data) => {
    console.log("Admin socket:");
    console.log(data);
    adminSocket.push(data);
    socketIo.emit("serverSendAdminSockets", adminSocket);

    userRooms.forEach((room) => {
      socket.join(room);
      console.log("Admin joined room: " + room);
    });
    socket.emit("serverSendUserRooms", userRooms);
  });

  socket.on("typing", ({room}) => {
    socket.to(room).emit("typing", "Someone is typing");
  });

  socket.on("stopTyping", ({room}) => {
    socket.to(room).emit("stopTyping", "Someone stopped typing");
  });

  // function emptyRoom(roomName) {
  //   // Find the room in the userRooms array
  //   const room = userRooms.find((r) => r.name === roomName);
  
  //   // If the room exists, remove all sockets from it
  //   if (room) {
  //     room.sockets.forEach((socket) => {
  //       const index = socket.rooms[roomName];
  //       if (index !== -1) {
  //         socket.rooms.splice(index, 1);
  //       }
  //     });
  //     room.sockets = [];
  //   }
  // }

  socket.on("disconnect-event", (data) => {
      // emptyRoom(temp);
      if (data.model !== null){
        console.log("Data when disconnect:", data);
        // Remove user room from the array
        console.log("userRooms before:", userRooms);
        const temp = `${data.model}_${data.id}`;
        const index = userRooms.indexOf(temp);
        if (index > -1) {
          userRooms.splice(index, 1);
        }
        // userRooms = userRooms.filter(room => room !== temp);
    
        console.log("userRooms after:", userRooms);
        socketIo.emit("serverSendUserRooms", userRooms);
      }

    // Remove socket from user rooms
    userRooms.forEach((room) => {
      socket.leave(room);
      if (data.model !== null){
        console.log(`${data.model} ${data.id} left room: ` + room);
      } else {
        console.log("Admin left room: " + room);
      }
    });
    console.log("adminSocket arr:",adminSocket);
    const adminSocketId = adminSocket.indexOf(socket.id);
    if (adminSocketId > -1) {
      adminSocket.splice(adminSocketId, 1);
    }
    console.log("adminSocket arr after admin left:", adminSocket);
    socketIo.emit("serverSendAdminSockets", adminSocket);

    // const socketId = socket.id;

    // // Remove admin socket from user rooms
    // userRooms.forEach((room) => {
    //   socket.leave(room);
    //   console.log("Admin left room: " + room);
    // });
  
    // // Remove user room from the array
    // console.log("userRooms before:", userRooms);
    // const temp = adminSocket.find((socket) => socket.id === socketId);
    // if (temp) {
    //   const index = userRooms.indexOf(temp.room);
    //   if (index > -1) {
    //     userRooms.splice(index, 1);
    //   }
    // }
    // console.log("userRooms after:", userRooms);
  
  });

  socket.on("disconnect", () => {
    console.log("Client disconnect");
  });
});

// Importing routers
//const routes = require("./routers/");
//const homeRouter = require('./routers/homeRouter');
const requestRouter = require('./routers/requestRouter');
const newsRouter = require('./routers/newsRouter');
const notificationRouter = require('./routers/notificationRouter');
const gradeRouter = require('./routers/gradeRouter');
const courseRouter = require('./routers/courseRouter');
const timetableRouter = require('./routers/timetableRouter');
const studentRouter = require('./routers/studentRouter');
const lecturerRouter = require('./routers/lecturerRouter');
const adminRouter = require('./routers/adminRouter');
const loginlogout = require('./routers/loginlogout');

// Configure routes
// app.use('/', homeRouter);
app.use('/', notificationRouter);
app.use('/', requestRouter);
app.use('/', newsRouter);
app.use('/', gradeRouter);
app.use('/', courseRouter);
app.use('/', studentRouter);
app.use('/', lecturerRouter);
app.use('/', adminRouter);
app.use('/', timetableRouter);
app.use('/', loginlogout);

// routes inits 
//routes(app);

// Serving static files
// const staticPath = path.join(__dirname, '../frontend/sgfrontend/dist');
// app.use(express.static(staticPath));

// // Handle all routes and serve the index.html file
// app.get('*', (req, res) => {
//   res.sendFile(path.join(staticPath, 'index.html'));
// });

//console.log("PATH: ", staticPath);

sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');

    return sequelize.sync({ force: false });
  })
  .then(() => {
    console.log('Sequelize models synced with the database.');

    // Start the server
    server.listen(port, () => {
      console.log(`App listening at http://10.244.3.221:${port} or http://fall2324w20g5.int3306.freeddns.org`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });