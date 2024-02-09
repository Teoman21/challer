const express = require( 'express');
const mongoose = require("mongoose");
const cors = require('cors');

require("dotenv").config();
const {MONGURL, PORT } = process.env;

const authRoute = require("./routes/authRoute")

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", (req,res) => {

    res.json("asdada");
});

app.use("/Auth", authRoute);

app.listen(PORT, ()=>{
    
   console.log("server started on 3030");
    
});

