const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");


const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Your email address is requried!"],
        unique: true,
    },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required:true },
    challanges: {type: Array}
});


userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
})
module.exports = mongoose.model('User', userSchema);
