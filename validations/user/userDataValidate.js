const userValSchema = require("./userValSchema")
const schema = require("./userValSchema")
const { unlinkSync } = require("fs");

module.exports = {
    registerUserValidation: async (req, res, next) => {
        const value = await schema.registerUser.validate(req.body, { abortEarly: false })
        if (value.error) {
            req.file ? unlinkSync(req.file.path) : null;
            res.json({
                success: false,
                message: value.error.details[0].message
            })
        }
        else {
            next()
        }
    },

    loginUserValidation: async (req, res, next) => {
        const value = await userValSchema.loginUser.validate(req.body, { abortEarly: false })
        if (value.error) {
            res.status(403).json({
                success: false,
                message: value.error.details[0].message,
            });
        }
        else {
            next();
        }
    },

    resetPasswordValidation: async (req, res, next) => {
        const value = await userValSchema.resetPassword.validate(req.body, { abortEarly: false })
        if (value.error) {
            res.status(403).json({
                success: false,
                message: value.error.details[0].message,
            });
        }
        else {
            next();
        }
    }
}
