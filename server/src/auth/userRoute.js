const User = require("./userModel");
const Conversation = require("../message/models/conversationModel");


module.exports.CreateChallenge = async (req, res) => {
    try {
        //hanlde creating challange for users
        //TODO: ger challange name pot and invited users here
        return res.status(201).json({
            message: "Created challenge successfully",
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Challenge creation failed",
            success: false,
            error_code: -1,
        });
    }
};