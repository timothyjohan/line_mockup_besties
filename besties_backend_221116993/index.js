const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const users = require('./routes/users');
const pin = require('./routes/pin');
const mongoose = require('mongoose');

const app = express();
const port = 6969;

// Create an HTTP server and pass it to both Express and Socket.IO
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Socket.IO with the same HTTP server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// Socket.IO connection event
io.on('connection', (socket) => {
    console.log(`User connected ${socket.id}`);
    socket.on("send_msg", (data)=>{
        socket.broadcast.emit("receive_message", data)
    })
});

// Your API routes
app.use('/api', users);
app.use('/pin', pin);


// Your default route
app.get('/', (req, res) => res.send('Hello World!'));

// Start the server
server.listen(port, async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/dbm7_221116993')
    console.log('hehehhehee');
  } catch (error) {
    console.log(error);
  }
  console.log(`Server is running on port ${port}`);
});
