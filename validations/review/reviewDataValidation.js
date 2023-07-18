const reviewValSchema = require('./reviewValSchema')
const schema = require('./reviewValSchema')

module.exports = {
    createReviewValidation: async (req, res, next) => {
        const value = await reviewValSchema.createReview.validate(req.body, { abortEarly: false })
        if (value.error) {
            res.json({
                success: false,
                message: value.error.details[0].message
            })
        }
        else {
            next()
        }
    }
}