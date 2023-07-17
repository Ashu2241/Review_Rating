let express = require('express')
let review = require('../controllers/reviewController');
let { createReviewValidation } = require('../validations/review/reviewDataValidation')

const reviewRouter = express.Router();

reviewRouter.post('/create', createReviewValidation, review.createReview);
reviewRouter.patch('/update/:id', review.updateReview);
reviewRouter.delete('/delete/:id', review.deleteReview);

module.exports = reviewRouter
