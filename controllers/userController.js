const { response } = require('express')
let userSchema = require('../models/userSchema')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { transporter } = require('../service/emailService');
const { unlink } = require('../routes/companyRoutes');
const { unlinkSync } = require("fs");

//  ********************signup API****************************
let createUser = async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    let userData = new userSchema(req.body);
    try {
        const isUserExist = await userSchema.findOne({
            userEmail: req.body.userEmail,
        });
        if (isUserExist) {
            req.file ? unlinkSync(req.file.path) : null; //Delete multer unnecessary uploaded photo
            res.status(401).send({
                success: false,
                message: "User is already registered with this email",
            });
        }
        else {
            userData.userPassword = await bcrypt.hash(req.body.userPassword, salt);
            const filePath = `/uploads/userImage/${req.file.filename}`;
            userData.profilePic = filePath;
            userData.userName = req.body.userName.trim().split(' ').map((data) => {
                return data.charAt(0).toUpperCase() + data.slice(1);
            }).join(' ')
            const user = await userData.save();

            res.status(201).send({
                success: true,
                message: "User successfully registered",
                user: user,
            });
        }
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: `Error occur ${error.message}`,
        });
    }
}

//  **********************Login API***********************
let userLogin = async (req, res) => {
    try {
        const userData = await userSchema.findOne({
            userEmail: req.body.userEmail,
        });
        if (userData) {
            const hashPassword = await bcrypt.compare(
                req.body.userPassword,
                userData.userPassword
            );
            if (userData && hashPassword) {
                const token = jwt.sign({ userData }, process.env.SECRET_KEY, {
                    expiresIn: "1h",
                });
                res.status(200).json({
                    success: true,
                    message: "Login Successfully",
                    accessToken: token,
                });
            }
            else {
                res.status(401).json({
                    success: false,
                    message: "Invalid email or password",
                });
            }
        }
        else {
            res.status(403).json({
                success: false,
                message: "User is not registered with this email",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: `Error occur ${error.message}`,
        });
    }
};

let checktoken = (req, res) => {
    res.send("Hey , your token is valid")
};

//User Send Email for Reset Password API
let sendUserResetPasswordEmail = async (req, res) => {
    const { userEmail } = req.body;
    try {
        const userData = await userSchema.findOne({ userEmail: req.body.userEmail });
        // console.log("Email User :", userData);
        if (userData != null) {
            const secret = userData._id + process.env.JWT_SECRET_KEY;
            const token = jwt.sign({ userID: userData._id }, secret, {
                expiresIn: "15m",
            });
            const link = `http://127.0.0.1:3000/user/reset-password/${userData._id}/${token}`;
            let info = await transporter.sendMail({
                from: "www.ashutoshrathore555@gmail.com",
                to: userEmail,
                subject: "Email for user reset password..",
                text: `<a href = ${link}> Click on this for reset password`,
            });
            return res.status(201).json({
                success: true,
                message: "Email send successfully",
                token: token,
                userID: userData._id,
            });
        }
        else {
            res.status(403).json({
                success: false,
                error: "Email user is not found"
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: "failure",
            error: `Error occur ${error.message}`,
        });
    }
}

let userPasswordReset = async (req, res) => {
    const { id, token } = req.params;
    let { newPassword, confirmPassword } = req.body;
    try {
        const checkUser = await userSchema.findById(id);
        if (checkUser != null) {
            const secretKey = checkUser._id + process.env.JWT_SECRET_KEY;
            jwt.verify(token, secretKey);
            if (newPassword === confirmPassword) {
                const salt = await bcrypt.genSalt(10);
                const bcryptPassword = await bcrypt.hash(confirmPassword, salt);
                await userSchema.findByIdAndUpdate(checkUser._id, {
                    $set: { userPassword: bcryptPassword },
                });
                res.status(203).json({
                    success: true,
                    message: "Password updated successfully",
                });
            }
            else {
                res.status(403).json({
                    success: false,
                    message: "password and confirmpassword not match",
                });
            }
        }
        else {
            res.status(403).json({
                success: false,
                message: "Email user is not found",
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
};

module.exports =
{
    createUser,
    userLogin,
    checktoken,
    sendUserResetPasswordEmail,
    userPasswordReset,
}
