const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const challangeSchema = new mongoose.Schema({
    name:{
        type: String},
    pot:{
        type: String
    },
    users:{
        type: Array
    }
});



module.exports = mongoose.model('Challenge', userSchema);
