const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');

const authRoute = require("./auth/authRoute");

// require cookie parser
require("dotenv").config();

const { MONGOURL, PORT } = process.env;
if (!MONGOURL || !PORT) {
    console.error("MONGOURL and PORT must be defined in the .env file");
    process.exit(1); // Exit with an error code
}

const app = express();

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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

