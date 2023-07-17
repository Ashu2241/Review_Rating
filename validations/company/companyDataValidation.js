const companyValSchema = require('./companyValSchema')
const schema = require('./companyValSchema')
const { unlinkSync } = require("fs");

module.exports = {
    registerCompanyValidation: async (req, res, next) => {
        const value = await schema.registerCompany.validate(req.body, { abortEarly: false })
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
}
