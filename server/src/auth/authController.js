const User = require("./userModel");
const { createToken } = require("../utils/tokenCreate")
const bcrypt = require("bcryptjs");

// PASSIVE: End-user has no this functionality.
module.exports.Signup = async (req, res) => {
    try {
        const { email, password, fullName, createdAt } = req.body;
        console.log("in");
        console.log(req.body);

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.json({ message: "User already exists!" });
        }
        const user = await User.create({ email, password, fullName, createdAt });

        createToken(user._id);

        // omitting the password from the response
        const userForResponse = { ...user._doc, password: undefined };

        res.status(201).json({ message: "User signed up successfully.", success: true, userDetails: userForResponse,  });

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

        const auth = bcrypt.compare(password, user.password)
        if (!auth) {
            return res.json({ message: "Invalid email or password" })
        }

        const token = createToken(user._id);
        res.status(201).json({ message: "User logged in successfully.", success: true, token, userId: user._id, userDetails: user.userDetails});
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
