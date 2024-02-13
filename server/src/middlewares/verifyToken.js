const User = require("../auth/userModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

/**
 * How It Works: It checks for a JWT token in the Authorization header of the request. If the token is present and valid, it attaches the user's information to the req object and calls next(), allowing the request to proceed to the next middleware or route handler.
 * Response: It does not send a response directly. Instead, it either allows the request to continue (if the user is authenticated) or sends an error response (if authentication fails).
 * Usage: Applied to routes that require user authentication. Any route using this middleware will be inaccessible to unauthenticated users.
 */
module.exports.verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized: Missing token or wrong format." });
        }

        const token = authHeader.slice(7);

        jwt.verify(token, process.env.TOKENKEY, async (err, data) => {
            try {
                if (err) {
                    return res.status(401).json({
                        message: "Unauthorized: Token verification failed.",
                    });
                }

                const user = await User.findById(data.id);

                if (!user) {
                    return res.status(401).json({
                        message: "Unauthorized: User not found in the database."
                    });
                }

                // Attach the user to the request object
                req.user = user;

                next();

            } catch (innerError) {
                return res.status(500).json({
                    message: "Internal Server Error",
                    error: innerError.message
                });
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};