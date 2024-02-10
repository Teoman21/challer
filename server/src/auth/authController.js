const User = require("./userModel");
const { createToken } = require("../utils/tokenCreate")
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res) => {
    try {
        const { email, password, fullName, createdAt, phoneNumber } = req.body;
        console.log(req.body);

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.json({ message: "User already exists!" });
        }
        const user = await User.create({ email, password, fullName, createdAt, phoneNumber });

        const token = createToken(user._id);

        res.status(201).json({ message: "User signed up successfully.", success: true, userDetails: user });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error!" });
    }
};

module.exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ message: "All fields are required!" })
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ message: "Invalid email or password" })
        }

        const auth = await bcrypt.compare(password, user.password)
        if (!auth) {
            return res.json({ messgae: "Invalid email or password" })
        }

        const token = createToken(user._id);
        res.status(201).json({ message: "User logged in successfully.", success: true, token });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error!" });
    }
};

module.exports.Logout = (req, res, next) => {
    try {
        // clear the token cookie
        res.clearCookie("token", {
            path: '/',
            withCredentials: true,
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
        });

        //res.cookie('token', '', { expires: new Date(0) });

        res.status(200).json({ message: "User logged out successfully.", success: true });

        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error!" });
    }
};
