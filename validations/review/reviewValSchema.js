const joi = require('joi')

const reviewValSchema = {
    createReview: joi.object({
        companySubject: joi
            .string()
            .min(3)
            .max(20)
            .message({
                "string.min": "{#label} should contain at least {#limit} characters",
                "string.max": "{#label} should contain at least {#limit} characters"
            })
            .required(),
        companyReview: joi
            .string()
            .min(10)
            .max(100)
            .message({
                "string.min": "{#label} should contain at least {#limit} characters",
                "string.max": "{#label} should contain at least {#limit} characters"
            })
            .required(),
        companyRating: joi
            .string()
            .required(),
    })
}

module.exports =
{
    reviewValSchema,
}