const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const http = require('http'); // Import the HTTP module
const socketIo = require('socket.io'); // Import Socket.IO

const authRoute = require("./auth/authRoute");
const challengeRoute = require("./challenges/challengeRouter");
const messageRoute = require("./messages/messageRouter");
const Message = require("./messages/messageModel");
const User = require("./auth/userModel");

/* comented oout the v erification token because there is a bugi in verifutoken cant 
cant sent request will be handled the bug later*/ 

// require cookie parser
require("dotenv").config();
//import middlewares
const { verifyToken } = require("./middlewares/verifyToken");

const { MONGOURL, PORT } = process.env;
if (!MONGOURL || !PORT) {
    console.error("MONGOURL and PORT must be defined in the .env file");
    process.exit(1); // Exit with an error code
}

const app = express();
const server = http.createServer(app); // Wrap the Express app with the HTTP server
const io = socketIo(server, { // Initialize Socket.IO and allow cross-origin requests
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
});

// connect to MongoDB
mongoose
    .connect(MONGOURL)
    .then(() => console.log("MongoDB connection is successful."))
    .catch((err) => console.error(err));


// middlewares
app.use(
    cors({
        origin: ["http://localhost:8081", "http://localhost:3000"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);
// app use cookieparser goes here
app.use(express.json());

app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.path}`);
    next();
});

// Controllers
app.use("/auth", authRoute);

app.use("/api", verifyToken);

app.use("/api/challenge",challengeRoute);
app.use('/api/message', messageRoute(io));


io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('joinRoom', ({ challengeId }) => {
        socket.join(challengeId);
        console.log(`User joined room: ${challengeId}`);
    });

    socket.on('sendMessage', async ({ challengeId, text, senderId }) => {
        try {
            // Assuming you have a User model where you can find a user by their ID
            const sender = await User.findById(senderId);
            if (!sender) {
                // Handle the case where the user is not found
                console.error('Sender not found');
                return;
            }
    
            const newMessage = await Message.create({
                challengeId,
                text,
                senderId,
                // other message fields if there are any
            });
    
            // Emit the saved message to all clients in the room, including the sender
            io.to(challengeId).emit('newMessage', {
                _id: newMessage._id.toString(),
                text: newMessage.text,
                createdAt: newMessage.createdAt,
                user: {
                    _id: newMessage.senderId.toString(),
                    name: sender.fullName, // Replace with your actual user's fullName field
                    // avatar: sender.avatar, // Include this if you have avatars
                },
            });
    
        } catch (error) {
            console.error("Error saving message to database:", error);
            // Optionally, emit an error message to the sender if necessary
        }
    });


    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

